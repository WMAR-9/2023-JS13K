let audioCtx = null

let oscillators = []
let isPlaying = false
let index = 0

// 0 - 4 
const soundType = ["sine","square","sawtooth","triangle"]

/*
    type,temp,duration,freq,notes,volume,decay
    tempo = current length / main notes length
*/

const mainFreq = [0]

const startingNoteFrequency = 130.81

for (let i = 0; i < 50; i++) {
    appendItem(mainFreq,(startingNoteFrequency * math.pow(2, i / 12)))
}


const triad = [
    [0,13, 17, 20, 18, 15, 18, 20, 17],
    [0,15, 20, 22, 20, 17, 20, 22, 18],
    [0,17, 22, 25, 22, 18, 22, 24, 20]
]

const fifthChord = [
        [0,13, 15, 17, 20, 22],
        [0,17, 19, 21, 24, 26],
        [0,20, 22, 24, 27, 29],
        [0,24, 26, 28, 31, 33],
        [0,27, 29, 31, 34, 36]
]; 


let test = [
    5, 3, 0, 5, 3, 2, 1, 2, 3, 0,
    5, 0, 3, 0, 5, 3, 2, 1, 2, 3,
    5, 0, 3, 5, 3, 2, 1, 0, 2, 3,
    5, 0, 3, 5, 3, 2, 1, 0, 2, 3,
    1, 2, 3, 2, 1, 7, 0, 6, 7, 0,
    5, 0, 6, 7, 6, 5, 4, 5, 6, 0
];
// const test = [
//     1,1,5,5,6,6,5,
//     4,4,3,3,2,2,1,
//     5,5,4,4,3,3,2,
//     5,5,4,4,3,3,2,
//     1,1,5,5,6,6,5,
//     4,4,3,3,2,2,1
// ];
test =  [
    1,1,5,5,6,6,5,0,
    4,4,3,3,2,2,1,0,
    5,5,4,4,3,3,2,0,
    5,5,4,4,3,3,2,0,
    1,1,5,5,6,6,5,0,
    4,4,3,3,2,2,1,0
]
test = [
    1,2,3,1,1,2,3,1,0,
    3,4,5,0,3,4,5,0,
    5,6,5,4,3,5,6,5,4,3,
    1,6,1,0,1,6,1,0
]
// walk 
test = [
    1,2,0,2,1,0
]
const test1 = [
	1,0,5,0,4,0,5,
	2,0,5,0,1,0,4,
	0,2,0,3,0,1,1,
]

const songList = ["w","q","w","q","w","q","w","q",]
const songList1 = ["q","q"]

const song1 = {
   "w":[
        [3,.5,1,[
            [0,1, 2]
        ],test,.3,.001
        ],
        [
            0,1,1,triad,[
                1,0,0
            ],.3,.01
        ]
    ],
    "q":[
        [0,.5,.5,[
            [0,12, 14, 16, 17, 19, 21,22,25,27],
        ],[ 
            5,2,3,3,2,1,1,1,
            5,5,5,6,7,6,7,0,
            9,9,8,7,6,5,3,0,
            5,5,6,8,8,6,5,4,
            3,2,0,5,2,3,3,2,
            1,1,1,0,1,2,3,5,
            5,5,3,2,1,5,1,0,
            1,1,1,2,3,5,5,5,
            5,0,5,2,3,3,2,1,
            5,5,5,6,3,2,1,1,
            6,6,1,2,5,6,5,3,
            2,1
        ],.5,.01
        ],
        [
            3,2,2,triad,[
                1,0,1,2,0,3,
                1,4,2,3,0,2,
                2,3,0,1,0,1,
                1,0,1,2,0,3,
            ],.3,.01
        ],
        [3,.5,1,[[0,2, 0, 0, 2, 0, 0,0,0,2]],[ 
            5,2,3,3,2,1,1,1,
            5,5,5,6,7,6,7,0,
            9,9,8,7,6,5,3,0,
            5,5,6,8,8,6,5,4,
            3,2,0,5,2,3,3,2,
            1,1,1,0,1,2,3,5,
            5,5,3,2,1,5,1,0,
            1,1,1,2,3,5,5,5,
            5,0,5,2,3,3,2,1,
            5,5,5,6,3,2,1,1,
            6,6,1,2,5,6,5,3,
            2,1
        ],.2,.01
        ]
    ],
}

const soundInitial = _ => (oscillators.forEach(oscillator => oscillator.forEach(e => e.stop())), []);


