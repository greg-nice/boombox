from app.models import db, Playlist, User


def seed_playlists():
    PL1 = Playlist(
        user_id=1,
        name="Awesome Jamz",
        pic="https://media.discordapp.net/attachments/920418592820957228/938204811214618654/0ls5x7mm8r011.jpeg",
        public=True
    )

    PL2 = Playlist(
        user_id=1,
        name="Purple Moon II",
        pic="https://media.discordapp.net/attachments/920418592820957228/938204271403475014/artworks-VeEiv24OKi2eTRbM-kcDU7g-t500x500.jpeg",
        public=True
    )

    PL3 = Playlist(
        user_id=2,
        name="Totally 80s!",
        pic="https://media.discordapp.net/attachments/920418592820957228/938192969322876939/57823.png",
        public=True
    )

    PL4 = Playlist(
        user_id=2,
        name="Reggae Tunes",
        pic="https://media.discordapp.net/attachments/920418592820957228/938205975909892146/jamaica.png",
        public=True
    )

    db.session.add(PL1)
    db.session.add(PL2)
    db.session.add(PL3)
    db.session.add(PL4)

    db.session.commit()

    demo = User.query.get(1)
    marnie = User.query.get(2)
    PL1.list_followers.append(marnie)
    PL3.list_followers.append(demo)

    db.session.commit()


def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()