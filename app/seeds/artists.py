from app.models import db, Artist


# Adds a demo user, you can add other users here if you want
def seed_artists():
    beasties = Artist(
        name='Beastie Boys', pic='https://media.wired.com/photos/5e1f74f30a849800092e8d47/master/w_960')
    rage = Artist(
        name='Rage Against the Machine', pic='https://images.radiox.co.uk/images/160851')
    kanye = Artist(
        name='Kanye West', pic="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_42/3513498/211019-ye-kanye-west-mb-1112.JPG",
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