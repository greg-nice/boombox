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

    goodlife = Song(
        title="Good Life",
        artist_id=3,
        album_id=1,
        song_num=5,
        length=207,
        data_url="https://cdn.discordapp.com/attachments/920418592820957228/925085788318875648/Good_Life_ft._T-Pain_copy.mp3"
    )

    nosleep = Song(
        title="No Sleep Till Brooklyn",
        artist_id=1,
        album_id=2,
        song_num=8,
        length=247,
        data_url="https://cdn.discordapp.com/attachments/920418592820957228/925085296486396015/08_No_Sleep_Till_Brooklyn_copy.m4a"
    )

    fight = Song(
        title="Fight For Your Right",
        artist_id=1,
        album_id=2,
        song_num=7,
        length=207,
        data_url="https://cdn.discordapp.com/attachments/920418592820957228/925085404162588763/07_Fight_For_Your_Right_copy.m4a"
    )

    people = Song(
        title="People Of The Sun",
        artist_id=2,
        album_id=3,
        song_num=1,
        length=150,
        data_url="https://cdn.discordapp.com/attachments/920418592820957228/925085620009832538/01_People_Of_The_Sun_copy.m4a"
    )

    bulls = Song(
        title="Bulls On Parade",
        artist_id=2,
        album_id=3,
        song_num=2,
        length=231,
        data_url="https://cdn.discordapp.com/attachments/920418592820957228/925085534680924180/02_Bulls_On_Parade_copy.m4a"
    )

    db.session.add(goodlife)
    db.session.add(nosleep)
    db.session.add(fight)
    db.session.add(people)
    db.session.add(bulls)
    db.session.commit()

def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()