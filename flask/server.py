"""BoxCharter flask server to get data to angular"""

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
 

######################################################
# import

from flask import Flask, jsonify
from model import connect_to_db, Chart, User

######################################################
# Flask / setup

app = Flask(__name__)

#########################################################
# routes

@app.route('/chart/<int:chart_id>')
def return_chart_data(chart_id):
    """Return JSON containing chart data"""

    chart = Chart.query.get(chart_id)
    return jsonify(chart.get_data())


@app.route('/user/<int:user_id>')
def return_user_data(user_id):
    """Return JSON containing list of user charts."""

    user = User.query.get(user_id)
    return jsonify(user.get_data())


@app.route('/save_chart', methods=['POST'])
def save_chart():
    """Save a new or modified box chart

    note: angular sends posted data as JSON, so the data is found in
    request.json (not request.form)"""

    print "*******posted data******"
    print request.json
    print "********session*********"
    print session

    return ''


if __name__ == "__main__":

    connect_to_db(app)

    # DebugToolbarExtension(app)

    app.run(port=5050, debug=True)
