from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class SearchForm(FlaskForm):
    query = StringField('query', validators=[DataRequired(), Length(1, 800, "Query length cannot exceed 800 characters.")])