const playSound = song =>{
    if(isPlaying)return
    oscillators = soundInitial()
    isPlaying=true
    if(!audioCtx){
        audioCtx=new (window.AudioContext || window.webkitAudioContext)()
    }

    console.log(`canloop: song>`,song)

    song.forEach((e,i)=>{
        
        const type = soundType[e[0]]
        const notes = e[4]
        const duration = e[2]
        const rythm = e[1]
        const volume = e[5]
        const temp = []

        let time = audioCtx.currentTime

        notes.forEach(k=>{

            e[3].forEach(l=>{
                
                const oscillator = audioCtx.createOscillator();
                
                const gainNode = audioCtx.createGain();
                
                oscillator.connect(gainNode);

                gainNode.connect(audioCtx.destination);

                oscillator.type = type;

                oscillator.frequency.value = mainFreq[l[k]];

                gainNode.gain.setValueAtTime(0, time);

                gainNode.gain.linearRampToValueAtTime(1*volume, time+e[6]*rythm);
                
                oscillator.start(time);

                gainNode.gain.exponentialRampToValueAtTime(0.01*volume, time+duration);

                oscillator.stop(time + duration);

                temp.push(oscillator);
            })
            time += rythm;
        })
        oscillators.push(temp)
    })
    const lastNotes = oscillators[oscillators.length-1]
    const endNote = lastNotes[lastNotes.length-1]
    endNote.onended =_=>{
        index++
        isPlaying=false
        playSound(song1[songList[index]])
    }
}

const playChord=_=>{
    playSound(song1[songList[index]])
}

const stopChord=_=>{
    if(isPlaying){
        audioCtx.suspend()
        isPlaying = false
    }else{
        audioCtx.resume()
        isPlaying = true
    }
}
//playSound(song1[songList1[index]],audioCtxBackgroud)

const nextChord=_=>{
    //oscillators = soundInitial()
    //isPlaying= true
    isPlaying = false;
    index++
    playSound(song1[songList[index]])
}

let audioContext = null
const sampleRate = 44600

const createPcmData=(frequencyStart, frequencyEnd, attackTime, decayTime, sustainLevel, releaseTime, duration, volume)=>{
    const numSamples = floor(sampleRate * duration);
    const pcmData = new Float32Array(numSamples);
  
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const frequency = frequencyStart +(frequencyEnd - frequencyStart) * (i / numSamples);
      let envelope
      if (t < attackTime) {
        envelope = t / attackTime
      } else if (t < attackTime + decayTime) {
        envelope = 1 - (1 - sustainLevel) * ((t - attackTime) / decayTime)
      } else if (t < attackTime + decayTime + duration - releaseTime) {
        envelope = sustainLevel
      } else {
        envelope = sustainLevel * (1 - (t - attackTime - decayTime - duration + releaseTime) / releaseTime); // 释放阶段
      }
      const sampleValue = envelope * volume * math.sin(2 * PI * frequency * t);
  
      pcmData[i] = sampleValue;
    }
  
    return pcmData;
}

// 配置參數
// const noteFrequencyStart =  mainFreq[2]   //698.46; // 起始音符的頻率（DO）
// const noteFrequencyEnd = mainFreq[3]; // 目標音符的頻率（RE）
// const attackTime = 1 // 攻擊時間（秒）
// const decayTime = 1; // 衰減時間（秒）
// const sustainLevel = 0; // 持續水平
// const releaseTime = .5; // 释放時間（秒）
// const noteDuration = .1 // 音符總持續時間（秒）
// const volume = .1; // 音量

const rightPcmData =createPcmData(mainFreq[5], mainFreq[7], .1,.1,0, .1,.3,.1)
const leftPcmData =createPcmData(mainFreq[7], mainFreq[5], .1,.1,0, .1,.3,.1)

