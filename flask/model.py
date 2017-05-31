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
from passlib.hash import pbkdf2_sha256
from chord_utilities import parse_chord

# create a db object to work with
db = SQLAlchemy()


class DataMixin(object):
    """A mixin for classes that need to return all of their data in a dict."""

    def get_data(self):
        """Return a dict of all attributes for this object.

        returned dict will have one or more keys: 

            metaData: dict of all scalar values
            <non-scalar>: list

            for example, chords will return 
                {BASICDATA_KEY: {...}, 'sections': [...]}
        """

        # initialize return dict
        data = {}

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

            # add to basic data
            data[key] = value

        # then the relationships
        for rel in self.multi_fields:
            data[rel] = []
            for item in self.__getattribute__(rel):
                data[rel].append(item.get_data())

        return data


    def set_data(self, data):
        """Set obj data based on supplied data dict."""

        # basic data first
        for key, value in data.items():

            # skip keys with no value
            if value is None:
                continue

            if key in self.no_reset or key in self.multi_fields:
                continue

            # snake-ify key
            key = underscore(key)
            self.__setattr__(key, value)


        # then multi fields
        for key, obj in self.multi_fields.items():

            multi_data = data[underscore(key)]
            item_list = []
            for i, sub_data in enumerate(multi_data):
                item = obj.__call__()
                if obj not in [Chord, Lyric]:
                    item.index = i
                item.set_data(sub_data)
                item_list.append(item)

            self.__setattr__(key, item_list)

        # finally, add and commit to db
        db.session.add(self)
        db.session.commit()


#######################################################################
# Model definitions: Chart, Section, Measure, Chord, Lyric

class Chord(db.Model):
    """measure chord"""

    __tablename__ = "chords"

    # special fields
    multi_fields = {}
    private_fields = set(['chord_id', 'measure_id'])
    # end: special fields

    chord_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    measure_id = db.Column(db.Integer, db.ForeignKey("measures.measure_id"))
    beat_index = db.Column(db.Integer)
    note_code = db.Column(db.String(2), db.ForeignKey('notes.note_code'))
    chord_suffix = db.Column(db.String(8))

    # TODO validate chord names

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Chord chord_id={} beat_index={} note_code={} chord_suffix={}>"
        return repr_str.format(self.chord_id, self.beat_index, self.note_code, self.chord_suffix)

    def get_chordstring(self):
        """Return a string representing the chord."""

        chordstring = self.note_code
        if self.chord_suffix:
            chordstring += self.chord_suffix

        return chordstring

    # def get_data(self):
    #     """Get data in a JSON friendly way. 

    #     Can't use data mixin since the chord data is synthesized into a
    #     string of note and suffix combined.
    #     """

    #     return {'beatIndex': self.beat_index,
    #             'chordString': self.get_chordstring()}

    # def set_data(self, data):
    #     """Set data in a JSON friendly way. 

    #     Can't use data mixin since the chord data is synthesized into a
    #     string of note and suffix combined.
    #     """        

    #     # TODO: deal with unparseable chords
    #     note, suffix = parse_chord(data['chordString'])
    #     self.note_code = note
    #     self.chord_suffix = suffix
    #     self.beat_index = data['beatIndex']


class Lyric(db.Model, DataMixin):
    """measure lyric"""

    __tablename__ = "lyrics"

    # special fields
    multi_fields = {}
    private_fields = set(['lyric_id', 'measure_id'])
    # end: special fields

    lyric_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    measure_id = db.Column(db.Integer, db.ForeignKey("measures.measure_id"))
    verse_index = db.Column(db.Integer)
    lyric_text = db.Column(db.String(128))

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Lyric lyric_id={} verse_index={}, lyric_text={}>"
        return repr_str.format(self.lyric_id, self.verse_index, self.lyric_text)


class Measure(db.Model):
    """section measure"""

    __tablename__ = "measures"

    # special fields
    multi_fields = {'chords': Chord, 'lyrics': Lyric}
    private_fields = set(['measure_id', 'section_id', 'index'])
    no_reset = set()
    # end: special fields

    measure_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    section_id = db.Column(db.Integer, 
        db.ForeignKey("sections.section_id", use_alter=True, name='fk_measure_section_id'))
    index = db.Column(db.Integer)

    # this will inherit parent measure's beat count if null
    beats_per_measure = db.Column(db.Integer)

    # relationships
    chords = db.relationship("Chord", order_by=Chord.beat_index)
    lyrics = db.relationship("Lyric", order_by=Lyric.verse_index)
    section = db.relationship("Section", 
                              foreign_keys=section_id,
                              backref='measures',
                              order_by=index)

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Measure measure_id={} index={}>"
        return repr_str.format(self.measure_id, self.index)

    def get_data(self):
        """Return all data for a measure in a JSON-friendly format."""

        measure_data = {'beatsPerMeasure': self.beats_per_measure}

        measure_data['chords'] = { chord.beat_index: chord.get_chordstring() for chord in self.chords }
        measure_data['lyrics'] = { lyric.verse_index: lyric.lyric_text for lyric in self.lyrics }

        return measure_data

    def set_data(self, data):
        """Set data for the measure from given data dict."""

        self.beats_per_measure = data['beatsPerMeasure']

        for index, chordstring in data.get('chords', {}).items():
            
            # TODO: deal with unparseable chords
            if chordstring:
                # ignore empty string (deleted chords)
                note, suffix = parse_chord(chordstring)
                chord = Chord(beat_index=index, note_code=note, chord_suffix=suffix)
                self.chords.append(chord)

        for index, text in data.get('lyrics', {}).items():
            lyric = Lyric(verse_index=index, lyric_text=text)
            self.lyrics.append(lyric)

        db.session.add(self)
        db.session.commit()


