const canvas = getCanvas('a');
const ctx = getContext(canvas);

const l = window.localStorage;

// Initial 
const timer = performance
const initialXY = reXY(0,0)
let gameObject = []

let KeyIn = [],KeyEvent=0,second=0

const speedStep = 1,speed = 45

const halfW=canvas.width = 1024
const halfH=canvas.height = 1024

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

const Basic = {
    pos:set(initialXY),
    vpos:set(initialXY),
    wh:set(initialXY),
    main:0,
    lines:[],
    frame:[],
    angle:30,
    update:function(e){
        this.vpos = dot(this.vpos,-1)
    },
    draw:e=>{}
}

const Node = clone(Basic)
const Line = clone(Basic)
const Tilemap = clone(Basic)
const Camera = clone(Basic)
const Player = clone(Basic)

Node.main = "node"
Node.lines = []
Node.create= 0
Node.draw = function(e){
    canvasSave()
    canvasFillStyle("#3a3")
    canvasFillRect(this.pos,this.wh)
    canvasstrokeStyle("#333")
    canvasstrokeRect(this.pos,this.wh)
    canvasRestore()
}

Tilemap.frameIndex = 0
Tilemap.mainFrame = tiles(backGround,3,backgroundTileColor,8)

Tilemap.draw=function(e){
    canvasSave()
    canvasDraw(this.mainFrame[this.frameIndex],this.pos,this.wh)
    canvasRestore()
}
Tilemap.update=function(e){
    this.vpos = dot(this.vpos,-e*speed)
    this.pos = add(this.vpos,this.pos)
}


// Line.epos = set(initialXY)
// Line.frame = randInt(3)
// Line.update=function(s){
//     this.vpos = dot(this.vpos,-1)
// }
//console.log(backGround[4])
//let pathImage =[rotateImage(createPath(backGround[2],3,backgroundTileColor,8),90),createPath(backGround[2],3,backgroundTileColor,8),createPath(backGround[3],3,backgroundTileColor,8)]// [createPath(backGround[4],3,backgroundTileColor,8),createPath(backGround[3],3,backgroundTileColor,8),createPath(backGround[5],3,backgroundTileColor,8)]

// Line.draw = function(e){
//     const pxy = this.pos
//     const vxy = this.epos
//     const halfH = this.wh.y/2
//     const halfW = this.wh.x/2
//     const temp = reXY(pxy.x+halfW,pxy.y+halfH)
//     const arcTo = reXY(pxy.x,vxy.y+halfH)
//     const dest = reXY(vxy.x+halfW,vxy.y+halfH)
//     //console.log(temp,arcTo,dest)
//     canvasSave()
//     const pattern = ctx.createPattern(pathImage[this.frame],'repeat');
//     ctx.lineWidth=16
//     canvasstrokeStyle(pattern)
//     canvasBegin()
//     canvasMoveTo(temp)
//     canvasArcTo(arcTo,dest,this.angle)
//     canvasLineTo(dest)
//     canvasStroke()
//     canvasClose()
//     canvasRestore()

// }

