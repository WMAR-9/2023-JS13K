const backgroundTileColor = ['#90ea8c', '#6cdf69', '#a48652', '#80b67e', '#10740c', '#c0ad6c', '#33944d']
// empty, little grass, grass, flower, circle place,path1, path2, 
// 0-3 , 
// 4-6 PATH
const backGround =  ['𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶𶶶','𦶶𶶶𶶶𶶶𶶴𶶦𶶶𶶶𶦶𶶶ප', '𶶶𶶶鶶𶶶𶱌𴦶𶉶𡎶𦶶𶶴බ','𶶶𶶶𶶞𳃶𞶶𶶶𶶶𶶶𶶞𳃶බ']
const pathTile = ['𮵳𬶶򭶥𵪒𪛕򛕶򒭵𦵪𶴭󵶮', '𞶶𜦶𬤤𕭭𭪭𭭭𬭭𭕭𤤦𳶜බ', '𶶶󤤞𭮤𬭭𭪭𭭭𭭕𤭭𤣤𶶶ƶ']

const playerColor = ['#2d2d36', '#f2d55e', '#4a4a56', '#682921', '#541b14', '#666671', '#272736', '#000000']
const palyerTile = [
  "񊔩񊔩񊔩񊔩񊔩𱤩񊓆񊔩񊔩𩓉񉢥񊔩񊔩𩒦񉠥񊔩񊔩𩒦񉠡񊔩񊔩𩒦񉠥񊔩񊔩𩓆񉢥񊔩𲔩𠱤񉂃񊔩𚔩𡂃񉂄񊔩𘴩𨡄񉢥񊔩𘴩𨡆񉢥񊔩𡁩𸀆񉣧񊔩𡁣𨡆񊓅񊔩񈱣𱓆񊓅񊔩񊒄𱓉񊓅񊔩񊑣𱣉񊓆񊔩"
]

const tiles = (a,bit,color,w)=>{
    const b = []
    a.forEach(e=>{
        b.push(tilePng(e,bit,color,w))
    })
    return b
}

const tilePng = (item,bit,color,w) =>{
    arr = string2Array(item,bit)
    var b = doc.createElement('canvas')
    var ctx1 = getContext(b)

    const size = 16

    const widthSize = w*size
    b.width = widthSize
    b.height = widthSize

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < w; j++) {
        const value = arr[i* w + j];
        const x = j * size;
        const y = i * size;
        
        ctx1.fillStyle = value<color.length?color[value]:"rgba(0,0,0,0)"
        ctx1.fillRect(x, y, size, size);
      }
    }

    let basicImage = createImg();
    basicImage.src = toPng(b);
    return basicImage;
}

// Rotate Frame
function rotateImage(image, angle) {

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