"""Models and database functions for boxcharter web app"""

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

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from inflection import camelize, underscore

# create a db object to work with
db = SQLAlchemy()


#######################################################################
# Model definitions: Chart, Section, Measure, Chord, Lyric

class DataMixin(object):
    """A mixin for classes that need to return all of their data in a dict."""

    def get_data(self):
        """Return a dict of all attributes for this object.

        returned dict will have one or more keys: 

            metaData: dict of all scalar values
            <non-scalar>: list

            for example, chords will return 
                {'metaData': {...}, 'sections': [...]}
        """

        # initialize return dict
        data = {'metaData': {}}

        # first the columns
        for key, value in self.__dict__.items():
            
            # skip under and dunder attributes
            if key.startswith('_'):
                continue

            # skip attributes with no value
            if value is None:
                continue

            # skip private fields
            if key in self.private_fields:
                continue

            # camel-ify key
            key = camelize(key, False)

            # otherwise, we have a simple field
            data['metaData'][key] = value

        # then the relationships
        for rel in self.multi_fields:
            data[rel] = []
            for item in self.__getattribute__(rel):
                data[rel].append(item.get_data())

        return data


    def set_data(self, data):
        """Set obj data based on supplied data dict."""



class Chord(db.Model):
    """measure chord"""

    __tablename__ = "chords"

    chord_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    measure_id = db.Column(db.Integer, db.ForeignKey("measures.measure_id"))
    beat_index = db.Column(db.Integer)
    note_code = db.Column(db.String(2), db.ForeignKey('notes.note_code'))
    chord_suffix = db.Column(db.String(8))

    # TODO validate chord names

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Chord chord_id={} beat_index={} note_code={} chord_suffix>".format(
                                                                self.chord_id,
                                                                self.beat_index,
                                                                self.note_code,
                                                                self.chord_suffix)

    def get_chordstring(self):
        """Return a string representing the chord."""

        chordstring = self.note_code
        if self.chord_suffix:
            chordstring += self.chord_suffix

        return chordstring


class Lyric(db.Model):
    """measure lyric"""

    __tablename__ = "lyrics"

    lyric_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    measure_id = db.Column(db.Integer, db.ForeignKey("measures.measure_id"))
    verse_index = db.Column(db.Integer)
    lyric_text = db.Column(db.String(128))

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Lyric lyric_id={} verse_index={}, lyric_text={}>".format(
                                                                self.lyric_id,
                                                                self.verse_index,
                                                                self.lyric_text)


class Measure(db.Model):
    """section measure"""

    __tablename__ = "measures"

    measure_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.section_id"))
    measure_index = db.Column(db.Integer)

    # this will inherit parent measure's beat count if null
    beats_per_measure = db.Column(db.Integer)

    # relationships
    chords = db.relationship("Chord", order_by=Chord.beat_index)
    lyrics = db.relationship("Lyric", order_by=Lyric.verse_index)
    section = db.relationship("Section", 
                              foreign_keys=section_id,
                              backref='measures')

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Measure measure_id={} measure_index={}>".format(self.measure_id,
                                                              self.measure_index)


    def get_data(self):
        """Return all data for a measure in a JSON-friendly format."""

        measure_data = {'beatsPerMeasure': self.beats_per_measure}

        measure_data['chords'] = { chord.beat_index: chord.get_chordstring() for chord in self.chords }
        measure_data['lyrics'] = { lyric.verse_index: lyric.lyric_text for lyric in self.lyrics }

        return measure_data


class Section(db.Model, DataMixin):
    """chart section"""

    __tablename__ = 'sections'

    # special fields
    multi_fields = ['measures']
    private_fields = ['section_id', 'chart_id', 'section_index']
    # end: special fields


    ##### columns #####
    section_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    chart_id = db.Column(db.Integer, db.ForeignKey("charts.chart_id"))
    section_index = db.Column(db.Integer)

    # metadata
    section_name = db.Column(db.String(256))
    section_desc = db.Column(db.String(256))
    beats_per_measure = db.Column(db.Integer, default=4)
    verse_count = db.Column(db.Integer, default=1)

    # layout
    measures_per_row = db.Column(db.Integer, default=4)
    repeat = db.Column(db.Boolean, default=False)
    pickup_measure = db.Column(db.Boolean)

    first_ending_start = db.Column(db.Integer, db.ForeignKey('measures.measure_id'))
    first_ending_end = db.Column(db.Integer, db.ForeignKey('measures.measure_id'))

    # don't need a second ending start; it will be the measure after the 
    # first ending end
    second_ending_end = db.Column(db.Integer, db.ForeignKey('measures.measure_id'))
    ##### end: columns #####


    # relationships
    # because of many measure foreign keys here, relationship to measure is
    # defined by backref under measure relationship

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Section section_id={} section_name={} section_index={}>"
        return repr_str.format(self.section_id,
                               self.section_name,
                               self.section_index)

    # def get_data(self):
    #     """Return data for a section in a JSON-friendly format."""

    #     section_data = {}

    #     # metadata
    #     md = {}
    #     md['name'] = self.section_name
    #     md['description'] = self.section_desc;
    #     md['beatsPerMeasure'] = self.beats_per_measure;
    #     md['verseCount'] = self.verse_count;
    #     md['measuresPerRow'] = self.measures_per_row
    #     md['pickupMeasure'] = self.pickup_measure;
    #     md['repeat'] = self.repeat;
    #     md['firstEndingStart'] = self.first_ending_start;
    #     md['firstEndingEnd'] = self.first_ending_start;
    #     md['secondEndingEnd'] = self.second_ending_end;
    #     section_data['metaData'] = md

    #     # sections
    #     section_data['measures'] = [measure.get_data() for measure in self.measures]
    #     return section_data


