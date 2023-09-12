// For zip
const math = Math
const PI = math.PI
const doc = document


// Image
const createImg = _ =>new Image()
const toPng = a =>a.toDataURL()


// Get canvas ID
const getCanvas = a => doc.getElementById(a)
const getContext = a => a.getContext('2d')



// Basic function (FP)
const max=(a,b)=>a>b?a:b;
const min =(a,b)=>(a<b)?a:b;
const rand=a=>math.random()*a
const randInt=a=>rand(a)|0;
const randIntBetween=(a,b)=>a+randInt(b-a+1);
const floor = a =>math.floor(a)
const floorSet = a =>reXY(floor(a.x),floor(a.y))
const reXY = (x,y)=>({x,y})
const set = a =>reXY(a.x,a.y)
const add = (a,b) =>reXY(a.x+b.x,a.y+b.y)
const dot=(a,b)=>reXY(a.x*b,a.y*b)
const substract=(a,b)=>reXY(a.x-b.x,a.y-b.y)
const comp=(a,b)=>a.x==b.x&&a.y==b.y
const collisionRect=(a,as,b,bs)=>(a.x+as.x>b.x&&b.x+bs.x>a.x&&a.y+as.y>b.y&&b.y+bs.y>a.y)?1:0
const clone = a =>{
    if (a == null || typeof a != 'object' || a instanceof Image) {
        return a;
    }
    const b = Array.isArray(a)?[]:{};
    for (let key in a) {
        b[key] = clone(a[key]);
    }
    return b;
}

const distance=(a,b)=>math.hypot(a.x-b.x,a.y-b.y);
const removeItem = (a,b)=>a.filter(e=>e!=b)
const appendItem = (a,b)=>(a.push(b),a)

const Pad=(a,b=5,c="0")=>a.padStart(b,c)
const IntToString=a=>a.toString()

const randWeight = (values, weights) => {
    
    const random = math.random();
    let cumulativeWeight = 0;
  
    for (let i = 0; i < values; i++) {
      cumulativeWeight += weights[i];
      if (random < cumulativeWeight) {
        return i;
      }
    }

    return 0;
};
const string2Array = (str, color_bit = 4) =>
  [...str].flatMap(e => {
    let temp = e.codePointAt(0)
    const result = []
    const color_space = (2 ** color_bit) - 1

    while (temp) {
      result.push(temp & color_space)
      temp >>= color_bit
    }
    return result
})
const tiles = (a,bit,color,w,t=0)=>{
  const b = []
  a.forEach(e=>{
      b.push(tilePng(e,bit,color,w,t))
  })
  return b
}

const tilePng = (item,bit,color,w,t=0) =>{

  var arr = t?item:string2Array(item,bit)
  var b = doc.createElement('canvas')
  var ctx1 = getContext(b)

  const size = 16

  const widthSize = w*size
  b.width = widthSize
  b.height = widthSize
  ctx1.clearRect(0,0,widthSize,widthSize)
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < w; j++) {
      const value = arr[i* w + j];
      const x = j * size;
      const y = i * size;
      if(value<color.length){
        ctx1.fillStyle = "#"+color[value]
        ctx1.fillRect(x, y, size, size);
      }
    }
  }

  let basicImage = createImg();
  basicImage.src = toPng(b);
  return basicImage;
}

// Rotate Frame
const rotateImage=(image, angle)=>{

  var canvas = doc.createElement('canvas');
  var ctx = getContext(canvas);

  var width = image.width;
  var height = image.height;
  var radians = (angle * Math.PI) / 180;

  canvas.width = width;
  canvas.height = height;

  ctx.translate(width / 2, height / 2);
  ctx.rotate(radians);
  ctx.drawImage(image, -width / 2, -height / 2);

  let rotatedImage = createImg();
  rotatedImage.src = toPng(canvas);
  return rotatedImage;
}

