from .db import db


class Album(db.Model):
    __tablename__ = "albums"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    pic = db.Column(db.String(255), nullable=False)

    songs = db.relationship("Song", back_populates="album", cascade="all, delete-orphan")
    artist = db.relationship("Artist", back_populates="albums")
