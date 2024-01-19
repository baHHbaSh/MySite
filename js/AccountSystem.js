function SaveData(nick, pass) {
    window.localStorage.setItem("nick", nick); window.localStorage.setItem("pass", pass);
}
function GetData() {
    return [window.localStorage.getItem("nick"), window.localStorage.getItem("pass")];
}
function ClearData(){
    window.localStorage.clear();
}
function GetScreenOnAccount(Login, Password, TextNode=null){
    console.log(Login, Password);
    fetch("/logos/login",
        {
            headers:{
                "nick": Login,
                "pass": Password
            },
        }
    )
    .then(Response => {return Response.text();})
    .then(data => {
            let text = data;
            console.log(text);
            if (text.length == 1){
                Status = +text
                SaveData(Login, Password);
                IsLogin = true;
                ScreenUpdate()
            }
            else{
                if (TextNode != null){
                    TextNode.innerText = text
                    console.log("NNull")
                }
            }
        } )
}
function Registration(Login, Password, TextNode){
    fetch("/logos/register",
        {
            headers:{
                "nick": Login,
                "pass": Password
            }
        }
    )
    .then(Response => {return Response.text();})
    .then(data => {
        text = data;
        if (text == "Complite"){
            Status = StatusList.Login
            SaveData(Login, Password)
            ScreenUpdate()
        }
        Status = StatusList.Login;
    })
}
function SendScreen(Login, Password, Screen){
    fetch("/logos/sendstatus", {
        headers:{
            "nick": Login,
            "pass": Password,
            "screen": Screen
        }
    })
}