from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Playlist, Playlist_Song
from app.forms import PlaylistForm
from app.models.db import db
import datetime
import boto3
import botocore
from app.config import Config
from app.aws_s3 import upload_file_to_s3

playlist_routes = Blueprint('playlists', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET FEATURED PLAYLIST
@playlist_routes.route('/featured')
def get_featured_playlists():
    plists = []
    featured_list1 = Playlist.query.get(1)# playlist number)
    featured_list2 = Playlist.query.get(2)# playlist number)
    featured_list3 = Playlist.query.get(3)# playlist number)
    featured_list4 = Playlist.query.get(4)# playlist number)
    plists.append(featured_list1)
    plists.append(featured_list2)
    plists.append(featured_list3)
    plists.append(featured_list4)
    featured_playlists = {plist.id: plist.to_dict() for plist in plists}
    return featured_playlists


# GET ALL OF SESSION USER'S PLAYLISTS
@playlist_routes.route('/')
@login_required
def get_sessionuser_playlists():
    user_id = current_user.id
    print("^^^^^^^^^^^", user_id)
    # playlists = Playlist.query.filter(Playlist.user_id == user_id).all()
    # print("PLAYLISTSSSSSS", playlists)
    # if playlists:
    #     return {playlist.id: playlist.to_dict() for playlist in playlists}
    # elif len(playlists) == 0:
    #     print("USER HAS NO PLAYLISTS!!!")
    #     return {}
    # else handle errors??
    user = User.query.get(user_id)
    if user:
        return {playlist.id: playlist.to_dict() for playlist in user.playlists}


# GET ONE PLAYLIST
@playlist_routes.route('/<int:id>')
def get_one_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        return playlist.to_dict()
    return {"errors": ["Playlist does not exist"]}





# # CREATE NEW PLAYLIST
# @playlist_routes.route('/', methods=["POST"])
# @login_required
# def create_playlist():
#     user_id = current_user.id
#     form = PlaylistForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

# # make sure this works if the session user doesn't provide all the fields
#     if form.validate_on_submit():
#         new_playlist = Playlist(
#             user_id=user_id,
#             name=form.data["name"],
#             pic=form.data["pic"],
#             description=form.data["description"],
#             public=form.data["public"]
#         )
#         db.session.add(new_playlist)
#         db.session.commit()
#         return new_playlist.to_dict()
#     return {"errors": validation_errors_to_error_messages(form.errors)}


# CREATE NEW PLAYLIST SIMPLE
@playlist_routes.route("/simple", methods=["POST"])
@login_required
def create_simple_playlist():
    user_id = current_user.id
    user = User.query.get(user_id)
    new_playlist = Playlist(
        user_id=user_id,
        name="My Playlist #{}".format(str(len(user.playlists) + 1) if user.playlists else "1") 
    )
    db.session.add(new_playlist)
    db.session.commit()
    return new_playlist.to_dict()
# add error handling


# UPDATE PLAYLIST METADATA
@playlist_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_playlist(id):
    form = PlaylistForm()
    # print("WHOOOOOOOOOOOA", form.data)
    # print(request.form)
    # req = request.get_json()
    # print(req)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        updated_playlist = Playlist.query.get(id)

        updated_playlist.name=form.data["name"]
        if form.data["description"] == "":
            updated_playlist.description=None
        else:    
            updated_playlist.description=form.data["description"]
        # updated_playlist.created_at=datetime.datetime.now

        db.session.commit()
        return updated_playlist.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}


# update playlist pic
@playlist_routes.route('/<int:id>/update_pic', methods=["PUT"])
@login_required
def update_playlist_pic(id):
    updated_playlist = Playlist.query.get(id)
    if updated_playlist:
        file = request.files["file"]
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        if file_url:
            updated_playlist.pic = file_url
            db.session.commit()
            return updated_playlist.to_dict()
        return updated_playlist.to_dict()

