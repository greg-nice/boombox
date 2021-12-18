from .db import db
import datetime


class Playlist_Song(db.Model):
    __tablename__ = "playlists_songs"

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    playlist = db.relationship("Playlist", back_populates="list_songs")
    
    song = db.relationship("Song", back_populates="playlist_songs")

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_id': self.playlist_id,
            'song_id': self.song_id,
            'order': self.order,
            'created_at': self.created_at,
            'song': self.song.to_dict()
        }

