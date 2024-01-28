from flask import Flask, url_for, render_template, request, send_from_directory, Response

from Logos.PlayerManagerClass import PlayerBD
from Logos.LevelManeger import LevelManeger

from PlaneOnline.PlayerManagerClass import PlayerBD as PlaneBD


BD = PlayerBD("d")

PBD = PlayerBD("p")

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
	print(Login, Password, BD.BD)
	return add_header(BD.Login(Login, Password))

@app.route("/logos/register", methods=['GET', 'POST'])
def LogosRegister():
	Login = ReGet("nick")
	Password = ReGet("pass")
	return add_header(BD.Register(Login, Password))

@app.route("/logos/sendstatus", methods=['GET', 'POST'])
def SendStatus():
	Login = ReGet("nick")
	Password = ReGet("pass")
	Screen = ReGet("screen")
	BD.SetScreen(Screen, Login, Password)
	return add_header("Success")

@app.route("/logos/savedata", methods=["GET", "POST"])
def SaveData():
	BD.SaveDataFile()
	return add_header("Success")




@app.route("/plane-online", methods=["GET", "POST"])
def PlaneOnline():
	pass





def add_header(Text):
	response = Response(Text)
	response.headers["access-control-allow-origin"] = '*'
	response.headers["Access-Control-Allow-Origin"] = '*'
	response.headers["Content-Type"] = "text/plain"
	response.headers["Access-Control-Allow-Headers"] = "*"
	return response

ServerLevels = [
	[[0,2,0],[2,1,2],[0,2,0]], [[0,1,0],[1,1,1],[0,1,0]], [[0, 0, 1, 0, 0], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0], [0, 0, 1, 0, 0]], [[3, 1, 3, 1, 3], [1, 0, 0, 0, 1], [3, 0, 1, 0, 3], [1, 0, 0, 0, 1], [3, 1, 3, 1, 3]], [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [2, 2, 2, 3, 1], [0, 0, 0, 0, 0]], [[0, 0, 0, 0, 0], [3, 1, 3, 0, 2], [1, 0, 1, 0, 1], [2, 0, 3, 1, 3], [0, 0, 0, 0, 0]], [[0, 2, 0, 0, 0], [0, 2, 2, 0, 0], [0, 1, 0, 1, 0], [2, 4, 2, 3, 1], [0, 1, 0, 0, 0]], [[3, 2, 1, 2, 3], [2, 0, 2, 0, 2], [1, 3, 4, 2, 1], [2, 0, 2, 0, 2], [3, 2, 1, 2, 3]], [[3, 1, 4, 1, 4, 1, 3], [1, 1, 1, 1, 1, 1, 1], [4, 1, 1, 1, 1, 1, 4], [1, 1, 1, 1, 1, 1, 1], [4, 1, 1, 1, 1, 1, 4], [1, 1, 1, 1, 1, 1, 1], [3, 1, 4, 1, 4, 1, 3]]]

app.run(debug=False, port=5000)
BD.SaveDataFile()