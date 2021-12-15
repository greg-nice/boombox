from app.models import db, Playlist_Song

def seed_playlists_songs():
    stronger = Playlist_Song(
        playlist_id=1,
        song_id=1,
        order=1
    )


    db.session.add(stronger)

    db.session.commit()

def undo_playlists_songs():
    db.session.execute('TRUNCATE playlists_songs RESTART IDENTITY CASCADE;')
    db.session.commit()