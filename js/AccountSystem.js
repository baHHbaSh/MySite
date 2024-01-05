function SaveData(nick, pass) {
    window.localStorage.setItem("nick", nick); window.localStorage.setItem("pass", pass);
}
function GetData() {
    return [window.localStorage.getItem("nick"), window.localStorage.getItem("pass")];
}
function ClearData(){
    window.localStorage.clear();
}