const AllTiles = {
  ground:{
      color:  ['90ea8c', '6cdf69', 'a48652', '80b67e', '10740c', 'c0ad6c', '33944d'],
      pattern1: ['𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶','𦶶𶶶𶶶𶶶𶶴𶶦𶶶𶶶𶦶𶶶ප', '𶶶𶶶鶶𶶶𶱌𴦶𶉶𡎶𦶶𶶴බ','𶶶𶶶𶶞𳃶𞶶𶶶𶶶𶶶𶶞𳃶බ'],
      pattern2: ['𮵳𬶶򭶥𵪒𪛕򛕶򒭵𦵪𶴭󵶮', '𞶶𜦶𬤤𕭭𭪭𭭭𬭭𭕭𤤦𳶜බ', '𶶶󤤞𭮤𬭭𭪭𭭭𭭕𤭭𤣤𶶶ƶ'],
      size: [8,3] 
  },
  playerStand:{
      color:  ['242434', '2d2d36', 'f2d55e', '4a4a56', '5f5f6d', '682921', '541b14', '666671', '272736', '000000'],
      pattern1: [
        "񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𪥊𱣅񑣆񒥊𪥊𸱦񒃧񒥊𪥊𸱨񒃧񒥊𱕊񈐨񒄩񒥊𱕊𸱨񒤇񒥊𱕊񁴈񒤇񒥊𱒪񁴊񒤇񒥊𩒪񁴊񒤇񒥊񑣅񂄊񒤈񒥊",
        "񒥊񒥊񒥊񒥊񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𪥊𱣅񑣆񒥊𩕊𸱦񒃧񒥊𩕊𸱨񒃧񒥊𱢪񈐨񒄩񒥊𱢥𸱨񒤇񒥊񑒥񁴈񒤇񒥊񒣆񁴊񒤇񒥊񒥅񂄊񒤈񒥊",
        "񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𱕊𱣅񑣆񒥊𩥊𸱦񒃧񒥊𩒪𸱨񒃧񒥊񑣅񈐨񒄩񒥊񑣅𸱨񒤇񒥊񒢦񁴈񒤇񒥊񒢦񁴊񒤇񒥊񒥅񁴊񒤇񒥊񒥊񂄊񒤈񒥊",
        "񒥊񒥊񒥊񒥊񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𪥊𱣅񑣆񒥊𩕊𸱦񒃧񒥊𩕊𸱨񒃧񒥊𱢪񈐨񒄩񒥊𱢥𸱨񒤇񒥊񑒥񁴈񒤇񒥊񒣆񁴊񒤇񒥊񒢥񂄊񒤈񒥊",
        "񒥊񂥊񒄈񒥊񒥊𢅊񁂄񒥊񒥊𡄊񀢄񒥊񒥊𡄊񀡄񒥊񒥊𡄊񀢄񒥊񒥊𢂥񁂄񒥊𪥊𩢦񁒥񒥊𲥊𲄈񁣆񒥊𩕊𠱨񁢄񒥊𱢪𡁣񀂄񒥊񑓆񊔈񒄉񒥊񑢥𡁣񒂄񒥊񒣆񁂈񒂈񒥊񒣆񒂈񁄊񒥊񂥊񒤄𢅊񒥈񂥊񒤈񂥊񒥈",
      ],
      size: [16,5] 
  },
  playerUp:{
      color:  ['44444c', '474751', '4a4a56', '54545d', '5a5a63', '666671', '682921', '722f26', '272736', '000000'],
      pattern1: [
        "񒥊񂄊񒤈񒥊񒥊𩒈񒂅񒥊񒥊𩒈񒂅񒥊񒥊𩑨񒂅񒥊񒥊𨱨񒂅񒥊񒥊𹳈񒃇񒥊񂥊𱳇񁣧񒥊𺅊𱳦񁳧񒥊𹴊𱳧𱳦񒥈𱳨𱳧𱳆񒤆𱣨𹳧𹳆񒄆𱣨𹳧𹣆񁣆𱤊񂄈𹳆񁣆񂅊񀀨𺄈񒃇񒥆񂄈񂂥񒤈񑥊񂥊񒄈񒥊",
        "񒥊񂄊񒤈񒥊񒥊𩒈񒁅񒥊񒥊𩒈񒁅񒥊񒥊𩒈񒁥񒥊񒥊𩒈񒁣񒥊񒥊𱳨񒃇񒥊񂥊𱣧񁳇񒥊𲅊𱳧𹣧񒥈𱤊𱳧𹣧񒄇𱤊𹳇𱣧񁳧𹣈𱣇𱳧񁳦𹣈𱣇𹳧񒃆𹤊񁣆𺄈񒃆񂅊񂄈񂄁񒥈񂥊񂂥񒤈񑥊񂥊񒄈𲥊⥊"
      ],
      size: [16,5] 
  },
  playerDone:{
      color:  ['323e4f', 'dfc459', '4a4a56', '1a1a1a', '722f26', '666671', '595966', '5b231c', '272736', '000000'],
      pattern1: [
        [,,,,,,8,8,8,,,,,,,,,,,,,8,5,5,5,8,,,,,,,,,,,8,6,5,1,5,5,8,,,,,,,,,,8,6,1,1,1,6,8,,,,,,,,,,8,6,5,1,5,6,8,,,,,,,,,8,8,4,6,5,6,4,8,8,,,,,,,8,4,4,0,4,4,7,0,4,7,8,,,,,,8,4,0,0,6,6,5,0,4,4,4,8,,,,8,4,7,2,6,6,5,5,5,2,7,4,8,8,,8,4,4,7,6,6,5,5,5,5,6,7,7,4,4,8,8,4,7,7,6,3,3,3,3,3,6,7,7,7,4,8,8,7,7,7,7,6,6,6,6,6,6,7,7,7,4,8,,8,7,7,7,5,6,7,6,5,7,7,7,7,7,8,,,8,8,8,5,2,8,6,5,8,7,7,7,8,,,,,,,8,8,8,2,5,,8,8,8,8,,,,,,,,,,8,8,,,,,,],
        [,,,,,,8,8,8,,,,,,,,,,,,,8,5,5,5,8,,,,,,,,,,,8,5,5,1,5,6,8,,,,,,,,,,8,6,1,1,1,6,8,,,,,,,,,,8,6,5,1,5,6,8,,,,,,,,,8,8,4,6,5,6,4,8,8,,,,,,,8,7,4,0,4,4,7,0,4,4,8,,,,,,8,4,4,0,5,6,6,0,0,7,4,8,,,,8,4,4,2,5,5,5,6,6,2,7,4,4,8,,,8,4,4,6,5,5,5,5,6,6,7,7,4,4,8,8,4,4,7,6,3,3,3,3,3,6,7,7,4,4,8,8,4,7,7,6,6,6,6,6,6,7,7,7,7,8,,8,7,7,7,7,5,6,7,6,5,7,7,7,8,,,,8,7,7,8,5,6,8,2,5,8,8,8,,,,,,8,8,8,5,2,8,8,8,,,,,,,,,,,,8,8,,,,,,,,,]
      ],
      size: [16,5] 
  },
  spider:{
      color:  ['a82413', 'c82a15', 'b42310', '2a2a2a', '272736', '1f1f1f', '000000'],
      pattern1: [
        "𿿿𿻿𧿿🿼𿿿𧼿𧻿𿿼󼿿𤿧󟿿鈸𼧭󣿟𭭯𿟿򭫭𿭍𭭿򒕭𯿽򭭭󿪒𫭿𩩭𻿽𯜟𿭭𻟿𭼼𿤽🧿𤿧𿧿𿟼𿿤𿤿𿻿𿿿𿿿𿿟ǿ",
        "𿿿𿟿𿿿󿿿𿿿𼧿𤻿𿿼🧼𧿧𿿼𼼿𧽭𛟼𭯜󿿭𭝯𭕅𭿿򕭭𿽒𭭯銭𻿽񭫭𿭍󧫿𭭯𿿿𼼧𧽭𼿼𿧟𿼧󿿤𿤧𿿿𻿿𿿿𿿿𿟿࿿"
      ],
      size: [16,3] 
  },
  rightAndLeft:{
      color:['ed9829', '43434f', 'f3d748', '000000'],
      pattern1: [
        [,,,1,1,0,0,,,,,,1,,1,2,0,0,,,,1,,1,,2,2,0,0,,1,,1,,,2,2,2,0,0,,1,,,,2,2,2,2,0,,1,,,,2,2,2,2,0,1,,1,,,2,2,2,0,0,,1,,1,,2,2,0,0,,,,1,,1,2,0,0,,,,,,1,1,0,0,,,]
      ],
      size: [16,3] 
  },
  snake:{
      color:['33190c', '42200f', '060301', 'c92b22', '150a05', '241108', '7c3613', '672f14', '512813', '000000'],
      pattern1: [
        "򪪪򪪪򪪪򪪪򪪪򪪪򊪪򪪇򪪪򊪪򨢃򪪪򪪪񶡨򪪨򪪪򊪪򪞈򪪪򪪪񸡺򪪪򪪪񷚪򪪧򪪪񷪪򪪧򪪪򇚪򪩸򪪪򇢪򪪨򪪪񧢪򪪪򇞆򈪨򊪧񨞆򪆈򈞈񄡦򩥄񨢪𢖆򥐅򪪪񕖪򪪪\n",
        "򪪪򪪪򪪪񺪪򨝨򪪪򊪪򈢈򪪧򪪪񺜶򪩸򪪪򪡺򪢈򪪪򪪪򧝶򪪪򪪪򧝺򪪪򪪪񷝺򪪪򪪪򨡪򪪪򪪪򨞊񸪪򪪇򦞊񶪪򈡨񸢪򇢪򊪇򊪨񨙸򪪨򪪇򈢊򆞪򪪈򪪪򈢪򪪨򪪪򨢊򪪪\n"
      ],
      size: [16,4]
  },
  scorpion:{
      color:['8a2214', '606070', '50505e', '3f3f4a', '232329', '343448', '43434f', '000000'],
      pattern1: [
        [,,,,,,6,6,4,6,6,4,,,,,,,,,,6,6,6,,6,6,4,6,6,,,,,,,,6,6,,,,4,6,6,4,4,,,,,,,,6,6,,,,,,6,6,6,,,,,,,,,,,,,4,6,6,6,,,,,,,,,3,3,,6,6,4,6,,,5,5,5,5,,,2,2,6,6,4,6,6,,,5,5,5,5,5,,1,1,4,6,6,6,4,,,,5,,,5,4,1,6,6,6,4,6,3,3,3,,,,5,,5,5,0,6,6,6,6,2,2,,3,,,,5,5,5,,4,,6,6,5,1,2,2,3,,,,,,,,,4,0,6,4,1,1,2,3,,,,,,,,5,5,5,,5,,1,2,,,,,,,,5,5,5,5,5,4,,,,,,,,,,,5,,,5,5,5,,,,,,,,,,,,5,5,5,5,,,,,,,],
        [,,,,,,,6,6,4,6,6,4,,,,,,,,,,6,6,6,,6,4,4,6,,,,,,,,,6,6,,,,,4,6,,,,,,,,,,6,6,,,,,4,4,,,,,,,,,,,,,,,6,6,6,,,,,,,,,,,,,4,6,6,6,,,,,,,,,3,3,,6,6,4,6,,,5,5,5,5,,,2,2,6,6,4,6,6,,,5,5,5,5,5,,1,1,4,6,6,6,4,,,,5,,,5,4,0,6,6,6,4,6,3,3,,,,,5,,5,5,4,6,6,6,6,2,2,3,3,,,,5,5,5,,,4,0,6,5,1,2,2,3,,,,,,,5,5,5,,6,4,1,1,2,3,,,,,,5,5,5,5,5,4,5,,1,2,,,,,,,5,,,5,5,5,,,,,,,,,,,,5,5,5,5,,,,,,,,]
      ],
      size: [16,4]
  },
  turtle:{
      color:['421d0b', '032715', 'd86538', 'e77b50', '672f14', '268354', '187144', 'ff9166', '073d22', '000000'],
      pattern1: [
        [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8,8,5,5,8,8,,,,,,,,,8,5,6,8,6,6,5,6,8,5,,,,,,5,8,6,6,8,8,8,5,6,8,6,6,,,,5,5,8,8,8,5,6,8,8,8,8,8,8,8,,,8,8,6,5,8,7,7,7,7,6,6,8,5,8,,8,8,8,6,6,7,7,7,7,7,7,5,8,6,6,8,8,5,5,8,7,7,7,7,7,7,7,7,8,8,8,8,4,5,6,8,7,7,9,7,7,9,7,7,5,5,8,4,,4,8,8,6,7,7,7,7,7,7,6,6,6,4,,,,4,4,8,4,7,7,7,7,4,8,8,4,,,,,,4,4,4,0,0,0,0,4,4,4,,,,,,,7,7,2,,,,,2,7,7,,,,,,,3,2,,,,,,,2,3,,,,,,,,,,,,,,,,,,,],
        [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8,8,8,6,5,8,,,,,,,,,8,8,6,5,8,6,6,8,8,8,5,,,,,5,5,8,6,7,7,7,7,8,6,5,8,,,,8,6,6,8,7,7,7,7,7,7,6,6,8,5,,6,6,8,8,7,7,9,7,7,9,7,7,5,8,6,8,6,8,8,5,7,7,7,7,7,7,7,7,8,8,6,6,8,6,6,5,3,7,7,7,7,7,7,3,6,6,8,8,4,5,6,8,4,4,3,7,7,3,4,4,5,6,8,4,,4,4,4,1,1,1,3,3,1,1,1,4,4,4,,,,,7,7,3,8,8,8,8,3,7,7,,,,,,,7,7,2,,,,,2,7,7,,,,,,,3,2,,,,,,,2,3,,,,,,,,,,,,,,,,,,,]
      ],
      size: [16,4]
  },
  hearts:{
      color:['000', '8e3d10', '000'],
      pattern1: ['󛛛󙛛񋛋󙉙󉉋񉛛󛛛󛛙󛛛󛛛󛛛ۛ', '󛛛󛛛󛛛󛛛󋛋񙉛񋛉󛙉󛉋󙛛󛛛ۛ'],
      size: [9,3]
  },
  aims:{
      color:['935533', '43434f', '272736', '7c4528', '3f3e3e', '000000'],
      pattern1:[
        "񶶶𶱒𶶶򉑶𶶱랶󙲖𞶶𒦶𶞴𶛶𦶴𞛶𶦦𴶶𴓜𶶴򦦶𶑔򶶶򢤑𶶶򢢶𶴴𦶶𣲦𶶦󜴶𦶞𴶶󶶞𤦳𶞴󳶶𛱎𶶶򑛶𶳙𶶶𲉖涶"
      ],
      size: [16,3]
  },
}

