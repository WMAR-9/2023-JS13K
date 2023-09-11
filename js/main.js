const canvas = getCanvas('a');
const ctx = getContext(canvas);

const l = window.localStorage;

// Initial 
const timer = performance
const initialXY = reXY(0,0)


let gameObject = mapLayer= notesObject = [],second=0,level =1,score=0

// map appear rate 
let mapRate = [max(.5,.8-level*.01),.2,min(.15,.01*level),min(level*.01,.1)]

// enemy appear rate

let enemyRate = [
    max(.05,.2-level*.5),
    max(.2,.3-level*.1),
    min(.4,.1+level*.1),
    min(.3,0+level*.05),
    min(.1,0+level*.01),
]

// game speed
const speedStep = 1,speed = 50

// game window 
const halfW=canvas.width = 1024
const halfH=canvas.height = 800
const quW = halfW/4
const quH = halfH/4

// PNG size
const size = 32
const upTileGap = size/2


// music play and can move
var movementIndex = 0


// tile png
const zipSize = 16
const backgroundMap = tiles(AllTiles.ground.pattern1,3,AllTiles.ground.color,8)
const pathTemp = tiles(AllTiles.ground.pattern2,3,AllTiles.ground.color,8)
const pathPng = pathTemp.concat([rotateImage(pathTemp[1],90),rotateImage(pathTemp[2],90)])

const playStandTemp = tiles(AllTiles.playerStand.pattern1,5,AllTiles.playerStand.color,zipSize)
const playUpTemp = tiles(AllTiles.playerUp.pattern1,5,AllTiles.playerUp.color,zipSize)
const playDoneTemp = tiles(AllTiles.playerDone.pattern1,5,AllTiles.playerDone.color,zipSize,1)
const playerPng = playStandTemp.concat(playUpTemp).concat(playDoneTemp)

const SpiderPng = tiles(AllTiles.spider.pattern1,3,AllTiles.spider.color,zipSize)
const SnakePng = tiles(AllTiles.snake.pattern1,4,AllTiles.snake.color,zipSize)
const ScorpionPng = tiles(AllTiles.scorpion.pattern1,4,AllTiles.scorpion.color,zipSize,1)
const TurtlePng = tiles(AllTiles.turtle.pattern1,4,AllTiles.turtle.color,zipSize,1)

const heartsPng = tiles(AllTiles.hearts.pattern1,3,AllTiles.hearts.color,9)

const rightAndLeftPng = tiles(AllTiles.rightAndLeft.pattern1,3,AllTiles.rightAndLeft.color,zipSize)

const aimPng = tiles(AllTiles.aims.pattern1,3,AllTiles.aims.color,zipSize)

// Draw Image  ( Main ) 
const canvasDraw=(f,a,b)=>ctx.drawImage(f,a.x,a.y,b.x,b.y)
const canvasMoveTo=a=>ctx.moveTo(a.x,a.y)
const canvasLineTo=a=>ctx.lineTo(a.x,a.y)
const canvasArcTo=(a,b,r)=>ctx.arcTo(a.x,a.y,b.x,b.y,r)
const canvasAlpha=a=>ctx.globalAlpha=a
const canvasFillStyle=a=>ctx.fillStyle=a
const canvasFillRect=(a,b)=>ctx.fillRect(a.x,a.y,b.x,b.y)
const canvasFill =_=>ctx.fill()
const canvasstrokeStyle=a=>ctx.strokeStyle=a
const canvasstrokeRect=(a,b)=>ctx.strokeRect(a.x,a.y,b.x,b.y)
const canvasStroke=_=>ctx.stroke()
const canvasglobalComposite=a=>ctx.globalCompositeOperation=a
const canvasSave=_=>ctx.save()
const canvasScale=a=>ctx.scale(a,a)
const canvasRestore=_=>ctx.restore()
const canvasBegin=_=>ctx.beginPath()
const canvasClose=_=>ctx.closePath()

// Set local memory 
const localSet=(e,a)=>l.setItem(e,a)
const localGet=e=>l.getItem(e)

const Timer = {
    StartTime:1,
    EndTime:1,
    step:1,
    set:function(s,e,g){
        this.StartTime=s
        this.EndTime = e
        this.step = g
    },
    add:function(){
        this.StartTime+=this.step
    },
    reset:function(){
        this.StartTime = 0
    },
    check:function(){
        this.StartTime<this.EndTime?this.add():this.reset()
    }
}

