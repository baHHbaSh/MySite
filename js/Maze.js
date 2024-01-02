function walls(self, x, y, w, h) {
	self.fillStyle = "green";
	if (First){
		if (w > h) {
			WallsLvl1Data["wallsH"].push([x+4,y,w-8,h])
			WallsLvl1Data["wallsV"].push([x,y,h,h])
			WallsLvl1Data["wallsV"].push([x+w-h,y,h,h])
		}
		else{
			WallsLvl1Data["wallsV"].push([x,y+4,w,h-8])
			WallsLvl1Data["wallsH"].push([x,y,w,w])
			WallsLvl1Data["wallsH"].push([x,y+h-w,w,w])
		}
	}
	return self.fillRect(x,y,w,h);
}

function AddImpostor(x,y,d,left,right,speed){
	Imposters.push([x,y,d,left,right,speed])
}

function IsTouching(ax,ay,aw,ah, bx,by,bw,bh){
	a_l = ax	 ;
	a_r = ax + aw;
	a_b = ay	 ;
	a_t = ay + ah;
	b_l = bx	 ;
	b_r = bx + bw;
	b_b = by	 ;
	b_t = by + bh;
	if (a_l >= b_r || a_r <= b_l || a_t <= b_b || a_b >= b_t) return false;
	return true;
}

const SPEED = 3;

var W = false;
var S = false;
var A = false;
var D = false;

var First = true;

var Imposters = [];

var WallsLvl1Data = {
	"wallsV":[],
	"wallsH":[]
};

var X;
var Y;
var Size = 30;

var BeforeX = X;
var BeforeY = Y;

var canvas;
var ctx;
var WallsLvl1;

window.onload = Draw
function Draw() {
	canvas = document.getElementById("board");
	canvas.width = 1280;
	canvas.height = 720;
	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(600, 500, 200, 200)
	ctx.fillStyle = "red";
	if (First){ X=40;Y=40; }
	ctx.fillRect(X, Y, Size, Size);
	ctx.fill();
	[
		walls(ctx,0,0,1280,10),
		walls(ctx,0,710,1280,10),
		walls(ctx,0,10,10,700),
		walls(ctx,1270,10,10,700),
		walls(ctx,80,10,10,650),
		walls(ctx,160,100,10,650),
		walls(ctx,170,100,300,10),
		walls(ctx,570,100,1000,10),
		walls(ctx,240,200,3000,10),
		walls(ctx,240,200,10,720/2),
		walls(ctx,240,200+720/2+60,10,100),
		walls(ctx,330,290,10,1000)
	];
	ctx.fillStyle = "grey";

	if (First){
		[
			AddImpostor(180, 40, 1, 190, 700, 2),
			AddImpostor(350, 290, -1, 360, 1200, 30)
		];
	}

	for (let item = 0; item < Imposters.length; item++){
		ctx.fillRect(Imposters[item][0], Imposters[item][1], 50, 50);
	}

	ctx.closePath();
	ctx.fill();
	First = false;
}

document.addEventListener("keydown", BoolActive);
document.addEventListener("keyup", BoolDeactive);

function BoolDeactive(key) {
	if (key.code == "KeyW") W = false;
	if (key.code == "KeyS") S = false;
	if (key.code == "KeyA") A = false;
	if (key.code == "KeyD") D = false;
}
function BoolActive(key){
	if (key.code == "KeyW") W = true;
	if (key.code == "KeyS") S = true;
	if (key.code == "KeyA") A = true;
	if (key.code == "KeyD") D = true;
}

function VDrop(WallX, WallY, WallW, WallH){
	if (IsTouching(X,BeforeY,Size,Size, WallX, WallY, WallW, WallH)){
		X = BeforeX;
	}
}

function HDrop(WallX, WallY, WallW, WallH){
	if (IsTouching(BeforeX,Y,Size,Size, WallX, WallY, WallW, WallH)){
		Y = BeforeY;
	}
}

function UseCollision(){
	WallsLvl1Data["wallsV"].forEach((data) => VDrop(data[0], data[1], data[2], data[3]))
	WallsLvl1Data["wallsH"].forEach((data) => HDrop(data[0], data[1], data[2], data[3]))
}

function ImposterMove(){
	for (let item = 0; item < Imposters.length; item++){
		if (Imposters[item][0] < Imposters[item][3]) Imposters[item][2] = 1;
		if (Imposters[item][0] > Imposters[item][4]) Imposters[item][2] = -1;
		Imposters[item][0] += Imposters[item][5] * Imposters[item][2]
	}
}

function ImposterCollision(){
	for (let item = 0; item < Imposters.length; item++){
		if (IsTouching(X,Y,Size,Size, Imposters[item][0],Imposters[item][1],50, 50)){
			X=20;Y=40;
		}
	}
}

function IsFinish(){
	if (IsTouching(X,Y,Size,Size, 600, 500, 200, 200)){
		let Parent = canvas.parentNode
		Parent.removeChild(canvas)
		let WinnerText = document.createElement("p");
		WinnerText.innerHTML = "Вы прошли уровень, других вводить не собираюсь."
		Parent.append(WinnerText)
		clearInterval(interval)
	}
}

function Update() {
	BeforeX = X;
	BeforeY = Y;
	if (W) Y -= SPEED;
	if (S) Y += SPEED;
	if (A) X -= SPEED;
	if (D) X += SPEED;
	ImposterMove();
	ImposterCollision();
	UseCollision();
	IsFinish();
	Draw()
}

var interval = setInterval(Update, 10);