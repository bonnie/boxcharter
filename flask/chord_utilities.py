"""Functions for working with chords."""

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

def parse_chord(chord_string):
    """Parse a chord string into the note and suffix.

    >>> parse_chord('Gm7')
    ('G', 'm7')

    >>> parse_chord('F#dim')
    ('F#', 'dim')

    >>> parse_chord('Bb7b9')
    ('Bb', '7b9')

    >>> parse_chord('G')
    ('G', None)

    """

    if len(chord_string) == 1:
        return chord_string, None

    if chord_string[1] in ('b', '#'):
        return chord_string[0:2], chord_string[2:]

    return chord_string[0], chord_string[1:]


def lower_note(chord_string):
    """Give the next lower note for a particular note.

    chord_string should be a one-character string."""

    lower = {'A': 'G',
             'B': 'A',
             'C': 'B',
             'D': 'C',
             'E': 'D',
             'F': 'E',
             'G': 'F'}

    if chord_string not in lower:
        raise Exception('Chord not found: {}'.format(chord_string))

    return lower[chord_string]

