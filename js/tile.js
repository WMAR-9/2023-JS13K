/*
 Basic function decode string to array to tile
*/

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

const backgroundTileColor = ['90ea8c', '6cdf69', 'a48652', '80b67e', '10740c', 'c0ad6c', '33944d']

// empty, little grass, grass, flower, circle place,path1, path2, 
// 0-3 , 
// 4-6 PATH
const backGround =  ['𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶','𦶶𶶶𶶶𶶶𶶴𶶦𶶶𶶶𶦶𶶶ප', '𶶶𶶶鶶𶶶𶱌𴦶𶉶𡎶𦶶𶶴බ','𶶶𶶶𶶞𳃶𞶶𶶶𶶶𶶶𶶞𳃶බ']
const pathTile = ['𮵳𬶶򭶥𵪒𪛕򛕶򒭵𦵪𶴭󵶮', '𞶶𜦶𬤤𕭭𭪭𭭭𬭭𭕭𤤦𳶜බ', '𶶶󤤞𭮤𬭭𭪭𭭭𭭕𤭭𤣤𶶶ƶ']

const playerColor = ['2d2d36', 'f2d55e', '4a4a56', '682921', '541b14', '666671', '272736', '000000']
const palyerTile = [
  "񊔩񊔩񊔩񊔩񊔩𱤩񊓆񊔩񊔩𩓉񉢥񊔩񊔩𩒦񉠥񊔩񊔩𩒦񉠡񊔩񊔩𩒦񉠥񊔩񊔩𩓆񉢥񊔩𲔩𠱤񉂃񊔩𚔩𡂃񉂄񊔩𘴩𨡄񉢥񊔩𘴩𨡆񉢥񊔩𡁩𸀆񉣧񊔩𡁣𨡆񊓅񊔩񈱣𱓆񊓅񊔩񊒄𱓉񊓅񊔩񊑣𱣉񊓆񊔩"
]


// 5 bits
const playStandMoveColor = ['242434', '2d2d36', 'f2d55e', '4a4a56', '5f5f6d', '682921', '541b14', '666671', '272736', '000000']
const player = [
  "񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𪥊𱣅񑣆񒥊𪥊𸱦񒃧񒥊𪥊𸱨񒃧񒥊𱕊񈐨񒄩񒥊𱕊𸱨񒤇񒥊𱕊񁴈񒤇񒥊𱒪񁴊񒤇񒥊𩒪񁴊񒤇񒥊񑣅񂄊񒤈񒥊",
  "񒥊񒥊񒥊񒥊񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𪥊𱣅񑣆񒥊𩕊𸱦񒃧񒥊𩕊𸱨񒃧񒥊𱢪񈐨񒄩񒥊𱢥𸱨񒤇񒥊񑒥񁴈񒤇񒥊񒣆񁴊񒤇񒥊񒥅񂄊񒤈񒥊",
  "񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𱕊𱣅񑣆񒥊𩥊𸱦񒃧񒥊𩒪𸱨񒃧񒥊񑣅񈐨񒄩񒥊񑣅𸱨񒤇񒥊񒢦񁴈񒤇񒥊񒢦񁴊񒤇񒥊񒥅񁴊񒤇񒥊񒥊񂄊񒤈񒥊",
  "񒥊񒥊񒥊񒥊񒥊񂅊񒤈񒥊񒥊𹴊񒃧񒥊񒥊𹳨񒁇񒥊񒥊𹳨񒁂񒥊񒥊𹳨񒁇񒥊񒥊𹴈񒃧񒥊񂥊𱒦񑣅񒥊𪥊𱣅񑣆񒥊𩕊𸱦񒃧񒥊𩕊𸱨񒃧񒥊𱢪񈐨񒄩񒥊𱢥𸱨񒤇񒥊񑒥񁴈񒤇񒥊񒣆񁴊񒤇񒥊񒢥񂄊񒤈񒥊",
  "񒥊񂥊񒄈񒥊񒥊𢅊񁂄񒥊񒥊𡄊񀢄񒥊񒥊𡄊񀡄񒥊񒥊𡄊񀢄񒥊񒥊𢂥񁂄񒥊𪥊𩢦񁒥񒥊𲥊𲄈񁣆񒥊𩕊𠱨񁢄񒥊𱢪𡁣񀂄񒥊񑓆񊔈񒄉񒥊񑢥𡁣񒂄񒥊񒣆񁂈񒂈񒥊񒣆񒂈񁄊񒥊񂥊񒤄𢅊񒥈񂥊񒤈񂥊񒥈",
]
const playUPColor=['44444c', '474751', '4a4a56', '54545d', '5a5a63', '666671', '682921', '722f26', '272736', '000000']
const playUp = [
  "񒥊񂄊񒤈񒥊񒥊𩒈񒂅񒥊񒥊𩒈񒂅񒥊񒥊𩑨񒂅񒥊񒥊𨱨񒂅񒥊񒥊𹳈񒃇񒥊񂥊𱳇񁣧񒥊𺅊𱳦񁳧񒥊𹴊𱳧𱳦񒥈𱳨𱳧𱳆񒤆𱣨𹳧𹳆񒄆𱣨𹳧𹣆񁣆𱤊񂄈𹳆񁣆񂅊񀀨𺄈񒃇񒥆񂄈񂂥񒤈񑥊񂥊񒄈񒥊",
  "񒥊񂄊񒤈񒥊񒥊𩒈񒁅񒥊񒥊𩒈񒁅񒥊񒥊𩒈񒁥񒥊񒥊𩒈񒁣񒥊񒥊𱳨񒃇񒥊񂥊𱣧񁳇񒥊𲅊𱳧𹣧񒥈𱤊𱳧𹣧񒄇𱤊𹳇𱣧񁳧𹣈𱣇𱳧񁳦𹣈𱣇𹳧񒃆𹤊񁣆𺄈񒃆񂅊񂄈񂄁񒥈񂥊񂂥񒤈񑥊񂥊񒄈𲥊⥊"
]

