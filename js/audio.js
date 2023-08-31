window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioCtx = new AudioContext();
const oscillators = []; // 用于存储正在播放的 oscillator 节点
const notes = [
    1,1,5,5,6,6,5,
    4,4,3,3,2,2,1,
    5,5,4,4,3,3,2,
    5,5,4,4,3,3,2,
    1,1,5,5,6,6,5,
    4,4,3,3,2,2,1
];
const notes1 = [
    1,1,5,5,6,6,5,
    4,4,3,3,2,2,1,
    5,5,4,4,3,3,2,
    5,5,4,4,3,3,2,
    1,1,5,5,6,6,5,
    4,4,3,3,2,2,1
];
const frequencies = [
    [261.63,293.66,329.63,349.23,392.00,440.00],
    [61.63,93.66,29.63,49.23,92.00,40.00]
]
let isPlaying = false; 

function playChord() {
    if (isPlaying) return; 
    
    isPlaying = true;
    let time = audioCtx.currentTime;

    notes.forEach((value,i) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);

        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';

        oscillator.frequency.value = frequencies[value-1];

        gainNode.gain.setValueAtTime(0, time);

        gainNode.gain.linearRampToValueAtTime(1, time + 0.01);

        oscillator.start(time);

        gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);

        oscillator.stop(time + 1);

        oscillators.push(oscillator);
        time += .5;
    });
}

function stopChord() {
    if (!isPlaying) return;

    isPlaying = false;
    oscillators.forEach(oscillator => {
        oscillator.stop();
    });

    oscillators.length = 0;
}

const btnPlay = document.getElementById('button1');
const btnStop = document.getElementById('button2');

btnPlay.addEventListener('click', playChord);
btnStop.addEventListener('click', stopChord);