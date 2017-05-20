"""Tests for BoxCharter user processing."""

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

# be able to import from parent dir
import sys
sys.path.append('..')

from run_tests import DbTestCase, TEST_EMAIL, TEST_PW
from server import app
from model import db, User
from user_processing import get_user, authenticate


class UserTests(DbTestCase):
    """Test user processing."""

    def setUp(self):
        """Stuff to do before every test."""

        self.db_setup()
        self.load_test_data()

    def tearDown(self):
        """Stuff to do after every test."""

        self.db_teardown()

    def test_get_user_exists(self):
        """Test get_user function when user exists."""

        user = get_user(TEST_EMAIL)
        self.assertEqual(user.email, TEST_EMAIL)

    def test_authenticate_correct_pw(self):
        """Test the checking of an entered password against the database."""

        valid = authenticate(TEST_EMAIL, TEST_PW)
        self.assertTrue(valid)