const playDoneColor = ['323e4f', 'dfc459', '4a4a56', '1a1a1a', '722f26', '666671', '595966', '5b231c', '272736', '000000']
const playDone = [
  [,,,,,,8,8,8,,,,,,,,,,,,,8,5,5,5,8,,,,,,,,,,,8,6,5,1,5,5,8,,,,,,,,,,8,6,1,1,1,6,8,,,,,,,,,,8,6,5,1,5,6,8,,,,,,,,,8,8,4,6,5,6,4,8,8,,,,,,,8,4,4,0,4,4,7,0,4,7,8,,,,,,8,4,0,0,6,6,5,0,4,4,4,8,,,,8,4,7,2,6,6,5,5,5,2,7,4,8,8,,8,4,4,7,6,6,5,5,5,5,6,7,7,4,4,8,8,4,7,7,6,3,3,3,3,3,6,7,7,7,4,8,8,7,7,7,7,6,6,6,6,6,6,7,7,7,4,8,,8,7,7,7,5,6,7,6,5,7,7,7,7,7,8,,,8,8,8,5,2,8,6,5,8,7,7,7,8,,,,,,,8,8,8,2,5,,8,8,8,8,,,,,,,,,,8,8,,,,,,],
  [,,,,,,8,8,8,,,,,,,,,,,,,8,5,5,5,8,,,,,,,,,,,8,5,5,1,5,6,8,,,,,,,,,,8,6,1,1,1,6,8,,,,,,,,,,8,6,5,1,5,6,8,,,,,,,,,8,8,4,6,5,6,4,8,8,,,,,,,8,7,4,0,4,4,7,0,4,4,8,,,,,,8,4,4,0,5,6,6,0,0,7,4,8,,,,8,4,4,2,5,5,5,6,6,2,7,4,4,8,,,8,4,4,6,5,5,5,5,6,6,7,7,4,4,8,8,4,4,7,6,3,3,3,3,3,6,7,7,4,4,8,8,4,7,7,6,6,6,6,6,6,7,7,7,7,8,,8,7,7,7,7,5,6,7,6,5,7,7,7,8,,,,8,7,7,8,5,6,8,2,5,8,8,8,,,,,,8,8,8,5,2,8,8,8,,,,,,,,,,,,8,8,,,,,,,,,]
]

