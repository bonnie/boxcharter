"""Logging utilities for Flask server and supporting files."""

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

import logging

ERROR_LOGFILE = 'logs/error.log'

def init_logging(level=logging.WARNING):
    """Initialize the logger.

    Inputs:
        None

    Output:
        None
    """

    logging.basicConfig(
        filename=ERROR_LOGFILE, 
        level=level, 
        format='%(asctime)s %(levelname)s:%(message)s')

    print('logging started')


def log_error(e, error_level, **kwargs):
    """Log Exception e with kwargs.

    input:
        e: Exception object
        error_level: int
            1: error
            2: warning
        **kwargs: dict of args
    
    output:
        None

    """

    # TODO: rotate log when it becomes large... does logging mod offer that?

    err_string = '{}: {}\n'.format(type(e), str(e))
    for key, value in kwargs.items():
        err_string += '\t{}: {}\n'.format(key, value)

    logging.error(err_string)
