from flask import Blueprint, request, session
from app.models import User, Playlist, Song, Album, Artist
from app.forms import SearchForm

search_routes = Blueprint('search', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@search_routes.route('/', methods=["POST"])
def results():
    form = SearchForm()
    print("###############", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        query = form.data["query"]
        users = User.query.filter(User.username.ilike(f'%{query}%')).limit(5).all()
        playlists = Playlist.query.filter(Playlist.name.ilike(f'%{form.data["query"]}%')).limit(5).all()
        songs = Song.query.filter(Song.title.ilike(f'%{form.data["query"]}%')).limit(5).all()
        albums = Album.query.filter(Album.title.ilike(f'%{form.data["query"]}%')).limit(5).all()
        artists = Artist.query.filter(Artist.name.ilike(f'%{form.data["query"]}%')).limit(5).all()
        return {
            'users': [user.to_safe() for user in users],
            'playlists': [playlist.to_dict() for playlist in playlists],
            'songs': [song.to_dict() for song in songs],
            'albums': [album.to_dict() for album in albums],
            'artists': [artist.to_dict() for artist in artists]
        }
    return {"errors": validation_errors_to_error_messages(form.errors)}