const white = "aaa"
const red = "8e3d10"
const green = "0a0"
const grey = "333"
const blue ="8df"
const yellow = "f3d748"
// font color red,green
const fontColor = [[white,white],[red,red],[green,green],[grey,grey],[blue,blue],[yellow,yellow]]

// number 2-9
const numberTile = fontColor.map(e=>tiles(['񚙖񩖙ɖ', '򥚚򦪚ŕ', '񪙖򩩚ŕ', '񪙖񪙚ɖ', '򚙦򚥕ɪ', '򪙖񪩖ɖ', '򪙖񪙕ɖ', '񪕕񪦩Ʀ', '񪙖񪙖ɖ', '񪙖񪥖ɖ'],2,e,5))

// font A - Z
const A2ZTile = fontColor.map(e=>tiles(['򙪚񕖩Ʃ', '񪙕񪙕ɕ', '񪙖񪚩ɖ', '񪙕񪖩ɕ', '򪕖򪕕Ŗ', '򪕖򪙕ʩ', '򪕖񪕙ɖ', '񪖩񪕕Ʃ', '񦙖񦚚ɖ', '񦩕򦚚ʕ', '򙦥򙪖ƥ', '򩚩򕚥ŕ', '񙖩񦖙Ʃ', '񩖩񚖙Ʃ', '񩙖񚖙ɖ', '񪙕򦙕ɩ', '񩙕򩙕ʩ', '񚕖񚥖ƪ', '򪕖񪩖ɕ', '񦕕򦚚ƚ', '񪖩񪖩ɖ', '񪖩򙦩ʚ', '񦖩񙖙Ʃ', '򙦩򙪚Ʃ', '񪖩򦩖ƙ', '򚥕򩪚ŕ'],2,e,5))


