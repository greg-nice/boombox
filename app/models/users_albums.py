from .db import db


users_albums = db.Table(
    "users_albums",
    db.Column(
        "album_follower_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "followed_album_id",
        db.Integer,
        db.ForeignKey("albums.id"),
        primary_key=True
    )
)