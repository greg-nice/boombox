from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoUser', email='demo@aa.io', password='password', profile_pic="https://media.discordapp.net/attachments/920418592820957228/925832678140428308/1_ZYpBSAe0dC4_ha-3GhcO9Q.jpeg?width=1068&height=1068")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_pic="https://media.discordapp.net/attachments/920418592820957228/925832678371102761/c7d8e690f8c75ce233b87740957fb08654-17-oprahwinfrey.rsquare.w700.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_pic="https://media.discordapp.net/attachments/920418592820957228/925832677918146590/MV5BODNiZjM4ZTQtNzRlZC00MmE5LWExNjAtNzM0MTYzMGJmZDA5XkEyXkFqcGdeQXVyMTk1NDc5MDg._V1_.jpg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

    demo.followers.append(bobbie)
    demo.followers.append(marnie)
    demo.following.append(bobbie)
    demo.following.append(marnie)
    bobbie.followers.append(marnie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
