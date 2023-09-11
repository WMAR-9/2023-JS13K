
InitailLoopDict=(k,initialValue)=>{
    for (const i in k)k[i]=initialValue
    return k
}

WaitClickPlayMusic=_=>{
    if(!INKEYIN){
        playChord()
        INKEYIN=1
    }
}

ClickWindowToKeyIn=x=>{
    if(movementIndex)return
    if(x>quW){
        touch(0)
        play(0)
    }else{
        play(1)
        touch(1)
    }
}

key1.r=1

onblur=e=>{
    key1.p=1
}

onfocus=e=>key1.p=0

onmousedown=e=>{

    if(!e.button){

        ClickWindowToKeyIn(e.pageX)

        let x= e.clientX - mouseCanvas.left
        let y = e.clientY - mouseCanvas.top
        let h=w=1
        checkButton.forEach((e,i)=>{
            if(collisionRect(e,{x:x/2,y:y/2,w,h})){
                key1[keyStopRestart[i]]=!key1[keyStopRestart[i]]
            }
        })
        if(!!returnButton){
            if(collisionRect(returnButton,{x:x/2,y:y/2,w,h})){
                initial()
                key1.r=1
            }
        }
    }
}

onmouseup=e=>{
    !e.button?key=InitailLoopDict(key,0):0
}

ontouchstart=e=>{

    var x = e.changedTouches[0].pageX;
    let y = e.changedTouches[0].pageY;

    let h=w=1

    ClickWindowToKeyIn(x)

    checkButton.forEach((e,i)=>{
        if(collisionRect(e,{x:x/2,y:y/2,w,h})){
            key1[keyStopRestart[i]]=!key1[keyStopRestart[i]]
        }
    })
    if(!!startButton){
        if(collisionRect(startButton,{x:x/2,y:y/2,w,h})){
            if(!INKEYIN){
                zzfxX = new(window.AudioContext||webkitAudioContext);
                Music()
                INKEYIN=1
            }
            //NewGame()
            key1.r=0
        }
    }
    if(!!returnButton){
        if(collisionRect(returnButton,{x:x/2,y:y/2,w,h})){
            //NewGame()
            key1.r=1
         }
    }
}

ontouchend=e=>{
    key=InitailLoopDict(key,0);
}

// p:pause , R:restart 
onkeydown=e=>{

    let i = e.key
    
    if(i=='a'||i=='z'){
        play(1)
        touch(1)
    }else if(i=='s'||i=='x'){
        touch(0)
        play(0)
    }
    // if(i=='r'){NewGame();}
    // if(keyStopRestart.includes(i))key1[i]=!key1[i]
    // else key[i]=1;
}
onkeyup=e=>{
    let i = e.key
    // if(i=='a'||i=="s"||i=="z"||i=='x'){
    //     if(INKEYIN&&!key1.p)PlaySound(1);
    // }
}

canvas.addEventListener('click',WaitClickPlayMusic)