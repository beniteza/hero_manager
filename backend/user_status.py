from flask import flash, redirect, url_for, session
from functools import wraps


def is_logged_in(f):  # Check if user is logged in
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, please log in', 'danger')
            return redirect(url_for('login_get'))
    return wrap


def is_logged_out(f):  # Check if user is logged out
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            flash('Unauthorized, please logout', 'danger')
            return redirect(url_for('users'))
        else:
            return f(*args, **kwargs)
    return wrap