Player.update=function(s){
    KeyIn.forEach(e=>{
        if(e==37){
            // const cn = this.lines[0]
            // const x = this.pos.x * Math.pow(1 - s, 2) + cn.pos.x * 2 * s * (1 - s) + cn.pos.x * Math.pow(s, 2);
            // const y = this.pos.y * Math.pow(1 - s, 2) + cn.pos.y * 2 * s * (1 - s) + cn.pos.y * Math.pow(s, 2);
            
            // this.vpos = substract(reXY(x,y),this.pos)
            
            this.vpos = add(reXY(-speedStep,0),this.vpos)
        }
        if(e==38){
            // const cn = this.lines[0]
            // const x = this.pos.x * Math.pow(1 - s, 2) + (cn.pos.x-50) * 2 * s * (1 - s) + cn.pos.x * Math.pow(s, 2);
            // const y = this.pos.y * Math.pow(1 - s, 2) + cn.pos.y * 2 * s * (1 - s) + cn.pos.y * Math.pow(s, 2);
            
            //this.vpos = substract(reXY(x,y),this.pos)
            this.vpos = add(reXY(0,-speedStep),this.vpos)
            //this.vpos.add({x:0,y:-speedStep})
        }
        if(e==39){
            // const cn = this.lines[0]
            // const x = this.pos.x * Math.pow(1 - s, 2) + cn.pos.x * 2 * s * (1 - s) + cn.pos.x * Math.pow(s, 2);
            // const y = this.pos.y * Math.pow(1 - s, 2) + cn.pos.y * 2 * s * (1 - s) + cn.pos.y * Math.pow(s, 2);
            
            //this.vpos = substract(reXY(x,y),this.pos)
            this.vpos = add(reXY(speedStep,0),this.vpos)
            //this.vpos.add({x:speedStep,y:0})
        }
        if(e==40){
            // const cn = this.lines[0]
            // const x = this.pos.x * Math.pow(1 - s, 2) + cn.pos.x * 2 * s * (1 - s) + cn.pos.x * Math.pow(s, 2);
            // const y = this.pos.y * Math.pow(1 - s, 2) + cn.pos.y * 2 * s * (1 - s) + cn.pos.y * Math.pow(s, 2);
            
            // this.vpos = substract(reXY(x,y),this.pos)
            this.vpos = add(reXY(0,speedStep),this.vpos)
            //this.vpos.add({x:0,y:speedStep})
        }
    }) 
    //console.log(second)
    this.vpos = dot(this.vpos,s*speed*1)
    //this.vpos.dot(s*20)
    //console.log(this.vpos,second)
    
    this.pos = add(this.pos,this.vpos)
}
Player.draw=function(e){
    canvasSave()
    canvasFillStyle("#333")
    canvasFillRect(this.pos,this.wh)
    canvasstrokeStyle("#fff")
    canvasstrokeRect(this.pos,this.wh)
    canvasRestore()
}

Camera.draw=function(){
    ctx.save()
    ctx.lineWidth = 10
    ctx.strokeStyle = "#F00"
    ctx.strokeRect(this.pos.x,this.pos.y,40,40)
    ctx.restore()
}
Camera.update=function(s){
    this.vpos = substract(this.vpos,this.pos)
    this.vpos = dot(this.vpos,s*5)
    this.pos = add(this.pos,this.vpos)
}

const createNode=(arr,item,distX,distY,count=3)=>{
    const firstLine = clone(Node)
    firstLine.lines = []
    firstLine.create=1
    firstLine.pos = set(item.epos)
    firstLine.wh = set(item.wh)
    appendItem(arr,firstLine)
    distY = distY/2-2*count
    const odd = count%2?0:distY/2
    const firstY = firstLine.pos.y-((count/2)|0)*distY+odd
    for(var i=0;i<count;i++){
        const x = firstLine.pos.x+distX+rand(distX)
        const y = firstY+i*distY
        const cl = clone(Line)
        //console.log("LINE : ",cl)
        cl.epos = reXY(x,y)
        cl.pos = set(firstLine.pos)
        cl.wh = set(firstLine.wh)
        cl.frame = randInt(3)
        const cn = clone(Node)
        cn.lines = []
        //console.log("Node : ",cn)
        cn.pos = reXY(x,y)
        cn.wh = set(firstLine.wh)
        // createNode(arr,cn,distX,distY,0)
        //appendItem(.lines,cn)
        appendItem(firstLine.lines,cn)
        appendItem(arr,cl)
        appendItem(arr,cn) 
        //ctx.arcTo(x,tempH,x,y,10+(tempH-y)/7)
    }
}

