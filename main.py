from flask import Flask, url_for, render_template, request, send_from_directory

from Logos.PlayerManagerClass import PlayerBD

BD = PlayerBD("d")

app = Flask(__name__, static_folder="", template_folder="")

def ReGet(key:str, default=None) -> (str | None):
	return request.headers.get(key, default)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template(url_for("static", filename="pages/index.html"))

@app.route("/maze", methods=['GET', 'POST'])
def maze():
    return render_template(url_for("static", filename="pages/Maze.html"))

@app.route("/plane", methods=['GET', 'POST'])
def plane():
    return render_template(url_for("static", filename="pages/Planes.html"))

#app.add_url_rule("/":path, None, main:function)
"""
>>> @app.route('/user/<username>')
... def profile(username): pass
"""

#LogosBlock
@app.route("/logos", methods=['GET', 'POST'])
def Logos():
    return render_template(url_for("static", filename="pages/Logos.html"))

@app.route("/logos/login", methods=['GET', 'POST'])
def LogosLogin():
    Login = ReGet("nick")
    Password = ReGet("pass")
    return BD.Login(Login, Password)

@app.route("/logos/register", methods=['GET', 'POST'])
def LogosRegister():
    Login = ReGet("nick")
    Password = ReGet("pass")
    return BD.Register(Login, Password)


app.run(debug=False, port=5000)