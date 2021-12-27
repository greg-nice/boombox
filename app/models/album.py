from .db import db

from .users_albums import users_albums


class Album(db.Model):
    __tablename__ = "albums"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    pic = db.Column(db.String(255), nullable=False)

    songs = db.relationship("Song", back_populates="album", cascade="all, delete-orphan")
    artist = db.relationship("Artist", back_populates="albums")

    album_followers = db.relationship(
        "User",
        secondary=users_albums,
        back_populates="followed_albums"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist_id": self.artist_id,
            "pic": self.pic
        }