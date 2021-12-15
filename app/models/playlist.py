from .db import db
import datetime

from .users_playlists import users_playlists

class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    pic = db.Column(db.String(255))
    description = db.Column(db.String(255))
    public = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    user = db.Relationship("User", back_populates="playlists")
    playlist_songs = db.Relationship("Playlist_Song", back_populates="playlist")

    playlist_followers = db.relationship(
        "User",
        secondary=users_playlists,
        back_populates="followed_playlists"
    )