# use default playlist pic
@playlist_routes.route('/<int:id>/resetpic', methods=["PUT"])
@login_required
def reset_playlist_pic(id):
    updated_playlist = Playlist.query.get(id)
    if updated_playlist:
        updated_playlist.pic = "https://media.discordapp.net/attachments/920418592820957228/926947291380736010/boombox_signature_square.jpgD39CCE35-F671-405A-A9D3-6DA2D2407DADLarge.jpg"
        db.session.commit()
        return updated_playlist.to_dict()


# make playlist public
@playlist_routes.route('/<int:id>/public', methods=["PUT"])
@login_required
def make_playlist_public(id):
    updated_playlist = Playlist.query.get(id)
    if updated_playlist:
        updated_playlist.public=True
        db.session.commit()
        return updated_playlist.to_dict()

# make playlist private
@playlist_routes.route('/<int:id>/private', methods=["PUT"])
@login_required
def make_playlist_private(id):
    updated_playlist = Playlist.query.get(id)
    if updated_playlist:
        updated_playlist.public=False
        db.session.commit()
        return updated_playlist.to_dict()


# DELETE ONE PLAYLIST
@playlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_one_playlist(id):
    deleted_playlist = Playlist.query.get(id)
    db.session.delete(deleted_playlist)
    db.session.commit()
    return {"delete": id}

# # is this route ever used?? if not, delete it
# # GET PLAYLIST_SONGS
# @playlist_routes.route('/<int:id>/playlists_songs')
# def get_playlist_songs(id):
#     playlist_songs = Playlist_Song.query.filter(Playlist_Song.playlist_id == id)
#     if playlist_songs:
#         return {playlist_song.id: playlist_song.to_dict() for playlist_song in playlist_songs}

# ADD SONG TO PLAYLIST

def getOrder(playlist):
    playlist = playlist.to_dict()
    print("^^^^^^^^^", playlist)
    print("%%%%%%%%%", playlist["playlist_songs"])
    plsongsList = playlist["playlist_songs"]
    if len(plsongsList) == 0:
        return 0
    plsongsOrderList = [int(plsong["order"]) for plsong in plsongsList]
    maxNum = max(plsongsOrderList)
    return maxNum

@playlist_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def add_playlist_song(id):
    updated_playlist = Playlist.query.get(id)
    req = request.get_json()
    print("&&&&&&&&&&&", req)
    if updated_playlist:
        new_playlist_song = Playlist_Song(
            playlist_id=id,
            song_id=int(req["songId"]),
            order=(getOrder(updated_playlist) + 1)
        )
        updated_playlist.list_songs.append(new_playlist_song)
        db.session.commit()
        return updated_playlist.to_dict()

#DELETE SONG FROM PLAYLIST

@playlist_routes.route('/<int:id>/playlist_songs/<int:playlist_song_id>', methods=["DELETE"])
@login_required
def delete_playlist_song(id, playlist_song_id):
    updated_playlist = Playlist.query.get(id)
    print("***********", updated_playlist.list_songs)
    deleted_playlist_song = Playlist_Song.query.get(playlist_song_id)
    deleted_song_order = deleted_playlist_song.order
    print("9999999999999", deleted_song_order)
    if updated_playlist:
        updated_playlist.list_songs.remove(deleted_playlist_song)
        db.session.commit()
        for list_song in updated_playlist.list_songs:
            if list_song.order > deleted_song_order:
                list_song.order -= 1
        db.session.commit()
        return updated_playlist.to_dict()


#ADD SESSION USER AS FOLLOWER TO A PLAYLIST

@playlist_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def add_playlist_follow(id):
    user_id = current_user.id
    user = User.query.get(user_id)
    playlist = Playlist.query.get(id)
    if user and playlist:
        playlist.list_followers.append(user)
        db.session.commit()
        return user.to_safe()


#UPDATE PLAYLIST FOLLOW / DELETE SESSION USER AS FOLLOWER TO A PLAYLIST

@playlist_routes.route('/<int:id>/follow', methods=["DELETE"])
@login_required
def delete_playlist_follow(id):
    user_id = current_user.id
    user = User.query.get(user_id)
    playlist = Playlist.query.get(id)
    if user and playlist:
        playlist.list_followers.remove(user)
        db.session.commit()
        return str(user.id)
        