"""Adding scales and notes for initial database"""

# Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
#
# This file is part of BoxCharter.
#
# BoxCharter is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# BoxCharter is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
# for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.

import os
from datetime import datetime

from server import app
from chord_utilities import parse_chord, lower_note
from model import Chart, Section, Measure, Key, Note, Chord, Lyric, ScaleNote, \
                  User, connect_to_db, db

DEBUG=False
DATADIR='./seed_data'

def add_scale_note(scale_degree, note_string, key):
    """Create a scale note for this note string and key, and add to db. 

    If note doesn't exist in the db, create that too. 

    Globals:
        db (db instance)
    Inputs: 
        scale_degree: integer from 0 to 7
        note_string: string for note (examples: 'G', 'Bb')
        key: Key object
    """

    note = Note.query.get(note_string)
    if not note:
        note = Note(note_code=note_string)
        db.session.add(note)

    scale_note = ScaleNote(scale_degree=scale_degree)
    scale_note.note = note
    scale_note.key = key

    db.session.add(scale_note)


def load_keys_and_notes():
    """Read lines from csv and add to database."""

    if DEBUG:
        print "Loading keys"

    for row in open("seed_data/keys.csv"):
        # example row: A,B,C#,D,E,F#,G#
        row = row.rstrip()
        notes = row.split(',')

        # first make the key
        major_key = Key(key_code=notes[0])
        minor_key = Key(key_code=notes[0] + 'm')
        db.session.add_all([major_key, minor_key])

        # then make the notes
        for i, note_string in enumerate(notes):

            add_scale_note(i, note_string, major_key)

            # minor key has the same scale degrees except for 3 and 7, 
            # which are a half step down
            if i == 3 or i == 7:
                if len(note_string) == 2:
                    # this note is an accidental
                    if note_string[1] == '#':
                        note_string = note_string[0]
                    else: 
                        # it's a flat -- we need the next lower note to go a 
                        # half step down
                        note_string = lower_note(note_string[0])
                else:
                    # this note is not an accidental
                    # the way the keys work, this will always be a flat
                    note_string = note_string + 'b'

            add_scale_note(i, note_string, minor_key)


    # add a percentage "note" for chord referential integrity
    percent_note = Note(note_code='%')
    db.session.add(percent_note)

    # commit work once done
    db.session.commit()


def load_user():
    """Create a sample user and return its user object."""

    if DEBUG:
        print "Loading user"

    email = 'example@example.com'
    password = 'abc123'
    fname = 'Suzy'
    lname = 'Sample'

    newuser = User.create_user(email=email,
                           password=password,
                           fname=fname,
                           lname=lname)

    return newuser

def parse_metadata(line):
    """Return a dict of metadata from a specially formated line.

    the line will have key/value pairs separated by ';'
    For example: 

    chart_title=Does My Ring Burn Your Finger;composer=Buddy and Julie Miller;original_key=Gm

    """

    md = {}
    md_tokens = line.split(';')
    for item in md_tokens:
        key, value = item.split('=')
        md[key] = value

    return md


def load_sample_song(filepath, user):
    """Load sample chart info from filepath, and attach to user parameter. 

    The first line of the file should be chart metadata (see parse_metadata for
    format. 

    The subsequent lines:

        '+' as the first character denotes a new section, with metadata following
        For example: 

            +measures_per_row=5;verse_count=3

        all other lines denote a new measure, with chord and lyrics separated by
        pipes '|'
        For example: 

            %|When I|Well I re-|Now it's just

    As this is not a function expecting user input, there is no error checking.

    """

    if DEBUG:
        print "Loading sample song"

    chartfile = open(filepath)
    chartlines = chartfile.read().split('\n');
    chartfile.close()

    chart_metadata = parse_metadata(chartlines[0])
    chart = Chart(**chart_metadata)
    chart.user = user
    chart.created_at = datetime.now()
    chart.modified_at = datetime.now()

    section_count = 0

    for line in chartlines[2:]:

        # skip blank lines
        if len(line) == 0:
            continue

        if line[0] == '+':
            # we've got ourselves a new section
            section_metadata = parse_metadata(line[1:])
            section = Section(**section_metadata)
            section.index = section_count
            chart.sections.append(section)

            section_count += 1
            measure_count = 0

        elif line:
            # add a measure to the section
            measure = Measure(index=measure_count)
            section.measures.append(measure)

            # add chords and lyrics to the measure
            tokens = line.split('|')
            
            # chords
            chords = tokens[0].split()
            for i, chord_string in enumerate(chords):
                chord_code, chord_suffix = parse_chord(chord_string)
                
                ### NOTE: this is assuming a 4 beat measure with either one or
                ### two chords. Since this is just seed, I'm not making a
                ### general parsing algorithm!

                beat_index = 0 if i == 0 else 2

                chord = Chord(note_code=chord_code, 
                              chord_suffix=chord_suffix,
                              beat_index=beat_index)
                measure.chords.append(chord)

            # lyrics
            lyrics = tokens[1:]
            for verse_index, lyric_string in enumerate(lyrics):
                if lyric_string:
                    lyric = Lyric(verse_index=verse_index, lyric_text=lyric_string)
                    measure.lyrics.append(lyric)

            # increment measure count in anticipation of the next measure
            measure_count += 1

    db.session.add(chart)
    db.session.commit()


def load_seed_data(datadir):
    """Load all of the seed data. In one function for testing convenience."""

    load_keys_and_notes()
    user = load_user()
    load_sample_song(os.path.join(datadir, 'ring.txt'), user)


if __name__ == "__main__":

    # if it's running by hand, we'll want to see the debug messages
    DEBUG=True

    connect_to_db(app)
    db.drop_all()
    db.create_all()

    load_seed_data(DATADIR)