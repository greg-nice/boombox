from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Playlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

#GET ONE USER'S PLAYLISTS
@user_routes.route('/<int:id>/playlists')
@login_required
def get_user_playlists(id):
    playlists = Playlist.query.filter(Playlist.user_id == id).all()
    if playlists:
        return #stuff


# CREATE NEW PLAYLIST WITH PLUS BUTTON
@user_routes.route('/<int:id>/playlists', methods=["POST"])
@login_required
def create_playlist(id):

    playlist = Playlist(
        user_id = id,
        name = #default name should be the length of the number of user's playlists + 1
    )

    db.session.add(playlist)
    db.session.commit

    return #stuff


# UPDATE PLAYLIST
@playlist_routes.route('/<int:id>/playlists/<int:playlist_id>', methods=["PUT"])
@login_required
def update_playlist(id)
    playlist = Playlist.query.get(playlist_id)
    if playlist:
        #playlist.fieldname = stuff
        db.session.commit()
        return #stuff
    else:
        return #stuff