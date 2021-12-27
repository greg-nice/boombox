from app.models import db, Album

def seed_albums():
    graduation = Album(
        title="Graduation",
        artist_id=3,
        pic="https://m.media-amazon.com/images/I/61PIeKEMGLS._SX522_.jpg"
    )

    db.session.add(graduation)
    db.session.commit()

    licensed = Album(
        title="Licensed to Ill",
        artist_id=1,
        pic="https://m.media-amazon.com/images/I/61NgxeiysCL._SX522_.jpg"
    )

    evil = Album(
        title="Evil Empire",
        artist_id=2,
        pic="https://m.media-amazon.com/images/I/71wiTg29ZvL._SX522_.jpg"
    )

    db.session.add(licensed)
    db.session.add(evil)
    db.session.commit()


def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()