const Basic = {
    pos:set(initialXY),
    vpos:set(initialXY),
    wh:reXY(32,32),
    mainFrame:[],
    showTime: clone(Timer),
    AnimationTime: clone(Timer),
    frameIndex:0,
    score:0,
    direct:0,
    lives: 3,
    ack:0,
    type:"Z",
    lines:[],
    initial:function(){
        this.showTime.set(0,1,0.05)
        this.AnimationTime.set(0,1,0.03)
    },
    update:function(e){
        this.vpos = dot(this.vpos,-1)
        if(this.showTime.StartTime<this.showTime.EndTime){
            this.showTime.check()
        }
        if(this.type!='Node' && this.type!='Line'){
            for(var i = 0;i<this.mainFrame.length;i++){
                if(this.AnimationTime.StartTime>1/2*i){
                    this.frameIndex = i
                }
            }
            this.AnimationTime.check()
        }
    },
    render:function(){
        canvasSave()
        canvasAlpha(this.showTime.StartTime)
        // show number score
        if(this.ack!=0 && this.mainFrame!=playerPng){

        }
        if(this.type=='Node'||this.type=='Line'){
            canvasDraw(this.mainFrame[this.frameIndex],reXY(this.pos.x-this.wh.x/32,this.pos.y+this.wh.y/2),this.wh)
        }else{
            canvasDraw(this.mainFrame[this.frameIndex],this.pos,this.wh)
        }
        canvasRestore()
    },
    remove:function(e){
        gameObject = removeItem(gameObject,this)
    }
}
//Basic.initial()

const Placement = clone(Basic)
const Line = clone(Basic)
const Tilemap = clone(Basic)
const Camera = clone(Basic)
const Player = clone(Basic)

const Spider= clone(Basic)
const Snake= clone(Basic)
const Scorpion= clone(Basic)
const Heart = clone(Basic)

const Note = clone(Basic)

// UI
const Button = clone(Basic)
const Aim = clone(Basic)
const Turtle = clone(Basic)


// Map
Tilemap.mainFrame = backgroundMap
Tilemap.update=function(e){
    this.vpos = dot(this.vpos,-e*speed)
    this.pos = add(this.vpos,this.pos)
}

// Node
Placement.mainFrame = pathPng
Placement.created= 0
Placement.type = "Node"
Placement.initial()

// Path
Line.mainFrame = pathPng
Line.type = "Line"
Line.initial()

// Player

Player.mainFrame = playerPng
Player.moveToPlacement = 0
Player.update=function(s){
    //console.log(this.vpos,this.pos)
    var moveToEnd = 0
    if(this.lines.length && movementIndex){
        

        const gap = 100/floor(this.lines.length)
        // select path 
        
        for(var i =0;i<this.lines.length;i++){
            if(score>=this.lines[i].score){
                this.moveToPlacement = i
            }
        }
        
        if(this.moveToPlacement>=this.lines.length){
            this.moveToPlacement = this.lines.length-1
        }

        let tempPos = reXY(this.pos.x,this.lines[this.moveToPlacement].pos.y)

        if(distance(this.pos,tempPos)<=1){
            
            // now move to endpos
            tempPos = this.lines[this.moveToPlacement].pos
            moveToEnd = 1

        }

        this.vpos = set(tempPos)
        this.vpos = substract(this.vpos,this.pos)
        
        if(tempPos.y>this.pos.y&&tempPos.x==this.pos.x){
            this.pos.direct = 7
        }
        if(tempPos.y<this.pos.y&&tempPos.x==this.pos.x){
            this.pos.direct = 5
        }
        if(tempPos.x>this.pos.x&&tempPos.y+1>=this.pos.y){
            this.pos.direct = 3
        }

        var i = this.pos.direct
        for(var i = this.pos.direct,j=0;i<this.pos.direct+2;i++,j++){
            if(this.AnimationTime.StartTime>1/2*j){
                this.frameIndex = i
            }
        }

    }else{

        for(var i =0;i<3;i++){
            if(this.AnimationTime.StartTime>1/3*i){
                this.frameIndex = i
            }
        }

    }
    this.AnimationTime.check()
    this.vpos = dot(this.vpos,s*speed*.03)
    this.pos = add(this.pos,this.vpos)
}
Player.AnimationTime.set(0,1,.03)

