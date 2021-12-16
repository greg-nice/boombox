from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField, DateTimeLocalField
from wtforms.validators import DataRequired, Length


class PlaylistForm(FlaskForm):
    name = IntegerField("name", validators=[DataRequired(), Length()])
    pic = StringField("pic", validators=[Length()]
    description = StringField("description")
    public = BooleanField("public", validators=[DataRequired()])
    created_at = DateTimeLocalField("created_at", validators=[DataRequired()])
    updated_at = DateTimeLocalField("updated_at", validators=[DataRequired()])