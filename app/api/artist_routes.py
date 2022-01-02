from flask import Blueprint
from app.models import Artist

artist_routes = Blueprint('artists', __name__)

@artist_routes.route('/<int:id>')
def get_album(id):
    artist = Artist.query.get(id)
    if artist:
        return artist.to_dict()