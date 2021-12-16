from .db import db


users_artists = db.Table(
    "users_artists",
    db.Column(
        "artist_follower_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "followed_artist_id",
        db.Integer,
        db.ForeignKey("artists.id"),
        primary_key=True
    )
)