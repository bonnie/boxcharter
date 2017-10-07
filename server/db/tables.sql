--
-- Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
--
-- This file is part of BoxCharter.
--
-- BoxCharter is free software: you can redistribute it and/or modify it under
-- the terms of the GNU Affero General Public License as published by the Free
-- Software Foundation, either version 3 of the License, or (at your option)
-- any later version.
--
-- BoxCharter is distributed in the hope that it will be useful, but WITHOUT
-- ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
-- FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
-- for more details.
--
-- You should have received a copy of the GNU Affero General Public License
-- along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
--

----------------------------------------------------------------
-- notes / keys
----------------------------------------------------------------
CREATE TABLE notes (
  note_code VARCHAR(2) PRIMARY KEY
);

CREATE TABLE keys (
  key_code VARCHAR(3) PRIMARY KEY
);

CREATE TABLE scale_notes(
  scale_note_id SERIAL PRIMARY KEY,
  key_code VARCHAR(3) REFERENCES keys,
  note_code VARCHAR(2) REFERENCES notes,
  scale_degree INTEGER NOT NULL
);

----------------------------------------------------------------
-- charts / sections
----------------------------------------------------------------
CREATE TABLE charts(
  chart_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  composer TEXT,
  lyricist TEXT,
  lyricist_same BOOLEAN,
  original_key VARCHAR(3) REFERENCES keys,
  print_key VARCHAR(3) REFERENCES keys,
  max_pages INTEGER DEFAULT 1,
  min_fontsize INTEGER DEFAULT 10,
  page_width REAL DEFAULT 8.5,
  page_height REAL DEFAULT 11,
  page_units TEXT DEFAULT 'inches'
);

CREATE TABLE sections(
  section_id SERIAL PRIMARY KEY,
  chart_id INTEGER REFERENCES charts,
  index INTEGER NOT NULL,
  section_name TEXT,
  section_desc TEXT,
  beats_per_measure INTEGER NOT NULL,
  verse_count INTEGER NOT NULL,
  pickup_measure_beats INTEGER DEFAULT 0
);

----------------------------------------------------------------
-- measures / repeats
----------------------------------------------------------------
CREATE TABLE measures(
  measure_id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES sections NOT NULL,
  index INTEGER NOT NULL,
  beats_per_measure INTEGER
);

CREATE TABLE repeats(
  repeat_id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES sections,
  repeat_start INTEGER REFERENCES measures,
  ending1_start INTEGER REFERENCES measures,
  ending2_start INTEGER REFERENCES measures,
  ending2_end INTEGER REFERENCES measures
);

----------------------------------------------------------------
-- chords / lyrics
----------------------------------------------------------------

CREATE TABLE chords(
  chord_id SERIAL PRIMARY KEY,
  measure_id INTEGER REFERENCES measures NOT NULL,
  beat_index INTEGER NOT NULL,
  note_code VARCHAR(2) REFERENCES notes NOT NULL,
  suffix VARCHAR(8)
);

CREATE TABLE lyrics(
  lyric_id SERIAL PRIMARY KEY,
  measure_id INTEGER REFERENCES measures NOT NULL,
  verse_index INTEGER NOT NULL,
  lyric_text TEXT NOT NULL
);

----------------------------------------------------------------
-- users
----------------------------------------------------------------
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT
);

CREATE TABLE user_charts (
  user_chart_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users NOT NULL,
  chart_id INTEGER REFERENCES charts NOT NULL,
  chart_owner BOOLEAN DEFAULT false
);
