from app.models import db, Song

def seed_songs():
    stronger = Song(
        title="Stronger",
        artist_id=3,
        album_id=1,
        song_num=3,
        length=315,
        data_url="https://cdn.discordapp.com/attachments/920418592820957228/920816049333628938/Stronger.mp3"
    )

    db.session.add(stronger)

    db.session.commit()

def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()