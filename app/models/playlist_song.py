from .db import db
import datetime


class Playlist_Song(db.Model):
    __tablename__ = "playlists_songs"

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    playlist = db.relationship("Playlist", back_populates="playlist_songs")
    song = db.relationship("Song", back_populates="playlist_songs")
