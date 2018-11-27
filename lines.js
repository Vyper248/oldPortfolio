const body = document.querySelector('body');

const canvas = document.createElement('canvas');
canvas.setAttribute('width', window.innerWidth-2+'px');
canvas.setAttribute('height', window.innerHeight-2+'px');
canvas.style.position = 'absolute';
canvas.style.top = '0px';
canvas.style.left = '0px';
canvas.style.zIndex = '-1';
body.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#660000';
ctx.lineWidth = 0.2;

const dots = [];

class Dot {
    constructor(){
        this.x = this.randX();
        this.y = this.randY();

        this.targetX = this.randX();
        this.targetY = this.randY();

        this.speed = Math.random()*5;
    }

    move(){
        const diffX = this.targetX - this.x;
        const diffY = this.targetY - this.y;
        const length = Math.sqrt(diffX**2 + diffY**2);
        
        if (length < 5) return;

        const normalX = diffX / length;
        const normalY = diffY / length;

        this.x += normalX*this.speed;
        this.y += normalY*this.speed;
    }

    updateTarget(){
        this.targetX = this.randX();
        this.targetY = this.randY();
    }

    draw(){
        this.move();
        ctx.beginPath();
        ctx.arc(this.x,this.y,2,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();

        dots.forEach(dot=>{
            if (dot !== this){
                if (this.getDistance(this, dot) < 300){
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(dot.x, dot.y);
                    ctx.stroke();
                }
            }
        });
    }
    
    randX(){
        return (Math.random()*(window.innerWidth*1.5))-window.innerWidth/4;
    }
    
    randY(){
        return (Math.random()*(window.innerHeight*1.5))-window.innerHeight/4;
    }

    getDistance(a,b){
        const diffX = a.x - b.x;
        const diffY = a.y - b.y;
        const length = Math.sqrt(diffX**2 + diffY**2);
        return length;
    }
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    dots.forEach(dot => dot.draw());
}

function createDots(){
    const area = window.innerWidth * window.innerHeight;
    const number = area / 32768;
    if (number < 30) number = 30;
    for (let i = 0; i < number; i++){
        let dot = new Dot();
        dots.push(dot);
    }
}

createDots();
setInterval(draw, 30);
setInterval(()=>{
    dots.forEach(dot => dot.updateTarget());
}, 10000);