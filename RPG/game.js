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
function ObjTouching(obj1, obj2){
    return IsTouching(obj1.x, obj1.y, obj1.w, obj1.h, obj2.x, obj2.y, obj2.w, obj2.h);
}

const Direction = {
    w:0,
    d:1,
    s:2,
    a:3
}

TileId = [
    "Grass",
    "Road",
    "wall",
    "chest",
    "Rock",
    "torch",
    "Door",
    "Empty",
    "Construction",
]
document.addEventListener("keydown", BoolActive);
document.addEventListener("keyup", BoolDeactive);

W = false
A = false
S = false
D = false
Shift = false

let NickName = prompt("Введите ник")

let dt = 0;

let LastTime = 0;

function GetTime(){
    return Date.now() / 1000
}

function ImageLoad(path){
    let a = new Image()
    a.src = path
    return a
}

TileImages = []

Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9").forEach(
    (name)=>{
        TileImages.push(ImageLoad("/RPG/tile/"+name))
    }
)

function BoolDeactive(key) {
	if (key.code == "KeyW") W = false;
	if (key.code == "KeyS") S = false;
	if (key.code == "KeyA") A = false;
	if (key.code == "KeyD") D = false;
    if (key.code == "ShiftLeft") Shift = false
}
function BoolActive(key){
	if (key.code == "KeyW") W = true;
	if (key.code == "KeyS") S = true;
	if (key.code == "KeyA") A = true;
	if (key.code == "KeyD") D = true;
    if (key.code == "ShiftLeft") Shift = true
}

class Game{
    constructor(){
        if(window.innerWidth < window.innerHeight){
            setTimeout(StartGame, 500)
            return
        }
        document.body.removeChild(document.querySelector("#fdel"));
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ScreenObject = new Object(0, 0, window.innerWidth, window.innerHeight);
        
        this.Player = new PlayerObject();
        
        this.MapObjects = [];
        this.MapRange = [];
        this.canvas.addEventListener("click", this.Player.Shoot)
        fetch("/RPG/Map").then(Response => {return Response.text();})
        .then(data => {
            let tmp = data.split("\n");
            tmp.forEach(
                (row)=>{
                    this.MapRange.push(row.split(" "))
                }
                );
                Application.MapBuild();
            });
            
            let GameObjects = [
                this.Player
            ]
            this.GameObjects = GameObjects;
            
            LastTime = GetTime()
            setInterval(this.Update, 1000/60);
            setInterval(this.UpdateOnline, 100)
        }
        MapBuild(){
            let map = Application.MapRange;
            for(let y=0; y < map.length; y++){
                let tmp = []
                for(let x=0; x < map[y].length; x++){
                    tmp.push(new MapObject(x, y, map[y][x]));
                }
                Application.MapObjects.push(tmp);
            }
    }
    UpdateOnline(){
        fetch("/RPG/GetData", {
            headers:{"nick":NickName, "weapon":Application.Player.weapon, "ammunition":Application.Player.ammunition, "x":Application.Player.x, "y":Application.Player.y, "af":Math.round(Application.Player.AnimationFrame), "d":Application.Player.Direction}
        }).then(Response => {return Response.text();})
        .then(data => {
            //ОтриовОЧКА
        })
    }
    Update(){
        dt = GetTime() - LastTime;
        LastTime = GetTime();
        Application.Player.BPos.x = Application.Player.x;
        Application.Player.BPos.y = Application.Player.y;

        Application.Player.MoveX();
        Application.MapObjects.forEach((list)=>{list.forEach((obj)=>{
            if (!obj.GetCollsion()) return
            if (ObjTouching(Application.Player, obj)){
                Application.Player.x = Application.Player.BPos.x;
            }
        })})
        Application.Player.MoveY();
        Application.MapObjects.forEach((list)=>{list.forEach((obj)=>{
            if (!obj.GetCollsion()) return
            if (ObjTouching(Application.Player, obj)){
                Application.Player.y = Application.Player.BPos.y;
            }
        })})
        
        Application.ctx.clearRect(0, 0, Application.canvas.width, Application.canvas.height);

        Application.ctx.save();

        Application.ctx.translate(-(Application.Player.x - Application.canvas.width/2 + 25), -(Application.Player.y - Application.canvas.height/2 + 50));

        Application.ScreenObject.pos = Array((Application.Player.x - Application.canvas.width/2 + 25),(Application.Player.y - Application.canvas.height/2 + 50))

        Application.MapObjects.forEach((list)=>{list.forEach((obj)=>{
            if (ObjTouching(obj, Application.ScreenObject)){
                obj.Render(Application.ctx)
            }
        })})

        Application.GameObjects.forEach((obj)=>{obj.Render(Application.ctx)})
        Application.ctx.restore();
}
}
class Object{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get w(){
        return this.width;
    }
    set w(value){
        this.width = value;
    }
    get h(){
        return this.height;
    }
    set h(value){
        this.height = value;
    }
    get pos(){
        return Array(this.x, this.y)
    }
    set pos(value){
        this.x = value[0];
        this.y = value[1];
    }
}