function playPcmData(pcmData) {
  if(!audioContext){
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  let audioBuffer = audioContext.createBuffer(1, pcmData.length, sampleRate);
  audioBuffer.copyToChannel(pcmData, 0);

  let source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
  source.onended=_=>{
    source.stop()
    source.disconnect()
    source.buffer = null;
    source = null;
    audioBuffer= null
  }
}

const play=i=>{
    playPcmData(i?leftPcmData:rightPcmData);
}

/**
 * 
 1 C大三和弦
 2 F大三和弦
 3 G大三和弦
 4 E小三和弦
 5 D小三和弦
 6 E小三和弦
 7 F小三和弦
 8 A小三和弦
    
C大五和弦
D大五和弦
E大五和弦
G大五和弦
A大五和弦
 
tutorial

C3 低音
song type 0,3 像大鼓
song type 2, 彈簧 1 木川股的聲音

C4
song type 0, 像木琴, 3 木琴低音版
song type 2, 電子彈簧 1 的聲音

C5 高音 飽滿

song type 0, 像木琴, 3 木琴低音版
song type 2, 電子彈簧 1 的聲音

教學關卡 >> 
------------------------------------
little start
type 0

main = [
    1,1,5,5,6,6,5,
    4,4,3,3,2,2,1,
    5,5,4,4,3,3,2,
    5,5,4,4,3,3,2,
    1,1,5,5,6,6,5,
    4,4,3,3,2,2,1
]
ans 42 * 0.5 = 21 s

fifthChord

freq 1,2

melody =[
	1,0,6,0,5,0,4,
	2,0,3,0,1,0,5,
	0,2,0,3,0,1,0,
]

[0,25,27,29,30,32,34,36]   // C5

-------------------------------


freq = .5
two tiggers

song type 0

const main = [
 1,2,3,1,1,2,3,1,0,
 3,4,5,0,3,4,5,0,5,
 6,5,4,3,1,5,6,5,4,
 3,1,1,5,1,0,1,5,1,
 0
]

ANS 37 / 2 18

        [0,.5,.5,[
            [0,12, 14, 16, 17, 19, 21]
        ],test,1,.001
        ],
        [
            3,1,1,triad,[
                1,0,1,2,0,3,
                0,4,0,3,1,2,
                0,3,0,1,5,1
               ],.3,.01
        ]

triad

const melody =[
 1,0,1,2,0,3,
 0,4,0,3,1,2,
 0,3,0,1,5,1
]

C4 = [0,12, 14, 16, 17, 19, 21,22]

--------------------------------------



 0 1  2  3  4  5  6  7
 0 C  D  E  F  G  A  B
[0,14,16,17,19,21,22 ]  // C4
[0,1,3,4,5,7,8,10,12]   // C3 
[0,25,27,29,30,32,34,36]   // C5


1st song

const main = [
  5, 3, 0, 5, 3, 2, 1, 2, 3, 0,
  5, 0, 3, 0, 5, 3, 2, 1, 2, 3,
  5, 0, 3, 5, 3, 2, 1, 0, 2, 3,
  5, 0, 3, 5, 3, 2, 1, 0, 2, 3,
  1, 2, 3, 2, 1, 7, 0, 6, 7, 0,
  5, 0, 6, 7, 6, 5, 4, 5, 6, 0
];
ANS :: 
[
        [3,.5,1,[
            [0,12, 14, 16, 17, 19, 21,22],
        ],[ 
            5, 3, 5, 3, 2, 1, 2, 3, 0,
            5, 3, 5, 3, 2, 1, 0, 2, 3,
            5, 3, 5, 3, 2, 1, 0, 2, 3,
            1, 2, 3, 2, 1, 7, 0, 6, 7,
            0, 5, 6, 7, 6, 5, 4, 5, 6],1,.01
        ],
        [3,.5,.5,triad,[
            1,0,5,0,4,0,5,2,0,
            5,0,1,0,4,0,2,0,3,
            0,1,1,2,0,5,0,1,0,
            4,0,2,0,3,0,1,1,2,
            0,5,0,1,0,4,0,2,0,
        ],.2,.01
        ]
    ]


 0 1  2  3  4  5  6  7
 0 C  D  E  F  G  A  B
[0,13,16,17,18,21,23,24]


2 song

        [3,.5,1,[
            [0,1,3,4,5,7,8,10,12],
        ],[ 
            6,7,6,5,4,4,5,2,
            6,6,7,5,4,3,2,3,
            3,4,5,3,4,5,4,2,
            2,3,4,6,6,4,4,3,
            2,6,6,7,6,4,3,4
        ],1,.01
        ],
        [0,1,1,fifthChord,[
            3,2,1,0,2,1,3,1,
            0,3,1,0,1,3,0,1,
            2,0,2,1
        ],.2,.01
        ]

 0 1  2  3  4  5  6  7
 0 C  D  E  F  G  A  B
[0,14,16,17,19,21,22 ]  // C4
[0,1,3,4,5,7,8,10,12]   // C3 
[0,25,27,29,30,32,34,36]   // C5


3 song 

*/