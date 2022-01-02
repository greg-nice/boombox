from .db import db
import datetime

from .users_playlists import users_playlists


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), default="My New Playlist", nullable=False)
    pic = db.Column(db.String(255), default="https://media.discordapp.net/attachments/920418592820957228/926947291380736010/boombox_signature_square.jpgD39CCE35-F671-405A-A9D3-6DA2D2407DADLarge.jpg")
    description = db.Column(db.String(255))
    public = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    user = db.relationship("User", back_populates="playlists")

    list_songs = db.relationship("Playlist_Song", back_populates="playlist", cascade="all, delete-orphan")

    list_followers = db.relationship(
        "User",
        secondary=users_playlists,
        back_populates="followed_playlists"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'pic': self.pic,
            'description': self.description,
            'public': self.public,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'playlist_songs': [list_song.to_dict() for list_song in self.list_songs],
            'user': self.user.to_safe(),
            'list_followers': {follower.id: follower.to_safe() for follower in self.list_followers}
        }
