"""Functions to process chart input and output."""

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

from copy import deepcopy
import logging

from model import Chart, db
from status import SUCCESS_STATUS, ERROR_STATUS, BAD_REQUEST, CONTACT_ADMIN
from log_utilities import log_error

# phrasing for when chart isn't found
NO_CHART = 'No chart found with that ID.'
NO_ACTION = 'Chart not {}.'
NEW_CHART = 'Would you like to {} a new chart with these chords and lyrics?'
SUCCESS_TEXT = 'Chart successfully {}'

def get_chart_by_id(chart_id):
    """Check to see whether a chart_id exists; return chart object or None.

    inputs:
        chart_id: int

    outputs:
        Chart object (or None)
    """

    return Chart.query.get(chart_id)


def get_chart_data(chart_id):
    """Return dict of data for chart corresponding to the chart_id."""

    err_status = deepcopy(ERROR_STATUS) 
    err_status['status']['text'] = NO_CHART
    error_kwargs = {'chart_id': chart_id}

    chart = get_chart_by_id(chart_id)
    if not chart:
        # TODO: get user here!!
        # logging.error(BAD_CHART_ID_ACCESS.format(user, chart_id))
        err = deepcopy(ERROR_STATUS)
        return err_status 

    try:
        data = chart.get_data()
    except Exception as e:
        log_error(e, 1, **error_kwargs)
        err_status['status']['text'] = '{} {}'.format(
            'Could not get data.', CONTACT_ADMIN)
        return err_status
    else:
        return {'chart': data, 'status': SUCCESS_STATUS['status']}


def update_chart(chart_id, data):
    """Save chart_data to chart for chart_id, and return a response status dict.

    inputs: 
        chart_id: int
        data: dict

    outputs: 
        response dict with 'status' and 'modifiedAt' keys
    """

    # for errors
    error_kwargs = {'chart_id': chart_id, 'data': data}
    err_status = deepcopy(ERROR_STATUS) 
    err_status['status']['text'] = '{} {}'.format(BAD_REQUEST, NO_ACTION.format('saved'))

    # does this chart id exist in the db?
    chart = get_chart_by_id(chart_id)
    if not chart:
        err = deepcopy(ERROR_STATUS)
        err['status']['text'] = '{} {}'.format(NO_CHART, NEW_CHART.format('create'))
        err['status']['closeable'] = False

        # TODO: attach actions to these on the angular end
        err['status']['actions'] = ['Create new chart', 'Discard chart']

        return err

    # otherwise, proceed to save chart data
    try:
        chart.clear()
        chart.update(data)
    except Exception as e:
        log_error(e, 1, **error_kwargs)
        return err_status
    else:
        response = deepcopy(SUCCESS_STATUS)
        response['status']['text'] = SUCCESS_TEXT.format('saved')
        response['modifiedAt'] = chart.modified_at
        return response


def create_chart(data, user_id):
    """Save chart_data to database as a new chart; return chart data and status

    inputs: 
        data: dict

    outputs: 
        response dict with 'status' and 'chart' keys
    """

    print "input"
    print data

    # for errors
    error_kwargs = {'data': data}
    err_status = deepcopy(ERROR_STATUS) 
    err_status['status']['text'] = '{} {}'.format(BAD_REQUEST, NO_ACTION.format('created'))

    # save chart data
    try:
        chart = Chart()
        chart.update(data)
        chart.user_id = user_id

        db.session.add(chart)
        db.session.commit()

        # I'm not sure why I need to get the chart_id first, but if I don't
        # do this (or, say, do chart.get_data() twice), then chart_data is 
        # empty. 
        chart_id = chart.chart_id
        chart_data = chart.get_data()

        # import pdb; pdb.set_trace()

    except Exception as e:
        log_error(e, 1, **error_kwargs)
        return err_status
    else:
        response = deepcopy(SUCCESS_STATUS)
        response['status']['text'] = SUCCESS_TEXT.format('created')
        response['data'] = chart_data

        print "response"
        print response

        return response
