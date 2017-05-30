"""Functions for processing user creation, deletion, and authentication."""

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

from sqlalchemy.orm.exc import NoResultFound
from passlib.hash import pbkdf2_sha256
from model import User
from boxcharter_exceptions import UserNotFoundException, PasswordMismatchException
from status import SUCCESS_STATUS, ERROR_STATUS, BAD_REQUEST, CONTACT_ADMIN
from log_utilities import log_error


def get_user_by_email(email):
    """Return User object if the user exists in the system; None otherwise."""

    try:
        return User.query.filter_by(email=email).one()
    except NoResultFound: 
        return None


def is_already_user(email):
    """Check to see if email exists in the system. Return boolean.

    For validating email during registration."""

    user_in_db = not (get_user_by_email(email) == None)
    return {'status': SUCCESS_STATUS, 'inDB': user_in_db}


def add_user(data):
    """Add user to database. Return user data."""

    print data

    err_status = deepcopy(ERROR_STATUS)

    try:
        user = User.create_user(**data)
    except Exception as e:
        log_error(e, 1, **data)
        err_text =  '{} {}'.format('Could not add user.', CONTACT_ADMIN)
        err_status['status']['text'] = err_text
        return err_status
    else:
        user_id = user.user_id
        succ = deepcopy(SUCCESS_STATUS['status'])
        succ['text'] = 'New user {} successfully added.'.format(data['email'])        
        return {'userID': user_id, 'status': succ}


def authenticate(email, password):
    """Return true if user exists with that password; else raise exception.

    If the user doesn't exist, raise UserNotFoundException
    If the password doesn't match, raise PasswordMismatchException
    """ 

    user = get_user_by_email(email)

    # user doesn't exist
    if user is None:
        raise UserNotFoundException('authenticate: nonexistent email')

    # hooray, a match
    if pbkdf2_sha256.verify(password, user.password_hash):
        return user

    # passwords don't match
    raise PasswordMismatchException('authenticate: password mismatch')


def validate_user(email, password):
    """Validate the authentication and return user data or error status.

        inputs: 
        email: str
        password: str

    outputs: 
        response dict with 'status' and 'user_data' keys 
            (user_data omitted if status is not success)
    """

    err_status = deepcopy(ERROR_STATUS)
    error_kwargs = {'email': email}

    try:
        user = authenticate(email, password)

    except (UserNotFoundException, PasswordMismatchException) as e: 
        log_error(e, 1, **error_kwargs)
        err_status['status']['text'] = 'Invaid email and/or password'
        return err_status

    except Exception as e:
        log_error(e, 1, **error_kwargs)
        err_status['status']['text'] = '{} {}'.format(
            'Could not authenticate user.', CONTACT_ADMIN)
        return err_status

    else:
        # if authentication succeeded

        try:
            data = user.get_data()
        except Exception as e:
            log_error(e, 1, **error_kwargs)
            err_status['status']['text'] = '{} {}'.format(
                'Could not get user.', CONTACT_ADMIN)
            return err_status
        else:
            # if user data retrieval succeeded
            succ = deepcopy(SUCCESS_STATUS['status'])
            succ['text'] = 'Successful login for {}.'.format(email)
            return {'user': data, 'status': succ}

def get_user_by_id(user_id):
    """Get user object from user ID."""

    return User.query.get(user_id)


# def get_user_data(user_id):
#     """Get user data and package it up with a status message."""

#     err_status = deepcopy(ERROR_STATUS) 
#     err_status['status']['text'] = 'Could not get user data.'
#     error_kwargs = {'user_id': user_id}

#     user = get_chart_by_id(chart_id)
#     if not user:
#         logging.error("Could not find user id {}".format(user_id))
#         return {'status': err_status}

#     try:
#         data = user.get_data()
#     except Exception as e:
#         log_error(e, 1, **error_kwargs)
#         err_status['status']['text'] = '{} {}'.format(
#             'Could not get data.', CONTACT_ADMIN)
#         return {'status': err_status}
#     else:
#         return {'user': user, 'status': SUCCESS_STATUS['status']}
