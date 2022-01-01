from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db

follows_routes = Blueprint('follows', __name__)


#GET ALL OF SUSER'S FOLLOWS
@follows_routes.route('/')
@login_required
def get_suser_follows():
    user_id = current_user.id
    user = User.query.get(user_id)
    user = user.to_mydict()
    follows = {}
    if user:
        follows["followers"] = {follower["id"]: follower for follower in user["followers"]}
        follows["following"] = {followed["id"]: followed for followed in user["following"]}
        return follows
    # else?

#ADD ONE USER TO SUSER'S FOLLOWING LIST

@follows_routes.route('/following/<int:followedId>', methods=["POST"])
@login_required
def add_suser_followed(followedId):
    user_id = current_user.id
    user = User.query.get(user_id)
    followed = User.query.get(followedId)
    if user and followed:
        user.following.append(followed)
        db.session.commit()
        return followed.to_safe()
    # else?

#UPDATE FOLLOW/DELETE ONE USER FROM SUSER'S FOLLOWING LIST

@follows_routes.route('/following/<int:followedId>', methods=["DELETE"])
@login_required
def delete_suser_followed(followedId):
    user_id = current_user.id
    user = User.query.get(user_id)
    followed = User.query.get(followedId)
    if user and followed:
        user.following.remove(followed)
        db.session.commit()
        return str(followed.to_safe()["id"])