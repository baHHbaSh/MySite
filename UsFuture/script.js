//Смена экранов
let D = []
Array("0","1","2","3","4","5").forEach((Did, index) => D.push(document.getElementById(Did)))

//Функции
function SaveData(nick, pass) {
    window.localStorage.setItem("UFnick", nick); window.localStorage.setItem("UFpass", pass);
}
function GetData() {
    return [window.localStorage.getItem("UFnick"), window.localStorage.getItem("UFpass")];
}
function ClearData(){
    window.localStorage.clear();
}

function ReloadByRole(){
    if (MyRole != null){
        document.getElementById("ToJob").disabled = false;
    }
    if (MyRole == "Администратор"){
        ToLogButton.disabled = false;
        AddWorkerButton.disabled = false;
        AddAccWorkerButton.disabled = false;
    }
}

function HideAllD(){
    for (let Screen of D){
        Screen.style.display = "none"
    }
}
function ScreenUpdate(NOF){
    HideAllD();
    D[+NOF].style.display = "block";
}

function SetScreen(NumOfScreen){
    ScreenUpdate(NumOfScreen);
}

function GetValueById(Id){
    return document.getElementById(Id).value;
}

//Установка начального экрана
SetScreen(0)


//Бинды по кнопки
document.getElementById("ToAuth").addEventListener("click", () => {SetScreen(1)} );
document.getElementById("ToJob").addEventListener("click", () => {SetScreen(2)} );


document.getElementById("s0").addEventListener("click", () => {SetScreen(0)} );
document.getElementById("s1").addEventListener("click", () => {SetScreen(1)} );

let MyRole = null;
let Fails = 0

let AddWorkerButton = document.getElementById("addslave")
let Er = document.getElementById("Enter");
let ToLogButton = document.getElementById("glog")
let AddAccWorkerButton = document.getElementById("AddAcc")

AddWorkerButton.addEventListener("click", () => {SetScreen(3)} );

Er.addEventListener("click", () => {
    let Login = document.getElementById("l").value;
    let Password = document.getElementById("p").value
    fetch("/UsFuture/login", {headers:{"login":Login,"pass":Password}}).then(Response => {return Response.text();}).then((data) => {
        if (data != "0"){
            SaveData(Login, Password);
            MyRole = data;
            ReloadByRole();
            SetScreen(0);
        }
        else{
            Fails++;
            if (Fails >= 3){
                Er.disabled = true;
                setTimeout(() => {Fails = 0; Er.disabled = false;}, 1000 * 60 * 5)
            }
        }
    });
})

ToLogButton.addEventListener('click', () => {window.open("/UsFuture/logs")})

AddAccWorkerButton.addEventListener('click', () => {
    fetch("/UsFuture/add_user", {headers: {"nick":GetData()[0], "pass":GetData()[1], "nnick":GetValueById("nl"), "npass":GetValueById("np"), "rid":GetValueById("roles")}});
});
/*
let table = document.querySelector('#table');

for (let i = 0; i < 3; i++) {
	let tr = document.createElement('tr');
	
	for (let i = 0; i < 3; i++) {
		let td = document.createElement('td');
		tr.appendChild(td);
	}
	
	table.appendChild(tr);
}
*/