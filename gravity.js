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
  
function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

var canvas = document.querySelector("canvas");
var c=canvas.getContext("2d");
var mouse={
    x: innerWidth /2,
    y: innerHeight/2
};

var gravity=1;
var friction=0.89;


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.addEventListener("resize",e=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});
addEventListener("click",function(){
    init();
});
function Ball(x,y,dx,dy,radius,color){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
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
        if(this.y+this.radius + this.dy >canvas.height )
        {
            this.dy=-this.dy*friction;
        }
        else{
            this.dy +=gravity;
        }
        if(this.x +this.radius+this.dx > canvas.width || this.x-this.radius<=0){
            this.dx=-this.dx;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
    }
}
var ballArray=[];
function init(){
    ballArray=[];
    for(var i=0; i<400; i++){
        var radius=randomIntFromRange(8,20);
        var x=randomIntFromRange(radius,canvas.width-radius);
        var y=randomIntFromRange(0,canvas.height-radius);
        var dx=randomIntFromRange(-2,2);
        var dy=randomIntFromRange(-2,2);
        var color=randomColor(colors);
        ballArray.push(new Ball(x,y,dx,dy,radius,color));
    }
}
function animate(){
    requestAnimationFrame(animate);
    c.beginPath();
    c.clearRect(0,0,innerWidth,innerHeight);
    for (var i=0; i<ballArray.length; i++) {
        ballArray[i].update();
        
    }
}
init();
animate();
