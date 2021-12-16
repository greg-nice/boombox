from .db import db

from .users_artists import users_artists


class Artist(db.Model):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    pic = db.Column(db.String(255), nullable=False)

    albums = db.relationship("Album", back_populates="artist", cascade="all, delete-orphan")
    songs = db.relationship("Song", back_populates="artist", cascade="all, delete-orphan")

    artist_followers = db.relationship(
        "User",
        secondary=users_artists,
        back_populates="followed_artists"
    )