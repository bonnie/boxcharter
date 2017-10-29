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
  noteCode VARCHAR(2) PRIMARY KEY
);

CREATE TABLE keys (
  keyCode VARCHAR(3) PRIMARY KEY
);

CREATE TABLE scale_notes(
  scaleNoteId SERIAL PRIMARY KEY,
  keyCode VARCHAR(3) REFERENCES keys,
  noteCode VARCHAR(2) REFERENCES notes,
  scaleDegree INTEGER NOT NULL
);

----------------------------------------------------------------
-- charts / sections
----------------------------------------------------------------
CREATE TABLE charts(
  chartId SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  composer TEXT,
  lyricist TEXT,
  lyricistSame BOOLEAN,
  originalKeyCode VARCHAR(3) REFERENCES keys,
  printKeyCode VARCHAR(3) REFERENCES keys,
  maxPages INTEGER DEFAULT 1,
  minFontsize INTEGER DEFAULT 10,
  pageWidth REAL DEFAULT 8.5,
  pageHeight REAL DEFAULT 11,
  pageUnits TEXT DEFAULT 'inches'
);

CREATE TABLE sections(
  sectionId SERIAL PRIMARY KEY,
  chartId INTEGER REFERENCES charts NOT NULL,
  index INTEGER NOT NULL,
  sectionName TEXT,
  sectionDesc TEXT,
  beatsPerMeasure INTEGER NOT NULL,
  verseCount INTEGER NOT NULL,
  pickupMeasureBeats INTEGER DEFAULT 0
);

----------------------------------------------------------------
-- measures / repeats
----------------------------------------------------------------
CREATE TABLE measures(
  measureId SERIAL PRIMARY KEY,
  sectionId INTEGER REFERENCES sections NOT NULL,
  index INTEGER NOT NULL,
  beatsPerMeasure INTEGER
);

CREATE TABLE repeats(
  repeatId SERIAL PRIMARY KEY,
  sectionId INTEGER REFERENCES sections,
  repeatStart INTEGER REFERENCES measures,
  repeatEnd INTEGER REFERENCES measures,
  ending1Start INTEGER REFERENCES measures,
  ending2Start INTEGER REFERENCES measures,
  ending2End INTEGER REFERENCES measures
);

----------------------------------------------------------------
-- chords / lyrics
----------------------------------------------------------------
CREATE TABLE chords(
  chordId SERIAL PRIMARY KEY,
  measureId INTEGER REFERENCES measures NOT NULL,
  beatIndex INTEGER NOT NULL,
  noteCode VARCHAR(2) REFERENCES notes NOT NULL,
  bassNoteCode VARCHAR(2) REFERENCES notes,
  suffix VARCHAR(8)
);

CREATE TABLE lyrics(
  lyricId SERIAL PRIMARY KEY,
  measureId INTEGER REFERENCES measures NOT NULL,
  verseIndex INTEGER NOT NULL,
  lyricText TEXT NOT NULL
);

----------------------------------------------------------------
-- users
----------------------------------------------------------------
CREATE TABLE users (
  userId SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  passwordSalt TEXT NOT NULL,
  firstName TEXT,
  lastName TEXT
);

CREATE TABLE userCharts (
  userChartId SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users NOT NULL,
  chartId INTEGER REFERENCES charts NOT NULL,
  chartOwner BOOLEAN DEFAULT false
);
