"""BoxCharter flask server to get data to angular"""

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
 

######################################################
# import

import json
import logging
from flask import Flask, jsonify, request
from flask.ext.cors import CORS, cross_origin

from model import connect_to_db, Chart, User
from log_utilities import init_logging
from chart_processing import get_chart_data, update_chart
from user_processing import validate_user


# for cross origin
ANGULAR_SERVER_NAME = 'localhost'
ANGULAR_SERVER_URL = 'http://{}:4202'.format(ANGULAR_SERVER_NAME)

######################################################
# Flask / CORS setup

app = Flask(__name__)
app.config['SECRET_KEY'] = 'shhhh.....secret'
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

######################################################
# Cross origin helper, to allow access by angular server

def add_cors_header(response):
    """Add a cross origin header for the angular server to a response."""

    # TODO: make a decorator like (or using) http://flask.pocoo.org/snippets/56/

    response.headers.add('Access-Control-Allow-Origin', ANGULAR_SERVER_URL)
    return response


#########################################################
# routes

@app.route('/chart/<int:chart_id>', methods=['GET'])
def return_chart_data(chart_id):
    """Return JSON containing chart data."""

    response = get_chart_data(chart_id)
    json_response = jsonify(response)
    return add_cors_header(json_response)


@app.route('/chart/<int:chart_id>', methods=['PUT'])
@cross_origin(origin=ANGULAR_SERVER_NAME, headers=['Content-Type','Authorization'])
def update_chart_data(chart_id):
    """Update chart data and return JSON of (updated) chart."""

    data = request.json
    response = update_chart(chart_id, data)
    return jsonify(response)


@app.route('/user/auth', methods=['POST'])
@cross_origin(origin=ANGULAR_SERVER_NAME, headers=['Content-Type','Authorization'])
def authenticate_user():
    """Authenticate user and return user data and success (or error status)."""

    email = request.json.get('email')
    password = request.json.get('password')
    response = validate_user(email, password)
    return jsonify(response)


@app.route('/user/add', methods=['POST'])
@cross_origin(origin=ANGULAR_SERVER_NAME, headers=['Content-Type','Authorization'])
def add_user():
    """Add user and return user data (or error status)."""

    user_input = request.form
    response = create_user(user_input)
    return jsonify(response)


@app.route('/user/<int:user_id>')
def return_user_data(user_id):
    """Return JSON containing list of user charts."""

    user = User.query.get(user_id)
    json_response = jsonify(user.get_data())
    return add_cors_header(json_response)


if __name__ == "__main__":

    init_logging()
    connect_to_db(app)
    app.run(port=5050, debug=True)
