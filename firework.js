var canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
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

let mouse={
    x: innerWidth /2,
    y: innerHeight/2
};
window.addEventListener("resize",e=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    init();
});
addEventListener("mousemove",e=>{
    mouse.x=event.clientX;
    mouse.y=event.clientY;
});
const gravity=0.005;
const friction=0.99;

function Particle(x,y,radius,color,velocity){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.velocity=velocity;
    this.alpha=1;   
    this.draw=function(){
        c.save();
        c.globalAlpha=this.alpha;
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
        c.restore();
    }
    this.update=function(){
        this.draw();
        this.velocity.x *=friction;
        this.velocity.y *=friction;
        this.velocity.y +=gravity;
        this.x +=this.velocity.x;
        this.y+=this.velocity.y;
        this.alpha -=0.005;
    }
}
let particles;
function init(){
    particles=[];
}
function animate(){
    requestAnimationFrame(animate);
    c.beginPath();
    c.fillStyle="rgba(0,0,0,0.05)";
    c.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((particle,i) => {
        if(particle.alpha>0){
           particle.update();
        }else{
            particles.splice(i,1);
        }
    });
}
init();
animate();
addEventListener("click", (e)=>{
    mouse.x=e.clientX;
    mouse.y=e.clientY;

    const particleCount=400;
    const angleIncrement=Math.PI*2/particleCount;
    const power=40;

    for(let i=0; i <particleCount; i++){
        particles.push(new Particle(mouse.x,mouse.y
            ,3,`hsl(${Math.random()*360},50%,50%)`
            ,{x:Math.cos(angleIncrement*i)*Math.random()*power,
            y:Math.sin(angleIncrement*i)*Math.random()*power
            })
            );
    }
});


