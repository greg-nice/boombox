from app.models import db, Playlist


def seed_playlists():
    PL1 = Playlist(
        user_id=1,
        name="Awesome Jamz",
        pic="https://images-ext-1.discordapp.net/external/dvlGIiEtx8-ws4FgSmN8XHyB3IjDZj7MUg08gHpChRw/https/i.redd.it/0ls5x7mm8r011.jpg"
    )

    PL2 = Playlist(
        user_id=1,
        name="Sleepy Music",
        pic="https://i1.sndcdn.com/artworks-VeEiv24OKi2eTRbM-kcDU7g-t500x500.jpg"
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