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
    IsTouching(obj1.x, obj1.y, obj1.w)
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

function ImageLoad(path){
    let a = new Image()
    a.src = path
    return a
}

TileImages = []

Array("0", "1", "2", "3", "4", "5", "6", "7", "8").forEach(
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
        document.body.removeChild(document.querySelector("#fdel"))
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.Player = new PlayerObject();
        
        this.MapObjects = [];
        this.MapRange = [];
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

        setInterval(this.Update, 1000/60);
    }
    MapBuild(){
        let map = Application.MapRange;
        console.log(map)
        for(let y=0; y < map.length; y++){
            let tmp = []
            for(let x=0; x < map[y].length; x++){
                tmp.push(new MapObject(x, y, map[y][x]));
            }
            Application.MapObjects.push(tmp);
        }
    }
    Update(){
        Application.Player.Move()
        Application.ctx.clearRect(0, 0, Application.canvas.width, Application.canvas.height);

        Application.ctx.save();

        Application.ctx.translate(-(Application.Player.x - Application.canvas.width/2 + 25), -(Application.Player.y - Application.canvas.height/2 + 50));
        Application.MapObjects.forEach((list)=>{list.forEach((obj)=>{obj.Render(Application.ctx)})})

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
    }
    SetId(NewId){
        this.SetImage(TileImages[NewId]);
    }
}

class PlayerObject extends ImageObject{
    constructor(SpawnPoint){
        super(0, 0, 50, 100, "https://encycolorpedia.ru/00008b.png");
        this.Speed = 3
    }
    Move(){
        if (Shift){
            if(W){this.y-=this.Speed}
            if(A){this.x-=this.Speed}
            if(S){this.y+=this.Speed}
            if(D){this.x+=this.Speed}
        }
        else{
            if(W){this.y-=this.Speed * 2}
            if(A){this.x-=this.Speed * 2}
            if(S){this.y+=this.Speed * 2}
            if(D){this.x+=this.Speed * 2}
        }
    }
}

let Application;

function StartGame(){
    Application = new Game();
}

StartGame()