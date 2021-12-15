from app.models import db, Album

def seed_albums():
    graduation = Album(
        title="Graduation",
        artist_id=3,
        pic="https://m.media-amazon.com/images/I/61PIeKEMGLS._SX522_.jpg"
    )

    db.session.add(graduation)

    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()