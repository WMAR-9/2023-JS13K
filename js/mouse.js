onkeydown=e=>{
    const i = e.which;
    const keyButton=[1,37,38,39,40,32];
    KeyEvent=keyButton.indexOf(i)?1:0;
    KeyIn[i]=i;
}
onkeyup=e=>{
  let i = e.which
  KeyIn[i]=0;
  KeyEvent=KeyIn.some(e=>e!=0)?1:0;
//   if(i==67){
//       GameWorldInit(++PlayerConfig.Level)
//   }
}