// key initial 
let key= {},key1={},checkButton=[],startButton,returnButton,INKEYIN=0
let keyStopRestart=['r','p'],mouseCanvas,addScore=1,Pause=0,PlayGoodOrNot=2

// initial key dict
keyStopRestart.forEach(e=>key1[e]=0)


// view 
let barWidthSizeCount = 0
let showTurialView = 0
let audioCtx = null

let oscillators = []
let isPlaying = false
let songLength = 0

//  4 chapter for loop
const songList = ["a","a","c","c","a","a","b","b","a","a","t"]

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

const song1 = {
   "t":[
    [0,.5,.5,[
        [0,12, 14, 16, 17, 19, 21]
    ],  [
            1,0,3,1,0,2,3,1,0,
            3,4,5,0,3,4,5,0,5,
            6,5,4,0,1,5,6,5,4,
            3,1,0,5,1,0,1,5,1,
            0
        ],.2,.001
    ],
    [
        3,1,1,triad,[
            1,0,1,2,0,3,
            0,4,0,3,1,2,
            0,3,0,1,5,1
           ],.1,.01
    ]
   ],
   "a":[
        [3,.5,1,[
            [0,1, 2]
        ],[1,2,0,2,1,0],.3,.001
        ],
        [
            0,1,1,triad,[
                1,0,0
            ],.3,.01
        ]
    ],
    "c":[
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
        ],.3,.01
        ],
        [
            3,2,2,triad,[
                1,0,1,2,0,3,
                1,4,2,3,0,2,
                2,3,0,1,0,1,
                1,0,1,2,0,3,
            ],.1,.01
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
    "b":[
        [3,.5,1,[
            [0,1,3,4,5,7,8,10,12],
        ],[ 
            6,7,6,5,4,4,5,2,
            6,6,7,5,4,3,2,3,
            3,4,5,3,4,5,4,2,
            2,3,4,6,6,4,4,3,
            2,6,6,7,6,4,3,4
        ],.5,.01
        ],
        [0,1,1,fifthChord,[
            3,2,1,0,2,1,3,1,
            0,3,1,0,1,3,0,1,
            2,0,2,1
        ],.2,.01
        ]
    ]
}

const soundInitial = _ => (oscillators.forEach(oscillator => oscillator.forEach(e => e.stop())), []);


const playSound = song =>{
    if(isPlaying)return
    oscillators = soundInitial()
    isPlaying=true
    if(!audioCtx){
        audioCtx=new (window.AudioContext || window.webkitAudioContext)()
    }

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
        songLength++
        if(songLength>=songList.length){
            songLength = 0
        }
        isPlaying=false
        playSound(song1[songList[songLength]])
    }
}

const playChord=_=>{
    playSound(song1[songList[songLength]])
}