const findNodes = node =>{
    if(!node.lines.length&&!node.create){
        const cl = clone(Line)
        cl.wh = set(node.wh)
        cl.pos =  set(node.pos)
        cl.epos = reXY(node.pos.x+50,node.pos.y)
        appendItem(gameObject,cl)
        node.lines = [cl]
        node.create=1
        createNode(gameObject,cl,150,150,3)
        return cl
    }
}
testa = tiles(pathTile,3,backgroundTileColor,8)[0]//rotateImage(createPath(backGround[0],3,backgroundTileColor,8),0)
let destinationValue = null
// let drawPos = clone(Basic);
const render = s =>{
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    if(destinationValue&&Camera){
        drawPos.pos = reXY(canvasWidth/8,canvasHeight/8)
        drawPos.pos = substract(drawPos.pos,Camera.pos)
        //console.log(Camera.pos,destinationValue)
        Camera.vpos = set(destinationValue.pos)
        ctx.translate(drawPos.pos.x|0, drawPos.pos.y|0);
    }
    mapLayer.forEach((e,i)=>{
        //console.log(e)

        // check Y ++
        if(Camera.pos.y-e[0].pos.y>halfH/8){
            const temp = []
            e.forEach(k=>{
                const tMap = clone(Tilemap)
                const lastX = mapLayer.length-1
                tMap.pos = reXY(k.pos.x,mapLayer[lastX][0].pos.y+32)
                tMap.wh = reXY(size,size)
                tMap.main= "Map"
                tMap.frame = testax
                //console.log(mapLayer[lastX][0].pos.y)
                temp.push(tMap)
            })
            mapLayer.shift()
            mapLayer.push(temp)
        }
        // check Y --
        if(e[mapLayer.length-1].pos.y-Camera.pos.y>halfH/3){
            const temp = []
            e.forEach(k=>{
                const tMap = clone(Tilemap)
                tMap.pos = reXY(k.pos.x,mapLayer[0][0].pos.y-32)
                tMap.wh = reXY(size,size)
                tMap.main= "Map"
                tMap.frame = testa
                temp.push(tMap)
            })
            mapLayer.splice(-1)
            mapLayer.unshift(temp)
        }

        e.forEach((k,j)=>{
            k.draw(s)
            // check X
            if(Camera.pos.x-k.pos.x>halfW/4){
                const tMap = clone(Tilemap)
                const lastX = e.length-1
                tMap.pos = reXY(e[lastX].pos.x+32,k.pos.y)
                //tMap.vpos = Camera.vpos
                tMap.wh = reXY(size,size)
                tMap.main= "Map"
                tMap.frame = testa
                e.push(tMap)
                e.splice(j,1)
            }
        })
    })
    gameObject.forEach(e=>{
        if(e.main=="Player"){
            destinationValue = e
            gameObject.forEach(j=>{
                if(j.pos.x<=e.pos.x+20&&j.pos.x>=e.pos.x-20 
                    &&j.pos.y<=e.pos.y+20&&j.pos.y>=e.pos.y-20 
                    &&j.main=='node'){
                    
                    //console.logf(j.lines)
                    const checkOnePoint = findNodes(j)
                    if(checkOnePoint){
                        
                        e.lines=[checkOnePoint]
                    }else{
                        e.lines= j.lines
                    }
                    //j.lines= []
                }
            })
        }
        
        e.update(s)
        e.draw(screenX)
    })
    canvasRestore()

}
let mapLayer = []
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


// --------- Test

// Line.wh = reXY(20,20)
// Line.pos =  reXY(halfW/8,halfH/8)
// Line.epos = reXY(halfW/8+50,halfH/8)
Player.pos = reXY(halfW/8,halfH/8)
Player.wh = reXY(30,30)
Player.main = "Player"
Camera.pos = set(Player.pos)
Camera.main = "camera"
//console.log(Camera)
gameObject.push(Camera)
gameObject.push(Player)
//gameObject.push(Line)
const size = 32
const testW = halfW/size/2,testH = halfH/size/2
var X = 0,Y=0
for(var j =0;j<=testH+2;j++){
    const temp = []
    for(var i =0;i<=testW+2;i++){
        const tMap = clone(Tilemap)
        tMap.pos = reXY(i*size,j*size)
        tMap.vpos = reXY(0,0)
        tMap.wh = reXY(size,size)
        tMap.main= "Map"
        tMap.frame = ///createPath(backGround[3],3,backgroundTileColor,8)
        temp.push(tMap)
    }
    mapLayer.push(temp)
}
createNode(gameObject,Line,50,100,5)

loop()