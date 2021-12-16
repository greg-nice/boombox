from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .users_users import users_users
from .users_playlists import users_playlists


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    playlists = db.relationship("Playlist", back_populates="user", cascade="all, delete-orphan")

    users_users = db.relationship(
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
            'playlists': [playlist.name for playlist in self.playlists]
        }
