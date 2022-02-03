from flask import Blueprint, request, session
from flask_login import login_required
from sqlalchemy.orm import joinedload
from app.models import User, Playlist, Song, Album, Artist, Playlist_Song
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
        songs = Song.query.filter(Song.title.ilike(f'%{query}%')).limit(5).all()
        artists = Artist.query.filter(Artist.name.ilike(f'%{query}%')).limit(5).all()
        albums = Album.query.filter(Album.title.ilike(f'%{query}%')).limit(5).all()
        playlists = Playlist.query.filter(Playlist.name.ilike(f'%{query}%')).limit(5).all()
        users = User.query.filter(User.username.ilike(f'%{query}%')).limit(5).all()

        artistSongs = Song.query.join(Artist).filter(Artist.name.in_([artist.name for artist in artists])).limit(5).options(joinedload(Song.artist)).all()
        artistAlbums = Album.query.join(Artist).filter(Artist.name.in_([artist.name for artist in artists])).limit(5).options(joinedload(Album.artist)).all()
        songArtists = Artist.query.join(Song).filter(Song.title.in_([song.title for song in songs])).limit(5).options(joinedload(Artist.songs)).all()
        songAlbums = Album.query.join(Song).filter(Song.title.in_([song.title for song in songs])).limit(5).options(joinedload(Album.songs)).all()
        albumArtists = Artist.query.join(Album).filter(Album.title.in_([album.title for album in albums])).limit(5).options(joinedload(Artist.albums)).all()
        albumSongs = Song.query.join(Album).filter(Album.title.in_([album.title for album in albums])).limit(5).options(joinedload(Song.album)).all()
        # albumPlaylists = Playlist.query.join(Album).filter(Album.title.in_([album.title for album in albums])).limit(5).options(joinedload(Playlist.albums)).all()
        # songPlaylists
        # artistPlaylists
        songPlaylists = Playlist.query.join(Playlist_Song).filter(Playlist_Song.song_id.in_([song.id for song in songs])).limit(5).options(joinedload(Playlist.list_songs)).all()
        albumPlaylists = Playlist.query.join(Playlist_Song).join(Song).filter(Song.album_id.in_([album.id for album in albums])).limit(5).options(joinedload(Playlist.list_songs)).all()
        artistPlaylists = Playlist.query.join(Playlist_Song).join(Song).filter(Song.artist_id.in_([artist.id for artist in artists])).limit(5).options(joinedload(Playlist.list_songs)).all()


        songs = set(songs + artistSongs + albumSongs)
        albums = set(albums + artistAlbums + songAlbums)
        artists = set(artists + songArtists + albumArtists)
        playlists = set(playlists + songPlaylists + albumPlaylists + artistPlaylists)

        return {
            'songs': [song.to_dict() for song in songs],
            'artists': [artist.to_dict() for artist in artists],
            'albums': [album.to_mydict() for album in albums],
            'playlists': [playlist.to_dict() for playlist in playlists],
            'users': [user.to_safe() for user in users],
        }
    return {"errors": validation_errors_to_error_messages(form.errors)}

@search_routes.route('/from_playlist', methods=['POST'])
@login_required
def search_from_playlist():
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        query = form.data["query"]
        songs = Song.query.filter(Song.title.ilike(f'%{query}%')).limit(25).all()
        artists = Artist.query.filter(Artist.name.ilike(f'%{query}%')).limit(5).all()
        artistSongs = Song.query.join(Artist).filter(Artist.name.in_([artist.name for artist in artists])).limit(25).options(joinedload(Song.artist)).all()
        albums = Album.query.filter(Album.title.ilike(f'%{query}%')).limit(5).all()
        albumSongs = Song.query.join(Album).filter(Album.title.in_([album.title for album in albums])).limit(25).options(joinedload(Song.album)).all()
        songs = set(songs + artistSongs + albumSongs)

        return {"songs": [song.to_dict() for song in songs]}
    return {"errors": validation_errors_to_error_messages(form.errors)}

