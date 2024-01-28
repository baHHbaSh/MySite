StatusList = {
    Login:0,
    Register:1,
    MainMenu:2,
    BaseGameList:3,
    GameEditorList:4,
    InPublicGameList:5,
    GameEditor:6,
    InGame:7
};
let IsLoginValue = false;
let Status = StatusList.Login;
let LLog;
let RLog;
let LEnter;
let REnter;
let ToReg;
let LLogin;
let LPassword;
let RLogin;
let RPassword;
let RDPassword;
let Editor;

let D = [];

if (GetData()[0] == null || GetData()[1] == null || GetData()[0] == undefined || GetData()[1] == undefined) {
    Status = StatusList.Login;
}

window.onload = ()=>{

LLog = document.querySelector("#LLoger");
RLog = document.querySelector("#RLoger");
LEnter = document.querySelector("#LEnter");
REnter = document.querySelector("#REnter");
ToReg = document.querySelector("#ToReg");
ToLog = document.querySelector("#ToLog");
ToMainMenu = document.querySelector("#ToMainMenu");
ToLogin = document.querySelector("#BTL");

BaseGame = document.querySelector("#BaseGame");
LevelEditor = document.querySelector("#LevelEditor");
OtherLevels = document.querySelector("#OtherLevels");

Square = document.querySelector("#square");

LLogin = document.querySelector("#LLogin");
LPassword = document.querySelector("#LPassword");
RLogin = document.querySelector("#RLogin");
RPassword = document.querySelector("#RPassword");
RDPassword = document.querySelector("#RDPassword");

ButtonsListEditor = [[]];
EditorValues = [[0]];

Object.defineProperty(window, 'IsLogin', {
    get: () => IsLoginValue,
    set: function(value) {
      IsLoginValue = value;
      BaseGame.disabled = false;
      LevelEditor.disabled = false;
      OtherLevels.disabled = false;
    }
});

console.log(GetData());
GetScreenOnAccount(GetData()[0], GetData()[1])

ToReg.addEventListener("click", ()=>{Status = StatusList.Register; ScreenUpdate();});
ToLog.addEventListener("click", ()=>{Status = StatusList.Login; ScreenUpdate();})
LEnter.addEventListener("click", ()=>{
    let Nick = LLogin.value;
    let Pass = LPassword.value;
    GetScreenOnAccount(Nick, Pass, LLog)
});
REnter.addEventListener("click", ()=>{
    if (RPassword.value != RPassword.value){
        RLog.innerText = "Пароли несовпадают"
        return;
    }
    Registration(RLogin.value, RDPassword.value, RLog)
});
BaseGame.addEventListener("click", ()=>{
    Status = StatusList.BaseGameList; ScreenUpdate();
});
ToLogin.addEventListener("click", ()=>{
    Status = StatusList.Login; ScreenUpdate();
});
ToMainMenu.addEventListener("click", ()=>{
    Status = StatusList.MainMenu;
    ScreenUpdate();
});
["1","2","3","4","5","6","7","8"].forEach((Did, index) => D.push(document.getElementById(Did)))
ScreenUpdate();
}
function HideAllD(){
    D.forEach((InD)=>{InD.style.display = "none";});
}
function ScreenUpdate(){
    HideAllD();
    console.log("Status - " + Status)
    D[+Status].style.display = "block"
    data = GetData();
    SendScreen(data[0], data[1], +Status);
}

function EditorClear(){
    ButtonsListEditor = [[]];
    EditorValues = [[0]];
}

function range(start, end) {
    var ans = [];
    for (let i = start; i < end; i++) {
        ans.push(i);
    }
    return ans;
}

function EditorRegenerateGrid(){
    ButtonsListEditor.forEach( (List) => {List.forEach( (Button) => {Button.remove()})})

    //Высчет увеличения длинны для бесконечной сетки
    AddUp = false;
    AddDown = false;
    AddLeft = false;
    AddRight = false;
    
    for (let y = 0; y < EditorValues.length; y++){
        for (let x = 0; x < EditorValues[y].length; x++){
            if (EditorValues[y][x] != 0){
                if (AddUp == false && y==0){
                    AddUp = true
                }
                if (AddLeft == false && x==0){
                    AddLeft = true
                }
                if (AddRight == false && x==EditorValues[y].length-1){
                    AddRight = true;
                }
                if (AddDown == false && y==EditorValues.length-1){
                    AddDown = true
                }
            }
        }
    }
    if (AddLeft){
        forEach(SList=>{SList.unshift(0)})
    }
    if (AddRight){
        forEach(SList=>{SList.push(0)})
    }
    MyList = []
    for (;MyList.length!=EditorValues[0].length; MyList.push(0)){}

    if (AddDown){
        EditorValues.push(MyList)
    }
    if (AddUp){
        EditorValues.unshift(MyList)
    }
    //Тебе осталось доделать генерацию по спискам цифер
    
}

function EditorButtonLogic(){

}