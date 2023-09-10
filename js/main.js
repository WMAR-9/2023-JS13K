const canvas = getCanvas('a');
const ctx = getContext(canvas);

const l = window.localStorage;

// Initial 
const timer = performance
const initialXY = reXY(0,0)

let gameObject = mapLayer= notesObject = [],second=0,level

const speedStep = 1,speed = 50

const halfW=canvas.width = 1024
const halfH=canvas.height = 800
const quW = halfW/4
const quH = halfH/4

// PNG size
const size = 32
const upTileGap = size/2

// music play and can move
var movementIndex = 0


// tile 
const backgroundMap = tiles(backGround,3,backgroundTileColor,8)
const pathTemp = tiles(pathTile,3,backgroundTileColor,8)
const pathPng = pathTemp.concat([rotateImage(pathTemp[1],90),rotateImage(pathTemp[2],90)])

const playerPng = tiles(playDone,4,playDoneColor,16,1)


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
    showTime: clone(Timer),
    AnimationTime: clone(Timer),
    frameIndex:0,
    direct:0,
    lives: 3,
    ack:-3,
    lines:[],
    initial:function(){
        this.showTime.set(0,1,0.05)
        this.AnimationTime.set(0,1,0.05)
    },
    update:function(e){
        this.vpos = dot(this.vpos,-1)
        if(this.showTime.StartTime<this.showTime.EndTime){
            this.showTime.check()
        }
    },
    render:function(){
        canvasSave()
        
        canvasAlpha(this.showTime.StartTime)

        canvasDraw(this.mainFrame[this.frameIndex],this.pos,this.wh)
        canvasRestore()
    },
    remove:function(e){
        gameObject = removeItem(gameObject,this)
    }
}

const Placement = clone(Basic)
const Line = clone(Basic)
const Tilemap = clone(Basic)
const Camera = clone(Basic)
const Player = clone(Basic)
const Enemy = clone(Basic)
const Item = clone(Basic)

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
Line.initial()

// Player

Player.mainFrame = playerPng
Player.moveToPlacement = 0
Player.update=function(s){
    //console.log(this.vpos,this.pos)
    var moveToEnd = 0
    if(this.lines.length && movementIndex){
        
        let tempPos = reXY(this.pos.x,this.lines[this.moveToPlacement].pos.y)
        
        if(distance(this.pos,tempPos)<=2){
            // now move to endpos
            //console.log("MOVE TO END")
            tempPos = this.lines[this.moveToPlacement].pos
            moveToEnd = 1
        }
        this.frameIndex = 1
        if(distance(this.pos,tempPos)<=2&&moveToEnd){
            //console.log(" At the end")
        }
        this.vpos = set(tempPos)
        this.vpos = substract(this.vpos,this.pos)
    }

    this.vpos = dot(this.vpos,s*speed*.04)
    this.pos = add(this.pos,this.vpos)
}

// camera follow
Camera.update=function(e){
    this.vpos = substract(this.vpos,this.pos)
    this.vpos = dot(this.vpos,e*speed*.01)
    this.pos = add(this.pos,this.vpos)
}
Camera.render=_=>{}












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
    const distBetweenFirst = 32
    const countPath = distX/distBetweenFirst

    for(var i =0;i<countPath;i++){
        const cl = generatePathmap(reXY(item.pos.x-distBetweenFirst*i,item.pos.y))
        appendItem(arr,cl)
    }

    const firstPlacement = clone(Placement)
    firstPlacement.created=1
    firstPlacement.pos = item.pos
    appendItem(arr,firstPlacement)

    //const odd = count%2?0:distY/2
    const firstY = firstPlacement.pos.y-((count/2)|0)*distY

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
        for(var j=1;j<=distance/size;j++){
            const cl = generatePathmap(reXY(firstPlacement.pos.x+j*size,y))

            appendItem(arr,cl)
        }

        // Placement 
        const cn = clone(Placement)
        cn.pos = reXY(x,y)
        cn.wh = set(firstPlacement.wh)
        appendItem(firstPlacement.lines,cn)
        
        appendItem(arr,cn) 
    }
}

const findNodes = node =>{
    if(!node.lines.length&&!node.created){
        const gapSize = 160
        const startPath = generatePathmap(reXY(node.pos.x+gapSize,node.pos.y))

        startPath.created = 1
        appendItem(gameObject,startPath)

        node.lines = [startPath]
        node.create=1

        generatePath(gameObject,startPath,gapSize,64,4)

        console.log("LINES >",startPath.lines)

        return startPath
    }
}


