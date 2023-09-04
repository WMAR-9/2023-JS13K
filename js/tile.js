const backgroundTileColor = [
    "#8de6d9",
    "#52b94e",
    "#a48652",
    "#6cdf69",
    "#10740c",
    "#c0ad6c",
    "#33944d"
]
// empty, little grass, gras, path1, path2, circle path
const backGround = ['𦶶𶶶𶶶𶶶𶶴𶶦𶶶𶶶𶦶𶶶ප', '𶶶𶶶𛶶𶶶𶳜𴦶𶛶𣞶𦶶𶶴බ', '𱶶𶶱𦶎𶶶𴴮𥬴򭥥𭭭𭭭-', '𶶶𶶶𶞶𛶶𶶴𦥶𭦦𬬬𭭭𭕕୭', '𭭦𬳥𶴭𥭮𭬶𬴴𥴭𥪭𕕭򪭭ŕ']


const createPath = (item,bit,color,w) =>{
    arr = string2Array(item,bit)

    var b = doc.createElement('canvas')
    var ctx1 = getContext(b)

    const size = 8

    const widthSize = w*size
    b.width = widthSize
    b.height = widthSize

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < w; j++) {
        const value = arr[i* w + j];
        const x = j * size;
        const y = i * size;
        
        ctx1.fillStyle = color[value]
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