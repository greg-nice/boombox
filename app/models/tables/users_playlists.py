from .db import db


users_playlists = db.Table(
    "users_playlists",
    db.Column(
        "list_follower_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "followed_list_id",
        db.Integer,
        db.ForeignKey("playlists.id"),
        primary_key=True
    )
)