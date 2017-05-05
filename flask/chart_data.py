"""Functions for packaging chart data to return via the server."""

# Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.

# This file is part of BoxCharter.
 
# BoxCharter is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
 
# BoxCharter is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
# for more details.
 
# You should have received a copy of the GNU Affero General Public License
# along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.

from model import Chart
# from model import connect_to_db, db, User, Chart, Section, Measure, \
#                   Chord, Lyric, Key, ScaleNote

def get_chart_data(chart_id):
    """Get data for chart and package in a JSON-friendly way."""

    # chart = Chart.query.filter_by(chart_id=chart_id)

    # TODO: big-ass list/dictionary comprehension here to make object
    # sections = [section.section_name for section in enumerate(chart.sections)]

    # FOR NOW: return a dict for a fake chart