class Chart(db.Model, DataMixin):
    """boxcharter chart"""

    __tablename__ = "charts"

    # special fields
    multi_fields = ['sections']
    private_fields = []
    # end: special fields

    chart_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    # text metadata
    title = db.Column(db.String(64))
    author = db.Column(db.String(128))
    composer = db.Column(db.String(128))
    lyricist = db.Column(db.String(128))

    # date metadata
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)

    # chart properties
    original_key = db.Column(db.String(2), db.ForeignKey('keys.key_code'))
    print_key = db.Column(db.String(2),
                          db.ForeignKey('keys.key_code'),
                          nullable=True)
    max_pages = db.Column(db.Integer, default=1)
    min_fontsize = db.Column(db.Integer, default=10)

    # relationships
    user = db.relationship("User")
    sections = db.relationship("Section", order_by=Section.section_index)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Chart chart_id={} title={}>".format(self.chart_id, self.title)


    def clear(self):
        """Clear out chart data to prepare for re-save."""

        self.title = None
        self.author = None
        self.composer = None
        self.lyricist = None
        self.originalKey = None
        self.printKey = None
        self.maxPages = None
        self.minFontSize = None
        self.sections = []

    # def update(self, data, sections):
    #     """Update chart with the supplied data and sections."""

    #     # clear out the former data
    #     self.clear()

    #     # fields not to reset upon saving chart
    #     no_reset = ['chart_id', 'user_id', 'created_at']

    #     self.title = data['title']
    #     self.author = data['author']
    #     self.composer = data['composer']
    #     self.lyricist = data['lyricist']
    #     self.original_key = data['originalKey']
    #     self.print_key = data['printKey']
    #     self.max_pages = data['maxPages']
    #     self.min_fontsize = data['minFontSize']

    #     # sections
    #     for sect_data in sections:
    #         section = Section()

    #         section.sections.append(section)
    #         section.section_name = sect_data['name']
    #         section.section_desc = sect_data['description']
    #         section.beats_per_measure = sect_data['beatsPerMeasure']
    #         section.verse_count = sect_data['verseCount']
    #         section.measures_per_row = sect_data['measuresPerRow']
    #         section.pickup_measure = sect_data['pickupMeasure']
    #         section.repeat = sect_data['repeat']
    #         section.first_ending_start = sect_data['firstEndingStart']
    #         section.first_ending_start = sect_data['firstEndingEnd']
    #         section.second_ending_end = sect_data['secondEndingEnd']

    #         for meas_data in sect_data['measures']:


    #         chart.sections.append(section)

    #     # finally, update the modified time
    #     self.modified_at = datetime.now()

    #     db.session.add(self)
    #     db.session.commit()

#######################################################################
# Model definitions: Key, Note

class Note(db.Model):
    """A note that can be the first part of a chord."""

    __tablename__ = 'notes'
    note_code = db.Column(db.String(2), primary_key=True)


class ScaleNote(db.Model):
    """Associating notes with a particular scale."""

    __tablename__ = 'scale_notes'

    scalenote_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    note_code = db.Column(db.String(2), db.ForeignKey('notes.note_code'))
    key_code = db.Column(db.String(3), db.ForeignKey('keys.key_code'))
    scale_degree = db.Column(db.Integer)

    # relationships
    note = db.relationship('Note')

    # no need to relate to keys here;
    # never need to know what keys a note belongs to

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Key note_code={} key_code={} scale_degree={}>".format(
                                                            self.note_code,
                                                            self.key_code,
                                                            self.scale_degree)


class Key(db.Model):
    """Musical key for a chart."""

    __tablename__ = "keys"

    # key_code needs three characters because it can be minor (Abm)
    key_code = db.Column(db.String(3), primary_key=True)

    # relationships
    notes = db.relationship("ScaleNote", order_by=ScaleNote.scale_degree)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Key key_code={} key_name={}>".format(self.key_code, self.key_name)


#######################################################################
# Model definitions: User


class User(db.Model):
    """boxcharter user"""

    __tablename__ = "users"

    # TODO: save password encrypted!!

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64))
    password = db.Column(db.String(64))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))

    # relationships
    charts = db.relationship("Chart", order_by=Chart.title)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<User user_id={} email ={}>".format(self.user_id, self.email)

    def get_data(self):
        """Return a dict of user details."""

        charts = [
                { 'title': chart.title,
                  'id': chart.chart_id,
                  'createdAt': chart.created_at,
                  'modifiedAt': chart.modified_at }
                for chart in self.charts
               ]

        return {'charts': charts,
                'userData': {
                    'id': self.user_id,
                    'email': self.email,
                    'firstName': self.first_name,
                    'lastName': self.last_name
                    }
                }

#######################################################################
# Helper functions


def connect_to_db(app):
    """Connect the database to our Flask app"""

    # configure to use our PostgreSQL db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///boxcharts'
    # app.config['SQLALCHEMY_ECHO'] = True
    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    # if run interactively, put user in a state to interact with database

    from server import app
    connect_to_db(app)
    print "Connected to DB."