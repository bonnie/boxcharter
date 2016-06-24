"""boxcharter box chart web app server"""

######################################################
# import

from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, \
                  jsonify

# so jinja and angular can coexist peacably
# from flask.ext.triangle import Triangle

from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, db, User, Chart, Section, Measure, \
                  Chord, Lyric, Key, ScaleNote

# for environment variables
import os

######################################################
# Flask / Jinja setup

app = Flask(__name__)

# for jinja / angular support
# Triangle(app)

# for Flask session and debug DebugToolbar
app.secret_key = os.environ.get('FLASK_SECRET_KEY')

# to get errors if there's an undefined Jinja variables
# app.jinja_env.undefined = StrictUndefined


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


@app.route('/get_chart/<int:chart_id>')
def return_chart_json(chart_id):
    """Return JSON object containing chart data"""

    chart = Chart.query.filter_by(chart_id=chart_id)

    # TODO: big-ass list/dictionary comprehension here to make object
    sections = [section.section_name for section in enumerate(chart.sections)]

    return jsonify({"sections": sections})


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
