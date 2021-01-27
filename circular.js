var canvas=document.querySelector("canvas");

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

var c=canvas.getContext("2d");
var mouse={
    x: innerWidth /2,
    y: innerHeight/2
};
var colors=[
    "#00bdff",
    "#4d39ce",
    "#088eff"
];
addEventListener("mousemove",e=>{
    mouse.x=event.clientX;
    mouse.y=event.clientY;
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}
  
function distance(x1, y1, x2, y2) {
    let xDist = x2 - x1
    let yDist =  y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

window.addEventListener("resize",e=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});

function Particle(x,y,radius,color){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.radians=Math.random()*Math.PI*2;
    this.velocity=0.05;
    this.distanceC=randomIntFromRange(50,120);
    this.lastMouse = {x:x,y:y};
    
    this.update = () => {
        const lastPoint={x: this.x, y: this.y}
        ;
        //move points over time
        this.radians += this.velocity;

        //Drag Eff
        this.lastMouse.x += (mouse.x- this.lastMouse.x)*0.05;
        this.lastMouse.y += (mouse.y- this.lastMouse.y)*0.05;


        //Circular motion
        this.x = this.lastMouse.x+Math.cos(this.radians)*this.distanceC;
        this.y = this.lastMouse.y + Math.sin(this.radians)*this.distanceC;
        this.draw(lastPoint);
    }
    this.draw= lastPoint =>{
        c.beginPath();
        c.strokeStyle=this.color;
        c.lineWidth=this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    }
    
}

let particles;
function init(){
  particles=[];
  for (let i = 0; i < 50; i++) {
    const radius=(Math.random()*2)+1;
    particles.push(new Particle(canvas.width/2,canvas.height/2,radius,randomColor(colors)));
  }
}
function animate(){
    requestAnimationFrame(animate);
    c.beginPath();
    c.fillStyle="rgba(255,255,255,0.05)";
    c.fillRect(0,0,canvas.width,canvas.height);
   for(let i=0;i<particles.length; i++){
       particles[i].update();
   }
}
init();
animate();