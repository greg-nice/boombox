from .db import db


users_users = db.Table(
    'users_users',
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)