const keepPlayChord=_=>{
    if(!isPlaying){
        audioCtx.resume()
        isPlaying = true
    }
}
const stopChord=_=>{
    if(isPlaying){
        audioCtx.suspend()
        isPlaying = false
    }
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

const rightPcmData =createPcmData(mainFreq[5], mainFreq[3], .1,.1,0, .1,.3,.1)
const leftPcmData =createPcmData(mainFreq[3], mainFreq[5], .1,.1,0, .1,.3,.1)

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
const canvas = getCanvas('a');
const ctx = getContext(canvas);

const l = window.localStorage;

// Initial 
const timer = performance
const initialXY = reXY(0,0)


let gameObject = mapLayer= notesObject = [],second=0,level =1,score=0

// map appear rate 
let mapRate = [max(.5,.8-level*.01),.2,min(.15,.01*level),min(level*.01,.1)]

// enemy appear rate

let enemyRate = [
    max(.05,.2-level*.5),
    max(.2,.3-level*.1),
    min(.4,.1+level*.1),
    min(.3,0+level*.05),
    min(.1,0+level*.01),
]

// game speed
const speedStep = 1,speed = 50

// game window 
const halfW=canvas.width = 1024
const halfH=canvas.height = 800
const quW = halfW/4
const quH = halfH/4

// PNG size
const size = 32
const upTileGap = size/2


// music play and can move
var movementIndex = 0


// tile png
const zipSize = 16
const backgroundMap = tiles(AllTiles.ground.pattern1,3,AllTiles.ground.color,8)
const pathTemp = tiles(AllTiles.ground.pattern2,3,AllTiles.ground.color,8)
const pathPng = pathTemp.concat([rotateImage(pathTemp[1],90),rotateImage(pathTemp[2],90)])

const playStandTemp = tiles(AllTiles.playerStand.pattern1,5,AllTiles.playerStand.color,zipSize)
const playUpTemp = tiles(AllTiles.playerUp.pattern1,5,AllTiles.playerUp.color,zipSize)
const playDoneTemp = tiles(AllTiles.playerDone.pattern1,5,AllTiles.playerDone.color,zipSize,1)
const playerPng = playStandTemp.concat(playUpTemp).concat(playDoneTemp)

const SpiderPng = tiles(AllTiles.spider.pattern1,3,AllTiles.spider.color,zipSize)
const SnakePng = tiles(AllTiles.snake.pattern1,4,AllTiles.snake.color,zipSize)
const ScorpionPng = tiles(AllTiles.scorpion.pattern1,4,AllTiles.scorpion.color,zipSize,1)
const TurtlePng = tiles(AllTiles.turtle.pattern1,4,AllTiles.turtle.color,zipSize,1)

const heartsPng = tiles(AllTiles.hearts.pattern1,3,AllTiles.hearts.color,9)
const heartsBlackPng = tiles(AllTiles.hearts.pattern1,3,['000', '333', '000'],9)

const rightTemp =tiles(AllTiles.rightAndLeft.pattern1,3,AllTiles.rightAndLeft.color,10,1)
const rightAndLeftPng = rightTemp.concat([rotateImage(rightTemp[0],180)])

const aimPng = tiles(AllTiles.aims.pattern1,3,AllTiles.aims.color,zipSize)

// Draw Image  ( Main ) 
const canvasDraw=(f,a,b)=>{
    if(f)ctx.drawImage(f,a.x,a.y,b.x,b.y)
}
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


const DrawText = (arr,tile1,tile2,locationPos,gap,wh,ascii=65) =>{
    arr.forEach((e,j)=>{
        for(var i=0;i<e.length;i++){
            
            let pos = reXY(locationPos.x+i*gap.x,locationPos.y+j*gap.y)

            const asciiCode = e[i].charCodeAt(0)-ascii
            
            if(asciiCode>=0){
                
                canvasDraw(tile1[asciiCode],pos,wh)
                pos = substract(pos,reXY(2,2))
                canvasDraw(tile2[asciiCode],pos,wh)
            }
        }
    })
}

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
    mainFrame:[],
    showTime: clone(Timer),
    AnimationTime: clone(Timer),
    frameIndex:0,
    score:0,
    direct:0,
    lives: 0,
    ack:0,
    type:"Z",
    lines:[],
    initial:function(){
        this.showTime.set(0,1,0.05)
        this.AnimationTime.set(0,1,0.03)
    },
    update:function(e){
        this.vpos = dot(this.vpos,-1)
        if(this.showTime.StartTime<this.showTime.EndTime){
            this.showTime.check()
        }
        if(this.type!='Node' && this.type!='Line'){
            for(var i = 0;i<this.mainFrame.length;i++){
                if(this.AnimationTime.StartTime>1/2*i){
                    this.frameIndex = i
                }
            }
            this.AnimationTime.check()
        }
    },
    render:function(){
        canvasSave()
        canvasAlpha(this.showTime.StartTime)
        // show number score
        if(this.ack!=0 && this.mainFrame!=playerPng){
            let text =  Pad(IntToString(floor(max(this.score,0))),2)
            let wh = reXY(12,12)
            for(var l=0;l<text.length;l++){
                let pos = substract(this.pos,reXY(-4+-l*upTileGap,14))
                canvasDraw(numberTile[3][text[l].charCodeAt(0)-48],pos,wh)
                pos = substract(this.pos,reXY(-3+-l*upTileGap,16))
                canvasDraw(numberTile[this.ack<0?1:5][text[l].charCodeAt(0)-48],pos,wh)
            }
        }
        if(this.type=='Node'||this.type=='Line'){
            canvasDraw(this.mainFrame[this.frameIndex],reXY(this.pos.x-this.wh.x/32,this.pos.y+this.wh.y/2),this.wh)
        }else{
            canvasDraw(this.mainFrame[this.frameIndex],this.pos,this.wh)
        }
        canvasRestore()
    },
    remove:function(e){
        gameObject = removeItem(gameObject,this)
    }
}
//Basic.initial()

const Placement = clone(Basic)
const Line = clone(Basic)
const Tilemap = clone(Basic)
const Camera = clone(Basic)
const Player = clone(Basic)

const Spider= clone(Basic)
const Snake= clone(Basic)
const Scorpion= clone(Basic)
const Heart = clone(Basic)

const Note = clone(Basic)

// UI
const Button = clone(Basic)
const Aim = clone(Basic)
const Turtle = clone(Basic)
const ExplainBoard = clone(Basic)
const StartClick = clone(Basic)
const PauseView = clone(Basic)
const EndView = clone(Basic)


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
Line.type = "Line"
Line.initial()

// Player

Player.mainFrame = playerPng
Player.moveToPlacement = 0
Player.update=function(s){
    //console.log(this.vpos,this.pos)
    var moveToEnd = 0
    if(this.lines.length && movementIndex){
        

        const gap = 100/floor(this.lines.length)
        // select path 
        
        for(var i =0;i<this.lines.length;i++){
            if(score>=this.lines[i].score){
                this.moveToPlacement = i
            }
        }
        
        if(this.moveToPlacement>=this.lines.length){
            this.moveToPlacement = this.lines.length-1
        }

        let tempPos = reXY(this.pos.x,this.lines[this.moveToPlacement].pos.y)

        if(distance(this.pos,tempPos)<=1){
            
            // now move to endpos
            tempPos = this.lines[this.moveToPlacement].pos
            moveToEnd = 1

        }

        this.vpos = set(tempPos)
        this.vpos = substract(this.vpos,this.pos)
        
        if(tempPos.y>this.pos.y&&tempPos.x==this.pos.x){
            this.pos.direct = 7
        }
        if(tempPos.y<this.pos.y&&tempPos.x==this.pos.x){
            this.pos.direct = 5
        }
        if(tempPos.x>this.pos.x&&tempPos.y+1>=this.pos.y){
            this.pos.direct = 3
        }

        var i = this.pos.direct
        for(var i = this.pos.direct,j=0;i<this.pos.direct+2;i++,j++){
            if(this.AnimationTime.StartTime>1/2*j){
                this.frameIndex = i
            }
        }

    }else{

        for(var i =0;i<3;i++){
            if(this.AnimationTime.StartTime>1/3*i){
                this.frameIndex = i
            }
        }

    }
    this.AnimationTime.check()
    this.vpos = dot(this.vpos,s*speed*.03)
    this.pos = add(this.pos,this.vpos)
}
Player.AnimationTime.set(0,1,.03)

// camera follow
Camera.update=function(e){
    this.vpos = substract(this.vpos,this.pos)
    this.vpos = dot(this.vpos,e*speed*.01)
    this.pos = add(this.pos,this.vpos)
}
Camera.render=_=>{}


Scorpion.mainFrame = ScorpionPng
Scorpion.ack = -1
Scorpion.initial()

Snake.mainFrame = SnakePng
Snake.ack = -2
Snake.initial()

Spider.mainFrame = SpiderPng
Spider.ack = -3
Spider.initial()

