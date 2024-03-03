from flask import Flask, url_for, render_template, request, send_from_directory, Response, send_file

from Logos.PlayerManagerClass import PlayerBD
from Logos.LevelManeger import LevelManeger

from PlaneOnline.PlayerManagerClass import PlayerBD as PlaneBD

import os
import json

BD = PlayerBD("d")

PBD = PlaneBD("p")


app = Flask(__name__, static_folder="", template_folder="")

def ReGet(key:str, default=None):
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
	return render_template(url_for("static", filename="pages/PlaneOnline.html"))

with open(os.getcwd()+"/RPG/Map.txt", encoding="utf-8") as file:
	Map = file.read()

with open(os.getcwd() + "/RPG/items.json", "r", encoding="utf-8") as file:
	RPGDataFile = json.load(file)

@app.route("/RPG", methods=["GET", "POST"])
def RPG():
	return render_template(url_for("static", filename="RPG/game.html"))

@app.route("/RPG/GetData", methods=["GET","POST"])
def GetData():
	global PlayersRPGList
	nick = ReGet("nick")
	PlayerWeapon = ReGet("weapon")
	PlayerAmmunition = ReGet("ammunition")
	PosX = ReGet("x")
	PosY = ReGet("y")
	D = ReGet("d")
	AF = ReGet("af")
	if not nick in PlayersRPGList:
		PlayersRPGList[nick] = PlayerRPG()
	PlayersRPGList[nick].x = PosX
	PlayersRPGList[nick].y = PosY
	PlayersRPGList[nick].w = PlayerWeapon
	PlayersRPGList[nick].a = PlayerAmmunition
	PlayersRPGList[nick].D = D
	PlayersRPGList[nick].AF = AF
	
	#Переделать наxyz
	return add_header(PlayersRPGList)

@app.route("/RPG/shoot", methods=["GET","POST"])
def Shoot():
	global PlayersRPGList
	PlayerNick = ReGet("nick")
	PlayersRPGList[PlayerNick].Shoot()

@app.route('/RPG/tile/<number>')
def image(number):
	if len(number) != 1 and len(number) != 2: return
	return send_file(os.getcwd()+f'/RPG/tiles/{number}.png',  mimetype='image/png')

@app.route("/RPG/items", methods=["GET","POST"])
def GetItem():
	return add_header(RPGDataFile)

@app.route("/RPG/Map", methods=["GET", "POST"])
def GetMap():
	return add_header(Map) 

PlayersRPGList = {}

class PlayerRPG:
	def __init__(self):
		self.x = 0
		self.y = 0
		self.a = "0"
		self.w = "0"
		self.HP = 100
		self.D = 0
		self.AF = 0
	def Shoot(self):
		if RPGDataFile["weapons"]["type"] == "sword":
			#Удар
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