"""Status constants."""

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

SUCCESS_STATUS = {'status': {'type': 'success'}}
WARNING_STATUS = {'status': {'type': 'warning'}}
ERROR_STATUS = {'status': {'type': 'error'}}

ERROR_EMAIL = 'admin@boxcharter.com'
BAD_DATA_TEXT = 'The server did not understand this request. Please report this error to {}'.format(ERROR_EMAIL)