from app.models import db, Playlist_Song

def seed_playlists_songs():
    stronger = Playlist_Song(
        playlist_id=1,
        song_id=1,
        order=1
    )

    db.session.add(stronger)
    db.session.commit()

    nosleep = Playlist_Song(
        playlist_id=1,
        song_id=3,
        order=2
    )

    bulls = Playlist_Song(
        playlist_id=1,
        song_id=6,
        order=3
    )

    fight = Playlist_Song(
        playlist_id=3,
        song_id=4,
        order=1
    )

    people = Playlist_Song(
        playlist_id=2,
        song_id=5,
        order=2
    )

    goodlife = Playlist_Song(
        playlist_id=2,
        song_id=2,
        order=1
    )

    db.session.add(nosleep)
    db.session.add(bulls)
    db.session.add(fight)
    db.session.add(people)
    db.session.add(goodlife)
    db.session.commit()

def undo_playlists_songs():
    db.session.execute('TRUNCATE playlists_songs RESTART IDENTITY CASCADE;')
    db.session.commit()