// 3 bits
const spiderColor = ['a82413', 'c82a15', 'b42310', '2a2a2a', '272736', '1f1f1f', '000000']
const spider = [
  "𿿿𿻿𧿿🿼𿿿𧼿𧻿𿿼󼿿𤿧󟿿鈸𼧭󣿟𭭯𿟿򭫭𿭍𭭿򒕭𯿽򭭭󿪒𫭿𩩭𻿽𯜟𿭭𻟿𭼼𿤽🧿𤿧𿧿𿟼𿿤𿤿𿻿𿿿𿿿𿿟ǿ",
  "𿿿𿟿𿿿󿿿𿿿𼧿𤻿𿿼🧼𧿧𿿼𼼿𧽭𛟼𭯜󿿭𭝯𭕅𭿿򕭭𿽒𭭯銭𻿽񭫭𿭍󧫿𭭯𿿿𼼧𧽭𼿼𿧟𿼧󿿤𿤧𿿿𻿿𿿿𿿿𿟿࿿"
]
const rightAndLeftColor =['1c1c39', '606070', 'ed9829', 'f3d748', '43434f', '000000']
const rightAndLeft = [
  "𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶒤𶶶󡦶𶶒񦶶𒛌𶶶󉡦𶒛񤶶򛛉𶶶󙉤𶲛񡦶𒛙𶶶󙡦𶶒񦶶𶒜𶶶򔦶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶",
  "𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶򶶶𶴢𶶶񣒶𶶴󒶶𴌋򶶶􉛚𶶡󛚶𴡉󖶶􉋛𶶴񛚖𶡡򖶶𡡛𶶶𚖶𶴌𶶶𤒶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶",
]

// 4 bits
const snakeColor = ['33190c', '42200f', '060301', 'c92b22', '150a05', '241108', '7c3613', '672f14', '512813', '000000']
const snake = [
  "򪪪򪪪򪪪򪪪򪪪򪪪򊪪򪪇򪪪򊪪򨢃򪪪򪪪񶡨򪪨򪪪򊪪򪞈򪪪򪪪񸡺򪪪򪪪񷚪򪪧򪪪񷪪򪪧򪪪򇚪򪩸򪪪򇢪򪪨򪪪񧢪򪪪򇞆򈪨򊪧񨞆򪆈򈞈񄡦򩥄񨢪𢖆򥐅򪪪񕖪򪪪\n",
  "򪪪򪪪򪪪񺪪򨝨򪪪򊪪򈢈򪪧򪪪񺜶򪩸򪪪򪡺򪢈򪪪򪪪򧝶򪪪򪪪򧝺򪪪򪪪񷝺򪪪򪪪򨡪򪪪򪪪򨞊񸪪򪪇򦞊񶪪򈡨񸢪򇢪򊪇򊪨񨙸򪪨򪪇򈢊򆞪򪪈򪪪򈢪򪪨򪪪򨢊򪪪\n",
]

const scorpionColor = ['8a2214', '606070', '50505e', '3f3f4a', '232329', '343448', '43434f', '000000']
const scorpion = [
  [,,,,,,6,6,4,6,6,4,,,,,,,,,,6,6,6,,6,6,4,6,6,,,,,,,,6,6,,,,4,6,6,4,4,,,,,,,,6,6,,,,,,6,6,6,,,,,,,,,,,,,4,6,6,6,,,,,,,,,3,3,,6,6,4,6,,,5,5,5,5,,,2,2,6,6,4,6,6,,,5,5,5,5,5,,1,1,4,6,6,6,4,,,,5,,,5,4,1,6,6,6,4,6,3,3,3,,,,5,,5,5,0,6,6,6,6,2,2,,3,,,,5,5,5,,4,,6,6,5,1,2,2,3,,,,,,,,,4,0,6,4,1,1,2,3,,,,,,,,5,5,5,,5,,1,2,,,,,,,,5,5,5,5,5,4,,,,,,,,,,,5,,,5,5,5,,,,,,,,,,,,5,5,5,5,,,,,,,],
  [,,,,,,,6,6,4,6,6,4,,,,,,,,,,6,6,6,,6,4,4,6,,,,,,,,,6,6,,,,,4,6,,,,,,,,,,6,6,,,,,4,4,,,,,,,,,,,,,,,6,6,6,,,,,,,,,,,,,4,6,6,6,,,,,,,,,3,3,,6,6,4,6,,,5,5,5,5,,,2,2,6,6,4,6,6,,,5,5,5,5,5,,1,1,4,6,6,6,4,,,,5,,,5,4,0,6,6,6,4,6,3,3,,,,,5,,5,5,4,6,6,6,6,2,2,3,3,,,,5,5,5,,,4,0,6,5,1,2,2,3,,,,,,,5,5,5,,6,4,1,1,2,3,,,,,,5,5,5,5,5,4,5,,1,2,,,,,,,5,,,5,5,5,,,,,,,,,,,,5,5,5,5,,,,,,,,]
]


