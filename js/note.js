
// UI view
Aim.mainFrame = aimPng
Aim.frameIndex = 0
Aim.vpos = reXY(quW-size,quH+quH/3)
Aim.pos = reXY(quW,quH+quH/2)
Aim.wh = reXY(64,64)
Aim.render=function(){
    canvasSave()
    canvasDraw(this.mainFrame[this.frameIndex],this.vpos,this.wh)
    canvasRestore()
}

Note.disable = 0
Note.mainFrame = rightAndLeftPng
Note.level = 1
Note.update = function(e){
    if(this.AnimationTime.StartTime<this.AnimationTime.EndTime){
        this.AnimationTime.check()
    }else{
        this.vpos = add(this.vpos,reXY(e*0.5*this.level,0))
    }
    this.pos.x = quW + (quW-20) * math.cos(this.vpos.x)-10;
    this.pos.y = halfH/2 - 120 * math.sin(this.vpos.x);
}
Note.render = function(e){
    canvasSave()
    if(this.disable){
        canvasAlpha(.2)
    }
    canvasDraw(this.mainFrame[this.frameIndex],this.pos,this.wh)
    this.pos.x += this.wh.x/2
    this.pos.y += this.wh.y/2
    canvasRestore()
}
Note.remove = function(){
    notesObject = removeItem(notesObject,this)
}

Button.wh =  reXY(20,20)
Button.mainFrame = pathPng