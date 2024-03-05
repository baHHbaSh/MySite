function SaveData(points, upgrade) {
	window.localStorage.setItem("points", points);
	window.localStorage.setItem("upgrade", upgrade);
}
function GetData() {
	return [window.localStorage.getItem("points"), +window.localStorage.getItem("upgrade")]
}
function ClearData(){
	window.localStorage.clear();
}

let Score = 0;

let MoneyOnClick = 1;

document.querySelector("#button").addEventListener("click", ()=>{
	Score = +Score + (+MoneyOnClick * Coef());
	SaveData(Score, MoneyOnClick)
	UpdateScore()
	console.log(Score, MoneyOnClick)
})

function UpdateScore(){
	if (MoneyOnClick == 0) MoneyOnClick = 1;
	document.querySelector("#score").innerHTML = Score;
	document.querySelector("#level").innerHTML = MoneyOnClick;
}

document.querySelector("#ButtonUpgrader").addEventListener("click",()=>{
	if (Score >= MoneyOnClick){
		Score -= MoneyOnClick;
		MoneyOnClick = +MoneyOnClick + 1;
	}
	SaveData(Score, MoneyOnClick)
	UpdateScore()
})

Score = GetData()[0]
MoneyOnClick = GetData()[1]
if (Score == null || Score == NaN || Score == undefined){
	Score = 0
}
UpdateScore()


let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 50;
document.body.appendChild(canvas)

let State = 250;

document.addEventListener("keydown", (key)=>{
	if(key.code == "Space"){
		State += 100
	}
});

function Clamp(vvalue, vmin, vmax){
	if(vvalue < vmin){
		return vmin;
	}
	else if(vvalue > vmax){
		return vmax;
	}
	return vvalue;
}

function Render(){
	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = "yellow";
	ctx.fillRect(100, 0, canvas.width-200, canvas.height);
	
	ctx.fillStyle = "green";
	ctx.fillRect(200, 0, canvas.width-400, canvas.height);

	State -=Clamp(MoneyOnClick,5, 20);

	ctx.fillStyle = "white";
	ctx.fillRect(State - 5, 20, 10, 10);

	State = Clamp(State, 0, 500)
}

function Coef(){
	if(State < 100 || State >= 400){
		return -1;
	}
	else if(State < 200 || State >= 300){
		return 0;
	}
	return 1;
}

setInterval(Render, 1000/60)