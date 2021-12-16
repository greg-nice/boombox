from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Playlist
from app.forms import PlayListForm

playlist_routes = Blueprint('playlists', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET ALL OF SESSION USER'S PLAYLISTS
@user_routes.route('/')
@login_required
def get_sessionuser_playlists():
    user_id = current_user.id
    playlists = Playlist.query.filter(Playlist.user_id == user_id)
    if playlists:
        return {playlist.name for playlist in playlists} #fix this


# GET ONE PLAYLIST
@playlist_routes.route('/<int:id>')
def get_one_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        return playlist.to_dict()
    return {"errors": ["Playlist does not exist"]}


# CREATE NEW PLAYLIST
@playlist_routes.route('/', methods=["POST"])
@login_required
def create_playlist(id):
    user_id = current_user.id
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

# make sure this works if the session user doesn't provide all the fields
    if form.validate_on_submit():
        new_playlist = Playlist(
            user_id=user_id,
            name=form.data["name"],
            pic=form.data["pic"],
            description=form.data["description"],
            public=form.data["public"]
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


# UPDATE PLAYLIST
@playlist_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def update_playlist(id)
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        updated_playlist = Playlist.query.get(id)

        updated_playlist.name=form.data["name"]
        updated_playlist.pic=form.data["pic"]
        updated_playlist.description=form.data["description"]
        updated_playlist.public=form.data["public"]

        db.session.commit()
        return updated_playlist.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


# DELETE ONE PLAYLIST
@playlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_one_playlist(id):
    deleted_playlist = Playlist.query.get(id)
        db.session.delete(playlist)
        db.session.commit()
        return {"delete": id}