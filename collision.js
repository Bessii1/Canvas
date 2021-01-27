var colors=[
    "#2185C5",
    "#7ECEFD",
    "#FFF6E5",
    "#FF7F66"
];
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}
  
function getDistance(x1, y1, x2, y2) {
    let xDist = x2 - x1
    let yDist =  y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

var canvas = document.querySelector("canvas");
var c=canvas.getContext("2d");

var mouse={
    x: innerWidth /2,
    y: innerHeight/2
};

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener("resize",e=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});
addEventListener("mousemove",e=>{
    mouse.x=event.clientX;
    mouse.y=event.clientY;
});


function Circle(x,y,radius,color){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }
    this.update=function(){
        this.draw();
    }
}
let circle1;
let circle2;
function init(){
    circle1=new Circle(300,300,100,"black");
    circle2=new Circle(undefined,undefined,30,"red");
}
function animate(){
    requestAnimationFrame(animate);
    c.beginPath();
    c.clearRect(0,0,canvas.width,canvas.height);
   circle1.update();

   circle2.x=mouse.x;
   circle2.y=mouse.y;
   circle2.update();
   if (getDistance(circle1.x,circle1.y,circle2.x,circle2.y)<circle1.radius+circle2.radius)
    {
        circle1.color="red";
    }
    else{
        circle1.color="black";
    }
}
init();
animate();
