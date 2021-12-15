from app.models import db, Playlist


def seed_playlists():
    PL1 = Playlist(
        user_id=1,
        name="Awesome Jamz"
    )

    PL2 = Playlist(
        user_id=1,
        name="Sleepy Music"
    )

    PL3 = Playlist(
        user_id=2,
        name="Totally 80s!"
    )

    PL4 = Playlist(
        user_id=2,
        name="Reggae Tunes"
    )

    db.session.add(PL1)
    db.session.add(PL2)
    db.session.add(PL3)
    db.session.add(PL4)

    db.session.commit()

def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()