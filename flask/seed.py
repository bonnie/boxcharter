"""Adding scales and notes for initial database"""

from model import Key, ScaleNote, User, connect_to_db, db
from server import app


def load_keys():
    """read lines from csv and add to database"""

    print "Loading keys"

    for row in open("seed_data/keys.csv"):
        # example row: A,B,C#,D,E,F#,G#
        row = row.rstrip()
        notes = row.split(',')

        # first make the key
        key = Key(key_name=notes[0])
        db.session.add(key)
        db.session.flush()
        db.session.refresh(key)

        # then make the notes
        for i, note in enumerate(notes):

            print "adding note [" + note + "]"
            print "scale degree [" + str(i) + "]"
            print "key_id [" + str(key.key_id) + "]"
            print

            newnote = ScaleNote(key_id=key.key_id,
                                note_name=note,
                                scale_degree=i)

            db.session.add(newnote)

    # commit work once done
    db.session.commit()


def load_user():
    """create a sample user and return its user object"""

    email = 'bonnie.commerce@gmail.com'
    password = 'abc123'
    fname = 'Bonnie'
    lname = 'Schulkin'

    newuser = User(email=email,
                   password=password,
                   first_name=fname,
                   last_name=lname)

    db.session.commit()
    return newuser


def load_sample_song(user):
    """load a sample song from file, and attach it to passed-in user object"""

    pass


if __name__ == "__main__":
    connect_to_db(app)
    db.drop_all()
    db.create_all()

    load_keys()
    user = load_user()
    load_sample_song(user)
