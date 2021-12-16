from .db import db


users_songs = db.Table(
    "users_songs",
    db.Column(
        "song_follower_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "followed_song_id",
        db.Integer,
        db.ForeignKey("songs.id"),
        primary_key=True
    )
)