class Section(db.Model, DataMixin):
    """chart section"""

    __tablename__ = 'sections'

    # special fields
    multi_fields = {'measures': Measure}
    private_fields = set(['section_id', 'chart_id', 'index'])
    no_reset = set()
    # end: special fields

    ##### columns #####
    section_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    chart_id = db.Column(db.Integer, db.ForeignKey("charts.chart_id"))
    index = db.Column(db.Integer)

    # metadata
    section_name = db.Column(db.String(256))
    section_desc = db.Column(db.String(256))
    beats_per_measure = db.Column(db.Integer, default=4)
    verse_count = db.Column(db.Integer, default=1)

    # layout
    measures_per_row = db.Column(db.Integer, default=4)
    repeat = db.Column(db.Boolean, default=False)
    pickup_measure = db.Column(db.Boolean)

    ending1_start = db.Column(db.Integer, db.ForeignKey('measures.measure_id'))
    ending1_end = db.Column(db.Integer, db.ForeignKey('measures.measure_id'))

    # don't need a second ending start; it will be the measure after the 
    # first ending end
    ending2_end = db.Column(db.Integer, db.ForeignKey('measures.measure_id'))
    ##### end: columns #####


    # relationships
    # because of many measure foreign keys here, relationship to measure is
    # defined by backref under measure relationship

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Section section_id={} section_name={} index={}>"
        return repr_str.format(self.section_id, self.section_name, self.index)


class Chart(db.Model, DataMixin):
    """boxcharter chart"""

    __tablename__ = "charts"

    # special fields
    multi_fields = {'sections': Section}
    private_fields = set()
    no_reset = set(['chart_id', 'user_id', 'created_at', 'modified_at'])
    # end: special fields

    chart_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    # text metadata
    title = db.Column(db.String(64))
    author = db.Column(db.String(128))
    composer = db.Column(db.String(128))
    lyricist = db.Column(db.String(128))

    # is the lyricist the same as the composer? 
    lyricist_same = db.Column(db.Boolean, default=False)

    # date metadata
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)

    # chart key
    original_key = db.Column(db.String(2), db.ForeignKey('keys.key_code'))
    print_key = db.Column(db.String(2),
                          db.ForeignKey('keys.key_code'),
                          nullable=True)

    # chart pdf properties
    max_pages = db.Column(db.Integer, default=1)
    min_fontsize = db.Column(db.Integer, default=10)
    page_width = db.Column(db.Numeric(4, 2, asdecimal=False), default=8.5)
    page_width_units = db.Column(db.String(10), default='inches')
    page_height = db.Column(db.Numeric(4, 2, asdecimal=False), default=11)
    page_height_units = db.Column(db.String(10), default='inches')

    # relationships
    user = db.relationship("User")
    sections = db.relationship("Section", order_by=Section.index)

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

    def update(self, data):
        """Update chart with the supplied data and sections."""

        # first set the metadata
        self.set_data(data)

        # update the modified date
        self.modified_at = datetime.now()

        # finally, add and commit to db
        db.session.add(self)
        db.session.commit()


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
        repr_str = "<Key note_code={} key_code={} scale_degree={}>"
        return repr_str.format(self.note_code, self.key_code, self.scale_degree)


class Key(db.Model):
    """Musical key for a chart."""

    __tablename__ = "keys"

    # key_code needs three characters because it can be minor (Abm)
    key_code = db.Column(db.String(3), primary_key=True)

    # relationships
    notes = db.relationship("ScaleNote", order_by=ScaleNote.scale_degree)

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Key key_code={} key_name={}>"
        return repr_str.format(self.key_code, self.key_name)


#######################################################################
# Model definitions: User


class User(db.Model):
    """boxcharter user"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64), nullable=False, unique=True)
    password_hash = db.Column(db.String(256))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    joined_at = db.column(db.DateTime)

    # relationships
    charts = db.relationship("Chart", order_by=Chart.title)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<User user_id={} email={}>".format(self.user_id, self.email)

    @classmethod
    def create_user(cls, **kwargs):
        """Create a new user from the given criteria, and return User object.

        Hash the password before storing in the database.
        """

        email = kwargs['email']
        fname = kwargs.get('fname')
        lname = kwargs.get('lname')
        created_at = datetime.now()

        raw_password = kwargs['password']
        passhash = pbkdf2_sha256.hash(raw_password)

        user = cls.__call__(email=email,
                            first_name=fname,
                            last_name=lname,
                            joined_at=created_at,
                            password_hash=passhash)

        db.session.add(user);
        db.session.commit()
        return user

    def get_data(self):
        """Return a dict of user details."""

        charts = [
                { 'title': chart.title,
                  'chartId': chart.chart_id,
                  'createdAt': chart.created_at,
                  'modifiedAt': chart.modified_at }
                for chart in self.charts
               ]

        return {
                    'charts': charts,
                    'userId': self.user_id,
                    'email': self.email,
                    'firstName': self.first_name,
                    'lastName': self.last_name
                }

#######################################################################
# Helper functions


def connect_to_db(app, db_uri='postgresql:///boxcharts'):
    """Connect the database to our Flask app"""

    # configure to use our PostgreSQL db
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    # app.config['SQLALCHEMY_ECHO'] = True
    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    # if run interactively, put user in a state to interact with database

    from server import app
    connect_to_db(app)
    print "Connected to DB."