from .db import db


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    song_num = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    data_url = db.COlumn(db.String(255), nullable=False)