from flask import Blueprint
from app.models import Album

album_routes = Blueprint('albums', __name__)

@album_routes.route('/<int:id>')
def get_album(id):
    album = Album.query.get(id)
    if album:
        return album.to_mydict()