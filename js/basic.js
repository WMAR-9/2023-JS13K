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
const clone = a =>{
    if (a === null || typeof a !== 'object') {
        return a;
    }
    const b = Array.isArray(a)?[]:{};
    for (let key in a) {
        b[key] = clone(a[key]);
    }
    return b;
}
const distance=(a,b)=>math.hypot(a,b);
const removeItem = (a,b)=>a.filter(e=>e!=b)
const appendItem = (a,b)=>(a.push(b),a)

