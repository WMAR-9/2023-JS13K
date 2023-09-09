const canvas = getCanvas('a');
const ctx = getContext(canvas);

const l = window.localStorage;

// Initial 
const timer = performance
const initialXY = reXY(0,0)

let gameObject = mapLayer = []

let KeyIn = [],KeyEvent=0,second=0

const speedStep = 1,speed = 50

const halfW=canvas.width = 1024
const halfH=canvas.height = 800

const size = 32 //png size

const upTileGap = size/2

// music play and can move
var movementIndex = 0

// tile 
const backgroundMap = tiles(backGround,3,backgroundTileColor,8)
const pathTemp = tiles(pathTile,3,backgroundTileColor,8)
const pathPng = pathTemp.concat([rotateImage(pathTemp[1],90),rotateImage(pathTemp[2],90)])

const playerPng = tiles(palyerTile,5,playerColor,16)


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
const canvasRestore=_=>ctx.restore()
const canvasBegin=_=>ctx.beginPath()
const canvasClose=_=>ctx.closePath()

// Set local memory 
const localSet=(e,a)=>l.setItem(e,a)
const localGet=e=>l.getItem(e)

const Timer = {
    StartTime:0,
    EndTime:0,
    step:0,
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
    time: clone(Timer),
    frameIndex:0,
    direct:0,
    lines:[],
    angle:30,
    update:function(e){
        this.vpos = dot(this.vpos,-1)
    },
    render:function(e){
        canvasSave()
        canvasDraw(this.mainFrame[this.frameIndex],this.pos,this.wh)
        canvasRestore()
    }
}

const Placement = clone(Basic)
const Line = clone(Basic)
const Tilemap = clone(Basic)
const Camera = clone(Basic)
const Player = clone(Basic)

Tilemap.mainFrame = backgroundMap
Tilemap.update=function(e){
    this.vpos = dot(this.vpos,-e*speed)
    this.pos = add(this.vpos,this.pos)
}

Placement.mainFrame = pathPng
Placement.created= 0
Placement.type = "Node"
// Placement.render = function(e){
//     canvasSave()
//     canvasDraw(this.mainFrame[0],this.pos,this.wh)
//     canvasstrokeStyle("#333")
//     canvasstrokeRect(this.pos,this.wh)
//     canvasRestore()
// }

Line.mainFrame = pathPng
// Line.render = function(e){
// }

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

        if(distance(this.pos,tempPos)<=2&&moveToEnd){
            //console.log(" At the end")
        }
        this.vpos = set(tempPos)
        this.vpos = substract(this.vpos,this.pos)
    }

    this.vpos = dot(this.vpos,s*speed*.04)
    this.pos = add(this.pos,this.vpos)
    KeyIn.forEach(e=>{
        if(e==37){
            movementIndex = 1
            //console.log(movementIndex)
            // this.vpos = add(reXY(-speedStep,0),this.vpos)
        }
        if(e==38){
            movementIndex = 0
            // this.vpos = add(reXY(0,-speedStep),this.vpos)
        }
        if(e==39){
           // this.vpos = add(reXY(speedStep,0),this.vpos)
        }
        if(e==40){
            // this.vpos = add(reXY(0,speedStep),this.vpos)
        }
    }) 

}

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

// Game initial 
const initial = _ =>{
    const curH = halfH/size/2
    const curW = halfW/size/2
    gameObject = [Camera]
    mapLayer = []

    // map layer
    for(var j =0;j<=curH+2;j++){
        const temp = []
        for(var i =0;i<=curW+2;i++){

            const pos = reXY(i*size,j*size)

            const tMap = generateTilemap(pos)

            temp.push(tMap)
        }
        mapLayer.push(temp) 
    }
    // const temp = clone(Line)
    // temp.pos = set({x:128,y:128})
    //generatePath(gameObject,temp,128,64,2)
    const StartPlacement = generatePlacement(reXY(128,128))
    
    Player.pos = reXY(128+upTileGap/10,128-upTileGap)

    Player.lines = [findNodes(StartPlacement)]

    appendItem(gameObject,StartPlacement)
    appendItem(gameObject,Player)
}
initial()

let centerPos = clone(Basic)

let previousPlayerPos

const render = s =>{

    if(previousPlayerPos&&Camera){
        
        centerPos.pos = reXY(halfW/8,halfH/8)
        centerPos.pos = substract(centerPos.pos,Camera.pos)

        Camera.vpos = set(previousPlayerPos.pos)
        ctx.translate(centerPos.pos.x|0, centerPos.pos.y|0);
    }
    
    mapLayer.forEach(e=>{
        
        // Y++
        if(substract(Camera.pos,e[0].pos).y>halfH/4.4 && movementIndex){
            const temp =[]

            e.forEach(k=>{
                const lastX = mapLayer.length-1

                const tMap = generateTilemap(reXY(k.pos.x,mapLayer[lastX][0].pos.y+32))

                temp.push(tMap)
            })
            mapLayer.shift()
            mapLayer.push(temp)
        }
        // Y--
        if(substract(e[mapLayer.length-1].pos,Camera.pos).y>halfH/2.5 && movementIndex){
            const temp =[]

            e.forEach(k=>{
                
                const tMap = generateTilemap(reXY(k.pos.x,mapLayer[0][0].pos.y-32))

                temp.push(tMap)
            })
            mapLayer.splice(-1)
            mapLayer.unshift(temp)
        }
        // draw 
        e.forEach((k,j)=>{

            k.render()

            if(substract(Camera.pos,k.pos).x > halfW/5){
                
                const lastX = e.length-1
                const tMap = generateTilemap(reXY(e[lastX].pos.x+32,k.pos.y))

                e.push(tMap)
                e.splice(j,1)
            }
        })
    })

    gameObject.forEach(e=>{
        if(e.mainFrame==playerPng){

            previousPlayerPos = clone(e)    
            //console.log(e.lines[e.moveToPlacement])
            // if(movementIndex&&!e.lines[e.moveToPlacement].type=='Node'){
            //     console.log("Create > ",e.lines[e.moveToPlacement])
            //     e.lines[e.moveToPlacement].created = 1
            //     console.log("SET > ",e.lines[e.moveToPlacement].created)
            //     //e.lines = e.lines[e.moveToPlacement].lines
            //     console.log("Reset line > ",e.lines)
            // }

            gameObject.forEach(j=>{
                if(j.pos.x<=e.pos.x+5&&j.pos.x>=e.pos.x-5
                    &&j.pos.y<=e.pos.y+5&&j.pos.y>=e.pos.y-5
                    &&j.type=='Node' ){
                    
                    //console.logf(j.lines)
                    const checkOnePoint = findNodes(j)
                    
                    if(checkOnePoint && movementIndex){

                        e.lines=[checkOnePoint]

                    }else{

                        e.lines= j.lines

                    }
                    //j.lines= []
                }
            })
        }
        e.update(s)
        e.render()
    })
    Player.render()
}

// start game
const loop = _ =>{
    const now = timer.now();
    const deltaMs = now - second;
    const delta = deltaMs / 1000;
    second = now;
    
    const w = canvas.width = 1024
    const h = canvas.height = 800
    ctx.clearRect(0,0,w,h)
    canvasSave()
    ctx.scale(2,2)
    render(delta)

    ctx.restore()
    requestAnimationFrame(loop)
}

loop()