"""Tests for database and Flask server of BoxCharter app. 

This file simply collects and runs tests in other files (separated for better
organization). It also holds common constants.
"""

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

import unittest
from model import db, connect_to_db 
from server import app
from seed import load_seed_data

TESTDATA_DIR = './seed_data'
TESTDB_URI = 'postgresql:///boxchart_tests'
TEST_EMAIL = 'example@example.com'
TEST_PW = 'abc123'

class DbTestCase(unittest.TestCase):
    """Parent class for tests that need db setup"""

    @classmethod
    def load_test_data(cls):
        """Load test data into db."""

        load_seed_data(TESTDATA_DIR)


    @classmethod
    def db_setup(cls):
        """Set up database for testing"""

        connect_to_db(app, TESTDB_URI)
        db.create_all()

    @classmethod
    def db_teardown(cls):
        """Tear down database for testing"""

        db.session.close()
        db.drop_all()

    @classmethod
    def setUpClass(cls):
        """Stuff to do once before running all class test methods."""

        # cls.db_setup()


    @classmethod
    def tearDownClass(cls):
        """Stuff to do once after running all class test methods."""

        # cls.db_teardown()
  

if __name__ == '__main__':

    # import the tests
    from tests.user_tests import UserTests

    # run the tests
    unittest.main()
