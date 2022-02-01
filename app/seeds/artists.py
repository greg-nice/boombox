from app.models import db, Artist


# Adds a demo user, you can add other users here if you want
def seed_artists():
    beasties = Artist(
        name='Beastie Boys', pic='https://media.discordapp.net/attachments/920418592820957228/938207654218723368/w_960.jpeg?width=1492&height=995')
    rage = Artist(
        name='Rage Against the Machine', pic='https://media.discordapp.net/attachments/920418592820957228/938207951750049902/160851.jpeg?width=1518&height=994')
    kanye = Artist(
        name='Kanye West', pic="https://media.discordapp.net/attachments/920418592820957228/938208074068533298/211019-ye-kanye-west-mb-1112.webp",
    )

    db.session.add(beasties)
    db.session.add(rage)
    db.session.add(kanye)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_artists():
    db.session.execute('TRUNCATE artists RESTART IDENTITY CASCADE;')
    db.session.commit()