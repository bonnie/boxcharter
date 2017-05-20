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

from sqlalchemy.orm.exc import NoResultFound
from passlib.hash import pbkdf2_sha256
from model import User
from boxcharter_exceptions import UserNotFoundException, PasswordMismatchException


def get_user(email):
    """Return User object if the user exists in the system; None otherwise."""

    try:
        return User.query.filter_by(email=email).one()
    except NoResultFound: 
        return None


def authenticate(email, password):
    """Return true if user exists with that password; else raise exception.

    If the user doesn't exist, raise UserNotFoundException
    If the password doesn't match, raise PasswordMismatchException
    """ 

    user = get_user(email)

    if user is None:
        raise UserNotFoundException

    if pbkdf2_sha256.verify(password, user.password_hash):
        return True

    raise PasswordMismatchException