Heart.mainFrame = heartsPng
Heart.ack = 1
Heart.initial()

Turtle.mainFrame = TurtlePng
Turtle.wh = reXY(84,84)
Turtle.pos = reXY(halfW/4-Turtle.wh.x/2,halfH/2-80)

Turtle.AnimationTime.set(0,1,.02)


// UI view
Aim.mainFrame = aimPng
Aim.frameIndex = 0
Aim.nameIndex= 2
Aim.vpos = reXY(quW-size,quH+quH/3)
Aim.pos = reXY(quW,quH+quH/2)
Aim.wh = reXY(64,64)
Aim.render=function(e){

    if(Aim.AnimationTime.StartTime<Aim.AnimationTime.EndTime){
        Aim.AnimationTime.add()
    }

    canvasSave()

    if(Aim.AnimationTime.StartTime>Aim.AnimationTime.EndTime){
        this.nameIndex=2
    }

    let temp = this.nameIndex
    if(temp<=1){
        const word = ["NICE","FOOL"]
        DrawText([word[temp]],A2ZTile[3],A2ZTile[4],substract(this.vpos,reXY(+2,upTileGap)),reXY(20,0),reXY(14,14))
    }

    canvasDraw(this.mainFrame[this.frameIndex],this.vpos,this.wh)
    canvasRestore()
}
Aim.AnimationTime.set(1,1,1)

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


const CharChBoard = [Heart,Scorpion,Snake,Spider,Turtle].map(e=>{
    const temp = clone(e)
    temp.wh =reXY(64,64)
    temp.ack = 0
    temp.vpos = reXY(0,0)
    temp.initial()
    temp.AnimationTime.set(0,1,.03)
    return temp
})

const CharChBoardText = [
                        "GIVE YOU ONE HEAPTS",
                        "STAB TT MINUS ONE",
                        "BITE TT MINUS TWO",
                        "BITE MINUS THPEE",
                        "I AM JENY IF U PLAY GOOD",
                        "I WILL GIVE U HEAPTS YY",
                        "PATH IS CHOOSEN BY SCOPES",
                        "LEFT AND PIGHT NOTES KEY"
]

ExplainBoard.wh = dot(reXY(quW,quH),3)
ExplainBoard.pos = reXY(quW/2,quH/2)
ExplainBoard.showTime.set(0,3,.01)
ExplainBoard.render = function(s){
    canvasSave()
    canvasFillStyle("#333")
    canvasFillRect(substract(this.pos,reXY(-4,-4)),this.wh)
    canvasFillStyle("#33b48b")
    canvasFillRect(this.pos,this.wh)
    CharChBoard.forEach((e,j)=>{
            let pos = reXY(150,quH/2+80*j)
            e.pos =pos
            e.update(0)
            e.render(1)
    })

    DrawText(CharChBoardText,A2ZTile[0],A2ZTile[3],reXY(quW,quH/1.7),reXY(24,80),reXY(20,20))
    // CharChBoardText.forEach((e,j)=>{
    //     for(var i=0;i<e.length;i++){
    //         let pos = reXY(quW+i*24-2,quH/1.7+80*j-2)
    //         const wh = reXY(20,20)
            
    //         const asciiCode = e[i].charCodeAt(0)-65
    //         if(asciiCode<0)continue;
    //         canvasDraw(A2ZTile[0][asciiCode],pos,wh)
    //         pos = reXY(quW+i*24,quH/1.7+80*j)
    //         canvasDraw(A2ZTile[3][asciiCode],pos,wh)
    //     }
    // })
    if(this.showTime.StartTime>this.showTime.EndTime){
        showTurialView = 1
    }
    this.showTime.add(s)
    canvasRestore()
}

StartClick.wh = reXY(quW,quH)
StartClick.pos = initialXY
StartClick.render = function(e){

    canvasSave()
    
    this.AnimationTime.check()
    canvasAlpha(this.AnimationTime.StartTime)
    let text = "CLICK ANY TO STAPT"

    DrawText([text],A2ZTile[0],A2ZTile[1],reXY(halfH/2.8,halfH-quH/2),reXY(24,0),reXY(20,20))
    
    canvasAlpha(1)
    const pattern = "W        W"
    text  = [pattern,"W KNIGHT W",pattern,pattern,pattern,pattern,pattern,pattern,pattern]
    DrawText(text,A2ZTile[0],A2ZTile[1],reXY(quW-100,quH/2),reXY(70,64),reXY(64,64))
    
    // for(var i=0;i<text.length;i++){
    //     let pos = reXY(halfH/2.5+i*24,halfH-quH/2)
    //     const wh = reXY(20,20)
    //     const asciiCode = text[i].charCodeAt(0)-65
    //     if(asciiCode<0)continue
    //     canvasDraw(A2ZTile[0][asciiCode],pos,wh)
    //     pos = reXY(halfH/2.5+i*24-2,halfH-quH/2-2)
    //     canvasDraw(A2ZTile[1][asciiCode],pos,wh)
    // }
    canvasRestore()
}
StartClick.AnimationTime.set(0,1.5,.01)

