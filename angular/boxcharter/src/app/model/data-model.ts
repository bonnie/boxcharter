/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

export class User {
    'charts': object[];
    'id': number;
    'email': string;
    'firstName': string;
    'lastName': string;
}

// export class Chord {
//     beatIndex: number;
//     chordString: string;
// }

// export class Lyric {
//     verseIndex: number;
//     lyricText: string;
// }

export class Measure {
    beatsPerMeasure: number;
    index: number;
    chords: object = {};
    lyrics: object = {};
};

export class Section {
    sectionName: string;
    sectionDesc: string;
    beatsPerMeasure: number;
    verseCount: number;
    measuresPerRow: number;
    repeat: boolean;
    pickupMeasure: boolean;
    ending1Start: number;
    ending1End: number;
    ending2End: number;
    measures: Measure[];
    rows: Measure[][];
};

export class Chart {
  chartId: number;
  userId: number;
  title: string;
  author: string;
  composer: string;
  lyricist: string;
  lyricistSame: boolean;
  modifiedAt: Date;
  createdAt: Date;
  originalKey: string;
  printKey: string;
  minPages: number;
  minFontsize: number;
  pageWidth: number;
  pageWidthUnits: string;
  pageHeight: number;
  pageHeightUnits: string;
  sections: Section[];
}