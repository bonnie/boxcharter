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
    chord_name = db.Column(db.String(8))

    # TODO verify valid chord names

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Chord chord_id={} beat_index={} chord_name={}".format(
                                                                self.chord_id,
                                                                self.beat_index,
                                                                self.chord_name)


class Lyric(db.Model):
    """measure lyric"""

    __tablename__ = "lyrics"

    lyric_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    measure_id = db.Column(db.Integer, db.ForeignKey("measures.measure_id"))
    verse_index = db.Column(db.Integer)
    lyric_text = db.Column(db.String(128))

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Lyric lyric_id={} verse_index={}, lyric_text={}".format(
                                                                self.lyric_id,
                                                                self.verse_index,
                                                                self.lyric_text)


class Measure(db.Model):
    """section measure"""

    __tablename__ = "measures"

    measure_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("sections.section_id"))
    measure_index = db.Column(db.Integer)

    # this will inherit parent's beat count if null
    beat_count = db.Column(db.Integer)

    # relationships
    chords = db.relationship("Chord", order_by=Chord.beat_index)
    lyrics = db.relationship("Lyric", order_by=Lyric.verse_index)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Measure measure_id={} measure_index={}".format(self.measure_id,
                                                              self.measure_index)


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
    measure_width = db.Column(db.Integer, default=4)
    repeat = db.Column(db.Boolean, default=False)
    # TODO: first and second ending

    # relationships
    measures = db.relationship("Measure", order_by=Measure.measure_index)

    def __repr__(self):
        """Provide helpful representation when printed."""
        repr_str = "<Section section_id={} section_name={} section_index={}"
        return repr_str.format(self.section_id,
                               self.section_name,
                               self.section_index)


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
    original_key = db.Column(db.Integer, db.ForeignKey('keys.key_id'))
    print_key = db.Column(db.Integer,
                          db.ForeignKey('keys.key_id'),
                          nullable=True)
    max_pages = db.Column(db.Integer, default=1)
    min_fontsize = db.Column(db.Integer, default=10)

    # relationships
    user = db.relationship("User")
    sections = db.relationship("Section", order_by=Section.section_index)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Chart chart_id={} title={}".format(self.chart_id, self.title)


#######################################################################
# Model definitions: Key, Note

class ScaleNote(db.Model):
    """scale notes and their degree"""

    __tablename__ = "notes"

    note_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    note_name = db.Column(db.String(2))
    key_id = db.Column(db.Integer, db.ForeignKey("keys.key_id"))
    scale_degree = db.Column(db.Integer)

    # no need to relate to keys here;
    # never need to know what keys a note belongs to

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Key note_id={} key_id={} scale_degree={}".format(
                                                            self.note_id,
                                                            self.key_id,
                                                            self.scale_degree)


class Key(db.Model):
    """musical key for a chart"""

    __tablename__ = "keys"

    key_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    key_name = db.Column(db.String(2))

    # relationships
    notes = db.relationship("ScaleNote", order_by=ScaleNote.scale_degree)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<Key key_id={} key_name={}".format(self.key_id, self.key_name)


#######################################################################
# Model definitions: User


class User(db.Model):
    """boxcharter user"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(64))
    password = db.Column(db.String(64))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))

    # relationships
    charts = db.relationship("Chart", order_by=Chart.title)

    def __repr__(self):
        """Provide helpful representation when printed."""
        return "<User user_id={} email ={}".format(self.user_id, self.email)


#######################################################################
# Helper functions


def connect_to_db(app):
    """Connect the database to our Flask app"""

    # configure to use our PostgreSQL db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///boxcharts'
    app.config['SQLALCHEMY_ECHO'] = True
    db.app = app
    db.init_app(app)

if __name__ == "__main__":
    # if run interactively, put user in a state to interact with database

    from server import app
    connect_to_db(app)
    print "Connected to DB."