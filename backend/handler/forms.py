from wtforms import Form, StringField, IntegerField, TextAreaField, PasswordField, validators


class RegisterForm(Form):
    username = StringField('Username', [validators.Length(min=1, max=15)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')


class HeroForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=200)])
    ability = StringField('Ability', [validators.Length(min=1, max=200)])
    power = IntegerField('Power', [validators.DataRequired()])
