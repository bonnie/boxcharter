"""boxcharter box chart web app server"""

######################################################
# import

from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, db, User, Chart, Section, Measure, \
                  Chord, Lyric, Key, ScaleNote

# for environment variables
import os

######################################################
# Flask / Jinja setup

app = Flask(__name__)

# for Flask session and debug DebugToolbar
app.secret_key = os.environ.get('FLASK_SECRET_KEY')

# to get errors if there's an undefined Jinja variables
app.jinja_env.undefined = StrictUndefined


#########################################################
# routes

@app.route('/')
def index():
    """Homepage"""

    return render_template("index.html")


@app.route('/register')
def register_form():
    """Show form for user signup"""

    return render_template("register_form.html")


@app.route('/chart_editor')
def chart_page():
    """Create and edit box charts"""

    return render_template("chart_editor.html")


@app.route('/save_chart')
def save_chart():
    """Save a new or modified box chart"""

    # this will probably be ajax-y
    pass

if __name__ == "__main__":

    # for testing purposes
    app.debug = True

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run()