PauseView.render=e=>{
    canvasSave()
    canvasAlpha(.5)
    canvasFillStyle("#333")
    canvasFillRect(initialXY,reXY(halfW,halfH))
    const text = "TOT QAUSE TOT"

    DrawText([text],A2ZTile[0],A2ZTile[1],reXY(quW/4,halfH/2),reXY(70,0),reXY(64,64))
    canvasRestore()
}
EndView.render=e=>{
    canvasSave()
    canvasAlpha(.5)
    canvasFillStyle("#333")
    canvasFillRect(initialXY,reXY(halfW,halfH))
    let text = "ZZ YOU LOSE ZZ"
    DrawText([text],A2ZTile[0],A2ZTile[1],reXY(32,halfH/2),reXY(70,0),reXY(64,64))
    
    text = ["BEST SCOPE ","","CLICK P TO PESTAPT"]
    DrawText(text,A2ZTile[0],A2ZTile[1],reXY(halfH/2.5,halfH-quH/2),reXY(24,24),reXY(20,20))
    text = [Pad(IntToString(max(floor(previousPlayerPos.score),0)),5)]
    DrawText(text,numberTile[0],numberTile[1],reXY(halfH/1.3,halfH-quH/2),reXY(24,0),reXY(20,20),48)

    canvasRestore()
}

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
    const enemy = [0,Heart,Scorpion,Snake,Spider]

    const distBetweenFirst = 32
    const countPath = floor(distX/distBetweenFirst)

    for(var i =0;i<countPath;i++){
        const cl = generatePathmap(reXY(item.pos.x-distBetweenFirst*i,item.pos.y))
        appendItem(arr,cl)
    }

    const firstPlacement = clone(Placement)
    firstPlacement.created=1
    firstPlacement.pos = item.pos
    appendItem(arr,firstPlacement)

    const odd = count%2?0:distY/2
    const firstY = firstPlacement.pos.y-(floor(count/2))*distY+odd

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
        for(var j=1;j<=floor(distance/size);j++){
            const cl = generatePathmap(reXY(firstPlacement.pos.x+j*size,y))

            appendItem(arr,cl)
        }

        // Placement 
        const cn = clone(Placement)
        cn.pos = reXY(x,y)
        cn.wh = set(firstPlacement.wh)
        cn.score = 100/floor(count)*i
        appendItem(firstPlacement.lines,cn)
        
        // Enemy or item 
        const chooseIndex = randWeight(enemy.length,enemyRate)
        if(chooseIndex){
            const enemyNode = clone(enemy[max(1,chooseIndex)])
            enemyNode.pos = reXY(x,y)
            enemyNode.type = "Znemy"
            enemyNode.wh = set(firstPlacement.wh)
            enemyNode.score = 100/floor(count)*i
            appendItem(arr,enemyNode)
        }
        appendItem(arr,cn) 
    }
    firstPlacement.lines.sort((a,b)=>a.score>b.score)
}

const findNodes = node =>{
    if(!node.lines.length&&!node.created){

        const gapSize = 160
        const startPath = generatePathmap(reXY(node.pos.x+gapSize,node.pos.y))

        startPath.created = 1
        appendItem(gameObject,startPath)

        node.lines = [startPath]
        node.create=1

        generatePath(gameObject,startPath,gapSize,64,max(1,floor(level)))

        //console.log("LINES >",startPath.lines)

        return startPath
    }
}


// Game initial 
const initial = _ =>{
    const curH = halfH/size/2
    const curW = halfW/size/2
    Camera.pos = initialXY
    ExplainBoard.showTime.set(0,3,.01)
    Pause= showTurialView = 0  
    gameObject = [Camera]
    mapLayer = []
    notesObject = []
    level = 1
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
    const StartPlacement = generatePlacement(reXY(128,quH))
    Player.lives = 5
    Player.pos = reXY(128,quH)
    
    Player.lines = [findNodes(StartPlacement)]
    appendItem(gameObject,Player)
    appendItem(gameObject,StartPlacement)
    
    nextLevel(level)
}

// next level create notes 
const nextLevel = level =>{
    
    //console.log("Next level",level)
    
    barWidthSizeCount = 8 *level

    for(var i=0;i<8*level;i++){

        const notes = clone(Note)
        notes.frameIndex = randIntBetween(0,1)
        notes.AnimationTime.set(0,i*100,randIntBetween(2,4))
        notes.score = floor(100/(8*level))
        notes.level = min(level*.8,2)
        
        notesObject.push(notes)

    }
    gameObject.sort((a, b) => {
        return a.type.localeCompare(b.type)
    });
}

// camera position and player 
let centerPos = clone(Basic)
let previousPlayerPos

