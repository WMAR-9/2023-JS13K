
let audioCtx = null;

const initAudioContext=_=>{
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}


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

/*
12: C4
13: C#4 / Db4
14: D4
15: D#4 / Eb4
16: E4
17: F4
18: F#4 / Gb4
19: G4
20: G#4 / Ab4
21: A4
22: A#4 / Bb4
23: B4
24: C5
25: C#5 / Db5
26: D5
27: D#5 / Eb5
28: E5
29: F5
30: F#5 / Gb5
31: G5
32: G#5 / Ab5
33: A5
34: A#5 / Bb5
35: B5
36: C6
*/

/*
  C大三和弦
  F大三和弦
  G大三和弦
  E小三和弦
  D小三和弦
  E小三和弦
  F小三和弦
  A小三和弦
*/
/**
 * 
    // C大五和弦
    // D大五和弦
    // E大五和弦
    // G大五和弦
    // A大五和弦

 */
const fifthChord = [
        [0,13, 15, 17, 20, 22],
        [0,17, 19, 21, 24, 26],
        [0,20, 22, 24, 27, 29],
        [0,24, 26, 28, 31, 33],
        [0,27, 29, 31, 34, 36]
]; 
const triad = [
    [0,13, 17, 20, 18, 15, 18, 20, 17],
    [0,15, 20, 22, 20, 17, 20, 22, 18],
    [0,17, 22, 25, 22, 18, 22, 24, 20]
]

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
const test1 = [
	1,0,5,0,4,0,5,
	2,0,5,0,1,0,4,
	0,2,0,3,0,1,1,
]

/**
 * 1
 *  G,E,0,G,E,D,C,D,E,0
    G,0,E,0,G,E,D,C,D,E
    G,0,E,G,E,D,C,0,D,E
    G,0,E,G,E,D,C,0,D,E
    C,D,E,D,C,B,0,A,B,0
    G,0,A,B,A,G,F,G,A,0

 * 3
  "Am" A2 A B2 A G2 | "E7" F2 F E2 D E2 | "Am" A2 A B2 A G2 | "E7" F2 E D3 E F |
  "Am" E2 F G2 E F2 | "Dm" G2 F E3 D F | "E7" E3 D E2 F G2 | "Am" A3 -A3 |
  "Am" A2 A B2 A G2 | "E7" F2 F E2 D E2 | "Am" A2 A B2 A G2 | "E7" F2 E D3 E F |
  "Am" E2 F G2 E F2 | "Dm" G2 F E3 D F | "E7" E3 D E2 F G2 | "Am" A3 -A3 |
 * 
  4 
    G4 E4 D4 G4 
    D4 E4 G4 C4 
    G4 B4 A4 F4 
    E4 D4 G4 G4
 */
/**
find freq in main Freq
 * 
const row = []
const tempa = [
    [261.63,293.66,329.63,349.23,392.00,440.00],
    [261.63,293.66,329.63,349.23,392.00,440.00],
]
tempa.forEach(e=>{
    const temp = []
    e.forEach(j=>{
        mainFreq.forEach((k,i)=>{
        if(Math.round(e)==Math.round(k)){
            temp.push(i)
            console.log(i,e,k)
        }
        })
    })
    row.push(temp)
})
row
 * 
 */
// c4 261.63 index 12, C2 65.41 ,c3 130.81 0

const startingNoteFrequency = 130.81

for (let i = 0; i < 50; i++) {
    mainFreq.push(startingNoteFrequency * Math.pow(2, i / 12))
}

const songList = ["q","q"]
const song1 = {
   "w":[
        [0,.5,.5,[
            [0,12, 14, 16, 17, 19, 21,22]
        ],test,1,.001
        ],
        [
            3,1,1,triad,[
                1,0,1,2,0,3,
                0,4,0,3,1,2,
                0,3,0,1,5,1
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
        ],1,.01
        ],
        [
            3,2,2,triad,[
                1,0,1,2,0,3,
                1,4,2,3,0,2,
                2,3,0,1,0,1,
                1,0,1,2,0,3,
            ],.3,.01
        ],
        [3,.5,1,[[0,2, 0, 0, 2, 0, 2,0,0,2]],[ 
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
let currentNote = {}

const soundInitial = _ => (oscillators.forEach(oscillator => oscillator.forEach(e => e.stop())), []);

const playSound = (song) =>{
    if(isPlaying)return
    oscillators = soundInitial()
    isPlaying=true

    console.log(`canloop: song>`,song)
    
    if(!audioCtx) {
        initAudioContext()
    }

    currentNote = {}

    song.forEach((e,i)=>{
        const type = soundType[e[0]]
        const notes = e[4]
        const duration = e[2]
        const rythm = e[1]
        const volume = e[5]
        const temp = []
        let time = audioCtx.currentTime

        console.log(`index ${i} time:`,time)
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

const nextChord=_=>{
    //oscillators = soundInitial()
    //isPlaying= true
    isPlaying = false;
    index++
    playSound(song1[songList[index]])
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


 * 
1. 130.81 Hz - C3
2. 138.59 Hz - C#3/Db3
3. 146.83 Hz - D3
4. 155.56 Hz - D#3/Eb3
5. 164.81 Hz - E3
6. 174.61 Hz - F3
7. 184.99 Hz - F#3/Gb3
8. 195.99 Hz - G3
9. 207.65 Hz - G#3/Ab3
10. 219.99 Hz - A3
11. 233.08 Hz - A#3/Bb3
12. 246.94 Hz - B3
13. 261.62 Hz - C4
14. 277.18 Hz - C#4/Db4
15. 293.66 Hz - D4
16. 311.12 Hz - D#4/Eb4
17. 329.62 Hz - E4
18. 349.22 Hz - F4
19. 369.99 Hz - F#4/Gb4
20. 391.99 Hz - G4
21. 415.30 Hz - G#4/Ab4
22. 439.99 Hz - A4
23. 466.15 Hz - A#4/Bb4
24. 493.87 Hz - B4
25. 523.24 Hz - C5
26. 554.35 Hz - C#5/Db5
27. 587.32 Hz - D5
28. 622.24 Hz - D#5/Eb5
29. 659.24 Hz - E5
30. 698.44 Hz - F5
31. 739.97 Hz - F#5/Gb5
32. 783.97 Hz - G5
33. 830.59 Hz - G#5/Ab5
34. 879.98 Hz - A5
35. 932.31 Hz - A#5/Bb5
36. 987.75 Hz - B5
37. 1046.48 Hz - C6

*/