class ImageObject extends Object{
    constructor(x, y, width, height, img){
        super(x, y, width, height)
        this.SetImage(img);
    }
    Render(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    SetImageByName(img){
        this.img = new Image();
        this.img.src=img
    }
    SetImageByObject(img){
        this.img = img
    }
    SetImage(img){
        if (typeof(img) == "string") return this.SetImageByName(img)
        return this.SetImageByObject(img)
    }
}

class MapObject extends ImageObject{
    constructor(CellX, CellY, id){
        let CSize = 100
        super(CellX * CSize++, CellY * CSize++, CSize, CSize, TileImages[id])
        this.id = id
    }
    SetId(NewId){
        this.id = NewId;
        this.SetImage(TileImages[NewId]);
    }
    GetCollsion(){
        if((this.id >= 2 && this.id < 5) || (this.id >= 6)){
            return true
        }
        return false
    }
}

class PlayerObject extends ImageObject{
    constructor(SpawnPoint){
        super(0, 0, 48, 64, "/RPG/tile/p");
        this.BPos = {x: 0, y: 0}
        this.Speed = 100;
        this.AnimationFrame = 0;
        this.Direction = Direction.s;
        this.weapon = "0"
        this.ammunition = "0"
    }
    Shoot(){
        fetch("/RPG/shoot", {headers:{"nick":NickName}})
    }
    MoveX(){
        if (Shift){
            if(A){this.x-=this.Speed * dt; this.Direction = Direction.a; this.AnimationFrame += dt}
            else if(D){this.x+=this.Speed * dt; this.Direction = Direction.d; this.AnimationFrame += dt}
        }
        else{
            if(A){this.x-=this.Speed * 2 * dt; this.Direction = Direction.a; this.AnimationFrame += dt * 3}
            else if(D){this.x+=this.Speed * 2 * dt; this.Direction = Direction.d; this.AnimationFrame += dt * 3}
        }
    }
    MoveY(){
        if (Shift){
            if(W){this.y-=this.Speed * dt; this.Direction = Direction.w; this.AnimationFrame += dt}
            else if(S){this.y+=this.Speed * dt; this.Direction = Direction.s; this.AnimationFrame += dt}
        }
        else{
            if(W){this.y-=this.Speed * 2 * dt; this.Direction = Direction.w; this.AnimationFrame += dt * 3}
            else if(S){this.y+=this.Speed * 2 * dt; this.Direction = Direction.s; this.AnimationFrame += dt * 3}
        }
    }
    
    Render(ctx){
        if(Math.round(this.AnimationFrame) >= 3) this.AnimationFrame -= 3
        ctx.drawImage(this.img, 48 * Math.round(this.AnimationFrame), 64 * this.Direction + 10, 48, 64, this.x, this.y, this.width, this.height)
    }
}

class NPC extends PlayerObject{
    constructor(){

    }
}

let Application;

function StartGame(){
    Application = new Game();
}
StartGame()