from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .users_users import users_users
from .users_playlists import users_playlists
from .users_songs import users_songs
from .users_albums import users_albums
from .users_artists import users_artists


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), default="https://media.discordapp.net/attachments/920418592820957228/938207079045414942/734189-middle.png")
    hashed_password = db.Column(db.String(255), nullable=False)

    playlists = db.relationship("Playlist", back_populates="user", cascade="all, delete-orphan")

    followers = db.relationship(
        'User',
        secondary=users_users,
        primaryjoin=(users_users.c.followed_id == id),
        secondaryjoin=(users_users.c.follower_id == id),
        backref=db.backref('following', lazy='dynamic'),
        lazy='dynamic'
    )

    followed_playlists = db.relationship(
        'Playlist',
        secondary=users_playlists,
        back_populates="list_followers"
    )

    followed_songs = db.relationship(
        'Song',
        secondary=users_songs,
        back_populates="song_followers"
    )

    followed_albums = db.relationship(
        'Album',
        secondary=users_albums,
        back_populates="album_followers"
    )

    followed_artists = db.relationship(
        'Artist',
        secondary=users_artists,
        back_populates="artist_followers"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic if self.profile_pic else "none"
            # 'playlists': [playlist.id for playlist in self.playlists],
            # 'following': [followed.id for followed in self.following],
            # 'followers': [follower.id for follower in self.followers],
            # 'followed_playlists': [playlist.id for playlist in self.followed_playlists]
        }

    def to_mydict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_pic': self.profile_pic if self.profile_pic else None,
            # 'email': self.email,
            'playlists': list(filter(lambda playlist: playlist["public"] == True, [playlist.to_dict() for playlist in self.playlists])),
            'following': [followed.to_safe() for followed in self.following],
            'followers': [follower.to_safe() for follower in self.followers],
            'followed_playlists': [playlist.name for playlist in self.followed_playlists]
        }

    def to_safe(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_pic': self.profile_pic
        }