// camera follow
Camera.update=function(e){
    this.vpos = substract(this.vpos,this.pos)
    this.vpos = dot(this.vpos,e*speed*.01)
    this.pos = add(this.pos,this.vpos)
}
Camera.render=_=>{}


Scorpion.mainFrame = ScorpionPng
Scorpion.ack = -1
Scorpion.initial()

Snake.mainFrame = SnakePng
Snake.ack = -2
Snake.initial()

Spider.mainFrame = SpiderPng
Spider.ack = -3
Spider.initial()

Heart.mainFrame = heartsPng
Heart.ack = 1
Heart.initial()

Button.mainFrame = SpiderPng
Button.wh = reXY(16,16)

Turtle.mainFrame = TurtlePng
Turtle.pos = reXY(halfW/4-100/2,halfH/2-90)
Turtle.wh = reXY(100,100)
Turtle.initial()
//  random gen background
const generateTilemap = (pos,rate=[.8,.2]) =>{
    // rate [.7,.1,.1,.2]
    const tMap = clone(Tilemap)
    tMap.pos = pos
    tMap.frameIndex = randWeight(3,rate)
    return tMap
}

// generate Path
const generatePathmap = pos =>{
    const cl = clone(Line)
    cl.pos = pos
    cl.frameIndex=randIntBetween(1,2)
    return cl
}

// genreate Placement
const generatePlacement = pos =>{
    const firstPlacement = clone(Placement)
    firstPlacement.created=0
    firstPlacement.pos = pos
    return firstPlacement
}

// utils functions create path and Placement
const generatePath = (arr,item,distX,distY,count=3)=>{
    const enemy = [0,Heart,Scorpion,Snake,Spider]

    const distBetweenFirst = 32
    const countPath = floor(distX/distBetweenFirst)

    for(var i =0;i<countPath;i++){
        const cl = generatePathmap(reXY(item.pos.x-distBetweenFirst*i,item.pos.y))
        appendItem(arr,cl)
    }

    const firstPlacement = clone(Placement)
    firstPlacement.created=1
    firstPlacement.pos = item.pos
    appendItem(arr,firstPlacement)

    const odd = count%2?0:distY/2
    const firstY = firstPlacement.pos.y-(floor(count/2))*distY+odd

    // Y Path
    for(var i=0;i<count*2-1;i++){
        const cl = generatePathmap(reXY(firstPlacement.pos.x,firstY+i*distY/2))
        cl.frameIndex = i%2?randIntBetween(3,4):0
        appendItem(arr,cl)
    }

    for(var i=0;i<count;i++){
        // create end placement
        const distance = randIntBetween(3,countPath)*distBetweenFirst
        const x = firstPlacement.pos.x+distance
        const y = firstY+i*distY
        
        // X Path
        for(var j=1;j<=floor(distance/size);j++){
            const cl = generatePathmap(reXY(firstPlacement.pos.x+j*size,y))

            appendItem(arr,cl)
        }

        // Placement 
        const cn = clone(Placement)
        cn.pos = reXY(x,y)
        cn.wh = set(firstPlacement.wh)
        cn.score = 100/floor(count)*i
        appendItem(firstPlacement.lines,cn)
        
        // Enemy or item 
        const chooseIndex = randWeight(enemy.length,enemyRate)
        if(chooseIndex){
            const enemyNode = clone(enemy[max(1,chooseIndex)])
            enemyNode.pos = reXY(x,y)
            enemyNode.type = "Znemy"
            enemyNode.wh = set(firstPlacement.wh)
            enemyNode.score = 100/floor(count)*i
            appendItem(arr,enemyNode)
        }
        appendItem(arr,cn) 
    }
    firstPlacement.lines.sort((a,b)=>a.score>b.score)
}

const findNodes = node =>{
    if(!node.lines.length&&!node.created){

        const gapSize = 160
        const startPath = generatePathmap(reXY(node.pos.x+gapSize,node.pos.y))

        startPath.created = 1
        appendItem(gameObject,startPath)

        node.lines = [startPath]
        node.create=1

        generatePath(gameObject,startPath,gapSize,64,max(1,floor(level)))

        //console.log("LINES >",startPath.lines)

        return startPath
    }
}


