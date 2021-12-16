from .db import db

from .users_songs import users_songs


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    song_num = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    data_url = db.Column(db.String(255), nullable=False)

    playlist_songs = db.relationship("Playlist_Song", back_populates="song", cascade="all, delete-orphan")
    album = db.relationship("Album", back_populates="songs")
    artist = db.relationship("Artist", back_populates="songs")

    song_followers = db.relationship(
        "User",
        secondary=users_songs,
        back_populates="followed_songs"
    )