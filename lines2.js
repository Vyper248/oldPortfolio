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
ctx.strokeStyle = '#770000';
ctx.lineWidth = 0.5;

const dots = [];

class Dot {
    constructor(){
        this.x = this.randX();
        this.y = this.randY();

        [this.vectorX, this.vectorY] = this.rotatePoint(0,1);

        this.speed = Math.random()*5;
    }

    move(){
        this.x += this.vectorX*this.speed;
        this.y += this.vectorY*this.speed;
        
        if (this.x < -300) this.x = window.innerWidth+300;
        if (this.x > window.innerWidth+300) this.x = -300;
        
        if (this.y < -300) this.y = window.innerHeight+300;
        if (this.y > window.innerHeight+300) this.y = -300;
    }

    updateDirection(){
        [this.vectorX, this.vectorY] = this.rotatePoint(0,1);
        this.speed = Math.random()*5;
    }

    draw(){
        this.move();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x,this.y,2,0,2*Math.PI);

        dots.forEach(dot=>{
            if (dot !== this){
                const dist = this.getDistance(this, dot);
                if (dist < 300){
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(dot.x, dot.y);
                }
            }
        });
    }
    
    rotatePoint(x, y){
        const angle = Math.PI / 180 * (Math.random()*360);
        const newX = x * Math.cos(angle) - y * Math.sin(angle);
        const newY = y * Math.cos(angle) + x * Math.sin(angle);
        return [-newX, -newY];
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
    ctx.beginPath();
    dots.forEach(dot => dot.draw());
    ctx.stroke();
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
    dots.forEach(dot => dot.updateDirection());
}, 10000);