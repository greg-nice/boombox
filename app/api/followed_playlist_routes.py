from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User
from app.models.db import db

followed_playlist_routes = Blueprint('followed-playlists', __name__)

#GET ALL OF SUSER'S FOLLOWED PLAYLISTS
@followed_playlist_routes.route('/')
@login_required
def get_suser_followed_playlists():
    user_id = current_user.id
    user = User.query.get(user_id)
    if user:
        return {playlist.id: playlist.to_dict() for playlist in user.followed_playlists}