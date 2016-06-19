"""Models and database functions for chartboxer box charts web app"""

from flask_sqlalchemy import SQLAlchemy

# create a db object to work with
db = SQLAlchemy()

#######################################################################
# Model definitions: User

class User(db.Model):
	"""chartboxer user"""

	__tablename__ = "users"

	user_id = db.Column(db.Integer, 
						autoincrement=True, 
						primary_key=True)
	email = db.Column(db.String(64))
	password = db.Column(db.String(64))
	first_name = db.Column(db.String(64))
	last_name = db.Column(db.String(64))

	# relationships
	charts = db.Relationship("Chart", order_by=title)

	def __repr__(self):
		"""Provide helpful representation when printed."""
		return "<User user_id={} email ={}".format(self.user_id, self.email)


#######################################################################
# Model definitions: Chart, Section, Measure, Chord, Lyric

class Chart(db.Model):
	"""chartboxer chart"""

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
	user = db.Relationship("User")
	sections = db.Relationship("Section", order_by=section_num)

	def __repr__(self):
	"""Provide helpful representation when printed."""
	return "<Chart chart_id={} title={}".format(self.chart_id, self.title)


class Section(db.Model):
	"""chart section"""

	__tablename__ = "sections"

	section_id = db.Column(db.Integer, autoincrement=True, primary_key=True))
	chart_id = db.Column(db.Integer, db.ForeignKey("charts.chart_id"))
	section_num = db.Column(db.Integer)

	# metadata
	section_name = db.Column(db.String(256))
	section_instructions = db.Column(db.String(256))

	# layout
	measure_width = db.Column(db.Integer, default=4)
	repeat = db.Column(db.Boolean, default=False)
	# TODO: first and second ending

	# relationships
	measures = db.Relationship("Measure", order_by=measure_num)

	def __repr__(self):
	"""Provide helpful representation when printed."""
	repr_str = "<Section section_id={} section_name={} section_num={}"
	return repr_str.format(self.section_id, 
						   self.section_name,
						   self.section_num)


class Measure(db.Model):
	"""section measure"""

	__tablename__ = "measures"

	measure_id = db.Column(db.Integer, autoincrement=True, primary_key=True))
	section_id = db.Column(db.Integer, db.ForeignKey("section.section_id"))
	measure_num = db.Column(db.Integer)
	beat_count = db.Column(db.Integer, default=4)

	# relationships
	chords = db.Relationship("Chord", order_by=beat_num)
	lyrics = db.Relationship("Lyric", order_by=verse_num)

	def __repr__(self):
	"""Provide helpful representation when printed."""
	return "<Measure measure_id={} measure_num={}".format(self.measure_id, 
														  self.measure_num)


class Chord(db.Model):
	"""measure chord"""

	__tablename__ = "chords"

	chord_id = db.Column(db.Integer, autoincrement=True, primary_key=True))
	measure_id = db.Column(db.Integer, db.ForeignKey("measure.measure_id"))
	beat_num = db.Column(db.Integer)
	chord_name = db.Column(db.String(8))

	# TODO verify valid chord names

	def __repr__(self):
	"""Provide helpful representation when printed."""
	return "<Chord chord_id={} beat_num={} chord_name={}".format(
															self.chord_id, 
															self.beat_num,
															self.chord_name)


class Lyric(db.Model):
	"""measure lyric"""

	__tablename__ = "lyrics"

	lyric_id = db.Column(db.Integer, autoincrement=True, primary_key=True))
	measure_id = db.Column(db.Integer, db.ForeignKey("measure.measure_id"))
	verse_num = db.Column(db.Integer)
	lyric_text = db.Column(db.String(128))

	def __repr__(self):
	"""Provide helpful representation when printed."""
	return "<Lyric lyric_id={} verse_num={}, lyric_text={}".format(
																self.lyric_id, 
																self.verse_num,
																self.lyric_text)


#######################################################################
# Model definitions: Key, Note

class Key(db.Model):
	"""musical key for a chart"""

	__tablename__ = "keys"

	key_id = db.Column(db.Integer, autoincrement=True, primary_key=True))
	key_name = db.Column(db.String(2))

	# relationships
	notes = db.Relationship("Note", order_by=scale_degree)

	def __repr__(self):
	"""Provide helpful representation when printed."""
	return "<Key key_id={} key_name={}".format(self.key_id, self.key_name)


class Note(db.Model):
	"""scale notes and their degree"""

	__tablename__ = "notes"

	note_id = db.column(db.Integer, autoincrement=True, primary_key=True))
	key_id = db.column(db.Integer, db.ForeignKey("keys.key_id"))
	scale_degree = db.column(db.Integer)

	# no need to relate to keys here; 
	# never need to know what keys a note belongs to

	def __repr__(self):
		"""Provide helpful representation when printed."""
		return "<Key note_id={} key_id={} scale_degree={}".format(
															self.note_id, 
															self.key_id, 
															self.scale_degree)