const turtleColor = ['421d0b', '032715', 'd86538', 'e77b50', '672f14', '268354', '187144', 'ff9166', '073d22', '000000']
const turtle =[
  [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8,8,5,5,8,8,,,,,,,,,8,5,6,8,6,6,5,6,8,5,,,,,,5,8,6,6,8,8,8,5,6,8,6,6,,,,5,5,8,8,8,5,6,8,8,8,8,8,8,8,,,8,8,6,5,8,7,7,7,7,6,6,8,5,8,,8,8,8,6,6,7,7,7,7,7,7,5,8,6,6,8,8,5,5,8,7,7,7,7,7,7,7,7,8,8,8,8,4,5,6,8,7,7,9,7,7,9,7,7,5,5,8,4,,4,8,8,6,7,7,7,7,7,7,6,6,6,4,,,,4,4,8,4,7,7,7,7,4,8,8,4,,,,,,4,4,4,0,0,0,0,4,4,4,,,,,,,7,7,2,,,,,2,7,7,,,,,,,3,2,,,,,,,2,3,,,,,,,,,,,,,,,,,,,],
  [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8,8,8,6,5,8,,,,,,,,,8,8,6,5,8,6,6,8,8,8,5,,,,,5,5,8,6,7,7,7,7,8,6,5,8,,,,8,6,6,8,7,7,7,7,7,7,6,6,8,5,,6,6,8,8,7,7,9,7,7,9,7,7,5,8,6,8,6,8,8,5,7,7,7,7,7,7,7,7,8,8,6,6,8,6,6,5,3,7,7,7,7,7,7,3,6,6,8,8,4,5,6,8,4,4,3,7,7,3,4,4,5,6,8,4,,4,4,4,1,1,1,3,3,1,1,1,4,4,4,,,,,7,7,3,8,8,8,8,3,7,7,,,,,,,7,7,2,,,,,2,7,7,,,,,,,3,2,,,,,,,2,3,,,,,,,,,,,,,,,,,,,]
]


// font color
const fontColor = ["fff","000"]
// number 2-9
const numberTile= tiles(['񚙖񩖙ɖ', '򥚚򦪚ŕ', '񪙖򩩚ŕ', '񪙖񪙚ɖ', '򚙦򚥕ɪ', '򪙖񪩖ɖ', '򪙖񪙕ɖ', '񪕕񪦩Ʀ', '񪙖񪙖ɖ', '񪙖񪥖ɖ'],2,fontColor,5)
// font A - Z
const A2ZTile = tiles(['򙪚񕖩Ʃ', '񪙕񪙕ɕ', '񪙖񪚩ɖ', '񪙕񪖩ɕ', '򪕖򪕕Ŗ', '򪕖򪙕ʩ', '򪕖񪕙ɖ', '񪖩񪕕Ʃ', '񦙖񦚚ɖ', '񦩕򦚚ʕ', '򙦥򙪖ƥ', '򩚩򕚥ŕ', '񙖩񦖙Ʃ', '񩖩񚖙Ʃ', '񩙖񚖙ɖ', '񪙕򦙕ɩ', '񩙕򩙕ʩ', '񚕖񚥖ƪ', '򪕖񪩖ɕ', '񦕕򦚚ƚ', '񪖩񪖩ɖ', '񪖩򙦩ʚ', '񦖩񙖙Ʃ', '򙦩򙪚Ʃ', '񪖩򦩖ƙ', '򚥕򩪚ŕ'],2,fontColor,5)

