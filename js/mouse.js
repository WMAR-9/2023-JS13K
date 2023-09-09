
// key initial 
let key= {},key1={},checkButton=[],startButton,returnButton,INKEYIN=0
let keyStopRestart=['r','p']


// initial key dict
keyStopRestart.forEach(e=>key1[e]=0)

InitailLoopDict=(k,initialValue)=>{
    for (const i in k)k[i]=initialValue
    return k
}

key1.r=1

onblur=e=>{
    key1.p=1
}

onfocus=e=>key1.p=0

onmousedown=e=>{
    // let as = e.button==0?e.type=="mouseup"?"b":"a":"c"
    if(!INKEYIN){
        INKEYIN=1
    }
    if(!e.button){
        e.pageX>innerWidth/2?key.s=1:key.a=1
        let x= e.clientX - mouseCanvas.left
        let y = e.clientY - mouseCanvas.top
        let h=w=1
        checkButton.forEach((e,i)=>{
            if(CollisionRect(e,{x:x/2,y:y/2,w,h})){
                key1[keyStopRestart[i]]=!key1[keyStopRestart[i]]
            }
        })
        if(!!startButton){
            if(CollisionRect(startButton,{x:x/2,y:y/2,w,h})){
                //console.log(startButton)
                initial()
                key1.r=0
            }
        }
        if(!!returnButton){
            if(CollisionRect(returnButton,{x:x/2,y:y/2,w,h})){
                initial()
                key1.r=1
            }
        }
    }
}
onmouseup=e=>{
    !e.button?key=InitailLoopDict(key,0):0
    if(INKEYIN&&!key1.p)PlaySound(1);
}
ontouchstart=e=>{
    
    var x = e.changedTouches[0].pageX;
    let y = e.changedTouches[0].pageY;
    let h=w=1
    if(x>innerWidth/2){
        key.s=1
    }else{
        key.a=1
    }
    checkButton.forEach((e,i)=>{
        if(CollisionRect(e,{x:x/2,y:y/2,w,h})){
            key1[keyStopRestart[i]]=!key1[keyStopRestart[i]]
        }
    })
    if(!!startButton){
        if(CollisionRect(startButton,{x:x/2,y:y/2,w,h})){
            if(!INKEYIN){
                zzfxX = new(window.AudioContext||webkitAudioContext);
                Music()
                INKEYIN=1
            }
            NewGame()
            key1.r=0
        }
    }
    if(!!returnButton){
        if(CollisionRect(returnButton,{x:x/2,y:y/2,w,h})){
            NewGame()
            key1.r=1
         }
    }
}

ontouchend=e=>{
    if(INKEYIN&&!key1.p)PlaySound(1);
    key=InitailLoopDict(key,0);
}

// p:pause , R:restart 
onkeydown=e=>{
    if(!INKEYIN){
        Music()
        INKEYIN=1
    }
    let i = e.key
    if(i=='r'){NewGame();}
    if(keyStopRestart.includes(i))key1[i]=!key1[i]
    else key[i]=1;
}
onkeyup=e=>{
    let i = e.key
    if(i=='a'||i=="s"||i=="z"||i=='x'){
        if(INKEYIN&&!key1.p)PlaySound(1);
    }
    key[e.key]=0
}
