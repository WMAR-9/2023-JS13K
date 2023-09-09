
// Game initial 
const initial = _ =>{
    const curH = halfH/size/2
    const curW = halfW/size/2
    gameObject = [Camera]
    mapLayer = []
    notesObject = []

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
    notesObject.push(Note)
    appendItem(gameObject,StartPlacement)
    appendItem(gameObject,Player)
}

// next level create notes 
const nextLevel = _ =>{
    if(KeyEvent){
        playChord()
    }
}

const NewGame=_=>{
    GamePlayObject = []
    CloudCreate(RandInt(3))
    player = new Faller(tw/2,th/8,tw/16,th/16,10)
    returnButton=null
    startButton=null
    level = 1
    key1.p=0
    key1.m=1
    removetutorialTimes=0
    CanPlaysong("song1")
}

// camera position and player 
let centerPos = clone(Basic)
let previousPlayerPos

const render = s =>{
    
    // set camera move
    if(previousPlayerPos&&Camera){
        
        centerPos.pos = reXY(halfW/8,halfH/8)
        centerPos.pos = substract(centerPos.pos,Camera.pos)

        Camera.vpos = set(previousPlayerPos.pos)
        ctx.translate(centerPos.pos.x|0, centerPos.pos.y|0);
    }

    // map genrate
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

            if(movementIndex){
                gameObject.forEach(j=>{
                    if(j.pos.x<=e.pos.x+5&&j.pos.x>=e.pos.x-5
                        &&j.pos.y<=e.pos.y+5&&j.pos.y>=e.pos.y-5
                        &&j.type=='Node'){
                        
                        const checkOnePoint = findNodes(j)
                        
                        if(checkOnePoint){
                            j.remove()
                            e.lines=[checkOnePoint]
                            movementIndex = 0
                        }else{
                            e.lines= j.lines
                        }
                    }
                })
            }
        }
        if(substract(Camera.pos,e.pos).x > quW){
            e.remove()
        }
        e.update(s)
        e.render()
    })
    
}

const notesrender = s => {
    //console.log("note move",notesObject)
    notesObject.forEach(e=>{
        e.update(s)
        if(e.pos.y>halfH/2&&e.pos.x<=15){
            e.remove()
        }
        e.render()
    })
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
    
    // if(KeyEvent){
    //     playChord()
    // }
    
    // game start view
    // start View index = 1  > start


    // main game loop
    canvasSave()
    canvasScale(2)
    render(delta)
    canvasRestore()

    if(!movementIndex){
        // UI and Note View 
        //stopChord()
        canvasSave()
        canvasScale(2)
        canvasFillStyle("#d2335e")
        ctx.fillRect(0,0,halfW/2,10)
        
        const centerW = w/4
        const centerH = h/2
        const radiusY = 120
        
        canvasAlpha(.25)
        
        ctx.fillRect(0,centerH-radiusY-20,halfW,radiusY+20)
        
        canvasAlpha(1)

        ctx.setLineDash([8])
        ctx.beginPath()
        ctx.ellipse(centerW, centerH, centerW, radiusY, 0, PI, 2 * PI);
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.ellipse(centerW, centerH, centerW-55, radiusY-40, 0,PI, 2 * PI);
        ctx.stroke()
        ctx.closePath()

        notesrender(delta)

        Aim.render()
        ctx.beginPath()
        canvasstrokeStyle("#FFF")
        ctx.strokeRect(centerW-25,centerH-radiusY-5,50,50)
        canvasStroke()
        ctx.closePath()

        canvasRestore()
    }
    if(!notesObject.length){
        movementIndex=1
    }
    // --------

    requestAnimationFrame(loop)
}


initial()

loop()