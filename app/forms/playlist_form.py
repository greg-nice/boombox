from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField, DateTimeLocalField
from wtforms.validators import DataRequired, Length


class PlaylistForm(FlaskForm):
    name = IntegerField("name", validators=[DataRequired(), Length(1, 100, "Max length for playlist name is 100 characters")])
    pic = StringField("pic", validators=[Length(-1, 100, "Max length for URL is 255 characters")]
    description = StringField("description", validators=[Length(-1, 255, "Max length for description is 255 characters")])
    public = BooleanField("public", validators=[DataRequired()])
    created_at = DateTimeLocalField("created_at", validators=[DataRequired()], format='%Y-%m-%dTH:%M:%S')
    updated_at = DateTimeLocalField("updated_at", validators=[DataRequired()])