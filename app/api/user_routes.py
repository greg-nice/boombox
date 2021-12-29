from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Playlist

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_mydict()


# #GET ALL OF ANY USER'S PLAYLISTS
# @user_routes.route('/<int:id>/playlists')
# def get_user_playlists(id):
#     if id == current_user.id:
#         playlists = Playlist.query.filter(Playlist.user_id == id).all()
#     else:
#         playlists = Playlist.query.filter(Playlist.user_id == id and Playlist.public == True).all()
#     if playlists:
#         return #stuff

