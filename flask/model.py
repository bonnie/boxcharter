"""Models and database functions for boxcharter box charts web app"""

from flask_sqlalchemy import SQLAlchemy

# create a db object to work with
db = SQLAlchemy()


#######################################################################
# Model definitions: Chart, Section, Measure, Chord, Lyric

class Chord(db.Model):
    """measure chord"""

    __tablename__ = "chords"

    chord_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    measure_id = db.Column(db.Integer, db.ForeignKey("measures.measure_id"))
    beat_index = db.Column(db.Integer)
    note_code = db.Column(db.String(2), db.ForeignKey('notes.note_code'))
    chord_suffix = db.Column(db.String(8))

    # TODO verify valid chord names

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Chord chord_id={} beat_index={} note_code={} chord_suffix>".format(
                                                                self.chord_id,
                                                                self.beat_index,
                                                                self.note_code,
                                                                self.chord_suffix)

    def get_data(self):
        """Return all data for a chord in a JSON-friendly format."""

        chord_data = {'index': self.beat_index,
                      'note': self.note_code}
                
        if self.chord_suffix:
            chord_data['suffix'] = self.chord_suffix

        return chord_data


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

    def get_data(self):
        """Return all data for a chord in a JSON-friendly format."""

        return {'index': self.verse_index,
                'lyric': self.lyric_text}


class Measure(db.Model):
    """section measure"""

    __tablename__ = "measures"

    measure_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.section_id"))
    measure_index = db.Column(db.Integer)

    # this will inherit parent measure's beat count if null
    beat_count = db.Column(db.Integer)

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

        measure_data = {'beatCount': self.beat_count}

        measure_data['chords'] = [chord.get_data() for chord in self.chords]
        measure_data['lyrics'] = [lyric.get_data() for lyric in self.lyrics]

        if not measure_data['lyrics']:
            del measure_data['lyrics']

        return measure_data


class Section(db.Model):
    """chart section"""

    __tablename__ = "sections"

    section_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    chart_id = db.Column(db.Integer, db.ForeignKey("charts.chart_id"))
    section_index = db.Column(db.Integer)

    # metadata
    section_name = db.Column(db.String(256))
    section_desc = db.Column(db.String(256))
    beat_count = db.Column(db.Integer, default=4)
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

    # relationships
    # because of many measure foreign keys here, relationship to measure is
    # defined by backref under measure relationship

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Section section_id={} section_name={} section_index={}>"
        return repr_str.format(self.section_id,
                               self.section_name,
                               self.section_index)

    def get_data(self):
        """Return data for a section in a JSON-friendly format."""

        section_data = {}

        # metadata
        md = {}
        md['name'] = self.section_name
        md['description'] = self.section_desc;
        md['beatCount'] = self.beat_count;
        md['verseCount'] = self.verse_count;
        md['measuresPerRow'] = self.measures_per_row
        md['pickupMeasure'] = self.pickup_measure;
        md['repeat'] = self.repeat;
        md['firstEndingStart'] = self.first_ending_start;
        md['firstEndingEnd'] = self.first_ending_start;
        md['secondEndingEnd'] = self.second_ending_end;
        section_data['metaData'] = md

        # sections
        section_data['measures'] = [measure.get_data() for measure in self.measures]
        return section_data


class Chart(db.Model):
    """boxcharter chart"""

    __tablename__ = "charts"

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


    def get_data(self):
        """Return all data for a chart in a JSON-friendly format."""

        # basic data
        chart_data = {}

        # gather the metadata
        md = {
            'id': self.chart_id,
            'userId': self.user_id,
            'title': self.title,
            'author': self.author,
            'composer': self.composer,
            'lyricist': self.lyricist,
            'createdAt': self.created_at,
            'modifiedAt': self.modified_at,
            'originalKey': self.original_key,
            'printKey': self.print_key,
            'maxPages': self.max_pages,
            'minFontSize': self.min_fontsize
        }

        chart_data['metaData'] = md

        # gather data in sections individually
        chart_data['sections'] = [section.get_data() for section in self.sections]

        return chart_data

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