const render = s =>{
    mapRate = [max(.5,.6-level*.01),.2,min(.1,.03*level),min(level*.03,.2)]
    enemyRate = [
        max(.05,.4-level*.5),
        max(.2,.4-level*.1),
        min(.4,.2+level*.1),
        min(.3,.1+level*.05),
        min(.2,0+level*.05),
    ]
    // set camera move
    if(previousPlayerPos&&Camera){
        
        centerPos.pos = reXY(halfW/8,halfH/7)
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

                const tMap = generateTilemap(reXY(k.pos.x,mapLayer[lastX][0].pos.y+32),mapRate)

                temp.push(tMap)
            })
            mapLayer.shift()
            mapLayer.push(temp)
        }
        // Y--
        if(substract(e[mapLayer.length-1].pos,Camera.pos).y>halfH/2.5 && movementIndex){
            const temp =[]

            e.forEach(k=>{
                
                const tMap = generateTilemap(reXY(k.pos.x,mapLayer[0][0].pos.y-32),mapRate)

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
                const tMap = generateTilemap(reXY(e[lastX].pos.x+32,k.pos.y),mapRate)

                e.push(tMap)
                e.splice(j,1)
            }
        })
    })

    gameObject.forEach(e=>{
        if(e.mainFrame==playerPng){
            
            if(movementIndex && addScore){
                e.score += max(score,0)
                
                if(score>=70){
                    e.lives = min(e.lives+1,12)
                }
                addScore=0
            }

            previousPlayerPos = clone(e)

            if(movementIndex){
                
                //console.log("Player score",previousPlayerPos.score)
                gameObject.forEach(j=>{
                    if(j.pos.x<=e.pos.x+5&&j.pos.x>=e.pos.x-5
                        &&j.pos.y<=e.pos.y+5&&j.pos.y>=e.pos.y-5
                        &&j.type=='Node'){
                        
                        const checkOnePoint = findNodes(j)
                        
                        if(checkOnePoint){
                            j.remove()
                            e.lines=[checkOnePoint]
                            movementIndex = 0
                            addScore=1
                            score = 0
                            level+=0.5
                            nextLevel(level)
                        }else{
                            e.lines= j.lines
                        }
                    }
                    if(j.pos.x<=e.pos.x+20&&j.pos.x>=e.pos.x-20
                        &&j.pos.y<=e.pos.y+10&&j.pos.y>=e.pos.y-10
                        &&j.type=='Znemy'){
                        
                        e.lives = min(e.lives+j.ack,12)
                        
                        if(e.lives<=0){

                            previousPlayerPos = clone(e)
                            e.remove()
                        }else{

                            j.remove()

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
const touch = rORl =>{
    if(!showTurialView)return;
    if(!notesObject.length)return;

    let findLastNotes = 0
    let minValue = 99999
    notesObject.forEach((e,index)=>{
        const dist = distance(Aim.pos,e.pos)
        if(dist<minValue&&!e.disable){
            minValue=dist
            findLastNotes = index
        }
    })
    Aim.initial()
    Aim.nameIndex = 1
    const notesIndex = notesObject[findLastNotes]
    if(!notesIndex.disable){
        if(collisionRect(Aim.pos,Aim.wh,notesIndex.pos,notesIndex.wh)&&notesIndex.frameIndex==rORl){

            score += notesIndex.score
            Aim.nameIndex = 0

        }
        score = max(score,0)
    }
    notesIndex.disable = 1

}
const notesrender = s => {
    //console.log("note move",notesObject)

    notesObject.forEach(e=>{

        e.update(s)
        
        if(substract(Aim.pos,e.pos).x>50){
            
            // score -= e.disable?0:e.score
            // previousPlayerPos.score -= e.disable?0:e.score
            e.disable = 1 
        }
        if(e.pos.y>halfH/2&&e.pos.x<=40){
            e.remove()
        }
        e.render()
    })
}

mouseCanvas = canvas.getBoundingClientRect();
// start game
const loop = _ =>{
    
    //game timer
    const now = timer.now();
    const deltaMs = now - second;
    const delta = deltaMs / 1000;
    second = now;

    // resize window 
    canvas.width = 1024
    canvas.height = 800
    
    ctx.clearRect(0,0,halfW,halfH)

    const hw = halfW/2
    
    // game start view
    // start View INKEYIN = 1  > start when click anywhere
    if(!INKEYIN){

        StartClick.render(delta)

    }else{
        // main game loop
        if(!Pause){
            canvasSave()
            canvasScale(2)
            render(delta)
            canvasRestore()
            if(previousPlayerPos.lives<=0){
                EndView.render(delta)
            }

            if(!showTurialView){

                ExplainBoard.render(delta)

            }else{
                canvasScale(2)

                if(!movementIndex){

                    // UI and Note View 
                    //stopChord()
                    canvasSave()
                    
                    canvasFillStyle("#92535e")

                    // upper bar
                    const notesCurrentIsEnable = max(0,barWidthSizeCount - (notesObject.filter(e =>e.disable==0).length))
                    const normWidth = barWidthSizeCount?hw/barWidthSizeCount:0

                    ctx.fillRect(0,0,hw-(notesCurrentIsEnable*normWidth),5)
                    
                    const centerW = quW
                    const centerH = halfH/2
                    const radiusY = 120

                    canvasAlpha(.5)
                    
                    ctx.fillRect(0,centerH-radiusY-20,halfW,radiusY+20)
                    
                    canvasAlpha(1)

                    ctx.setLineDash([9])
                    ctx.beginPath()
                    ctx.ellipse(centerW, centerH, centerW, radiusY, 0, PI, 2 * PI);
                    ctx.stroke()
                    ctx.closePath()
                    ctx.beginPath()
                    ctx.ellipse(centerW, centerH, centerW-55, radiusY-40, 0,PI, 2 * PI);
                    ctx.stroke()
                    ctx.closePath()

                    notesrender(delta)
                    //ctx.beginPath()
                    //canvasstrokeStyle("#FFF")
                    //ctx.strokeRect(centerW-25,centerH-radiusY-5,50,50)
                    //canvasStroke()
                    Aim.render()
                    Turtle.update(delta)
                    Turtle.render()
                }

                // UI Board  "SCOPE",
                const board = ["POUTE"]
                
                for(var i=0;i<12;i++){
                    const pos = reXY(i*size,8)
                    const wh = reXY(size,size)
                    if(previousPlayerPos.lives>i){
                        canvasDraw(heartsPng[0],pos,wh)
                    }else{
                        canvasDraw(heartsBlackPng[0],pos,wh)
                    }
                }
                //DrawText(board,A2ZTile[3],A2ZTile[4],initialXY,reXY(12),5)
                board.forEach((e,j)=>{
                    for(var i=0;i<e.length;i++){
                        let pos = reXY(5+i*16-2,60+40*j-2)
                        const wh = reXY(12,12)
                        const asciiCode = e[i].charCodeAt(0)-65
                        canvasDraw(A2ZTile[3][asciiCode],pos,wh)
                        pos = reXY(5+i*16,60+40*j)
                        canvasDraw(A2ZTile[4][asciiCode],pos,wh)
                    }
                })

                // let text =  Pad(IntToString(floor(max(previousPlayerPos.score,0))))
                // let wh = reXY(12,12)
                // for(var l=0;l<text.length;l++){
                //     let pos = reXY(10+l*upTileGap,56)
                //     canvasDraw(numberTile[3][text[l].charCodeAt(0)-48],pos,wh)
                //     pos = reXY(10+l*upTileGap-2,56-2)
                //     canvasDraw(numberTile[0][text[l].charCodeAt(0)-48],pos,wh)
                // }

                let text =  Pad(IntToString(floor(max(score,0))))
                let wh = reXY(12,12)
                for(var l=0;l<text.length;l++){
                    let pos = reXY(upTileGap+l*upTileGap,80)
                    canvasDraw(numberTile[3][text[l].charCodeAt(0)-48],pos,wh)
                    pos = reXY(upTileGap+l*upTileGap-2,80-2)
                    canvasDraw(numberTile[0][text[l].charCodeAt(0)-48],pos,wh)
                }

                canvasRestore()
                // Player start to move
                if(!notesObject.length){
                    movementIndex=1
                }
            }
        }else{
            PauseView.render(delta)
        }
    }
    // --------

    requestAnimationFrame(loop)
}


initial()

loop()

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
    if(x>halfW/2){
        touch(0)
        play(0)
    }else{
        play(1)
        touch(1)
    }
}

onblur=e=>{
    Pause = 1
    stopChord()
}
onfocus=e=>{
    Pause = 0
    keepPlayChord()
}

onmousedown=e=>{

    if(!e.button){
        // let x= e.clientX - mouseCanvas.left
        // ClickWindowToKeyIn(x)
        // console.log(x)
        if(previousPlayerPos!=null&&previousPlayerPos.lives<=0&&INKEYIN){
            initial()
            INKEYIN = 0
        }
    }
}

onmouseup=e=>{
    !e.button?key=InitailLoopDict(key,0):0
}

ontouchstart=e=>{

    var x = e.changedTouches[0].pageX;

    ClickWindowToKeyIn(x)

    if(previousPlayerPos!=null&&previousPlayerPos.lives<=0&&INKEYIN){
        INKEYIN = 0
        initial()
    }

}

ontouchend=e=>{
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

    if(i=='r'){
        INKEYIN = 0
        initial()
    }

    if(i=='p'&& INKEYIN){
        if(Pause){
            Pause = 0
            keepPlayChord()
        }else{
            Pause = 1
            stopChord()
        }
    }
}
onkeyup=e=>{

}

canvas.addEventListener('click',WaitClickPlayMusic)