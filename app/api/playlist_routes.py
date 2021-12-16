from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Playlist

playlist_routes = Blueprint('playlists', __name__)


# READ ONE PLAYLIST
@playlist_routes.route('/<int:id>')
@login_required
def get_one_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        return #stuff
    else:
        return #stuff


# DELETE ONE PLAYLIST
@playlist_routes.route('/<int:id>')
@login_required
def delete_one_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return #stuff
    else:
        return #stuff