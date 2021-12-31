from flask_wtf import FlaskForm
from wtforms.fields.html5 import DateTimeLocalField
from wtforms import IntegerField, StringField, BooleanField
from wtforms.validators import DataRequired, Length


class PlaylistForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(1, 100, "Max length for playlist name is 100 characters")])
    pic = StringField("pic", validators=[Length(-1, 255, "Max length for URL is 255 characters")])
    description = StringField("description", validators=[Length(-1, 255, "Max length for description is 255 characters")])
    # public = BooleanField("public", validators=[AnyOf(True, False, "Public setting can only be True or False.")])
    # created_at = DateTimeLocalField("created_at")
    # updated_at = DateTimeLocalField("updated_at")