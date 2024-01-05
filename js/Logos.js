StatusList = {
    Login:0,
    Register:1,
    MainMenu:2,
    InBaseGameList:3,
    InPublicGameList:4,
    InGame:5,
    LoadScreen:6
};

let Status = StatusList.LoadScreen;

if (GetData()[0] == null || GetData()[1] == null) {
    Status = StatusList.Register;
}