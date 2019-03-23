from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Welcome to the Software Testing Project: Endgame'


if __name__ == '__main__':
    app.secret_key = 'secret123'
    app.run(debug=True)
