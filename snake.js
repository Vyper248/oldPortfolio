(function(){
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
    ctx.strokeStyle = '#FF0000';
    //ctx.fillStyle = "#FF0000";
    const segments = [];

    let mouseX = 0;
    let mouseY = 0;
    //body.addEventListener('mousemove', function(e){
    //    mouseX = e.clientX;
    //    mouseY = e.clientY;
    //});

    function moveSegments(){
        segments.forEach(segment => {
            segment.move();
        });
    }

    function draw(){
        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(segments[0].x, segments[0].y);
        for (let i = 1; i < segments.length; i++){
            ctx.lineTo(segments[i].x2, segments[i].y2);
        }

        for (let i = segments.length-1; i > 1; i--){
            ctx.lineTo(segments[i].x1, segments[i].y1);
        }

        ctx.lineTo(segments[0].x, segments[0].y);

        ctx.stroke();
        ctx.fill();

        segments.forEach(segment => {
            segment.draw();
        });

    //    ctx.moveTo(segments[0].x, segments[0].y);
    //    ctx.bezierCurveTo(segments[parseInt(segments.length/3)].x, segments[parseInt(segments.length/3)].y,
    //                     segments[parseInt(segments.length/3)*2].x, segments[parseInt(segments.length/3)*2].y,
    //                     segments[segments.length-1].x, segments[segments.length-1].y);

        ctx.stroke();

    }

    class Segment {
        constructor(parent = null){
            this.parent = parent;

            this.speed = 10;

            this.x = 200;
            this.y = 200;
            this.r = 0;
            this.w = 5;

            this.prevX = 200;
            this.prevY = 200;
            this.prevR = 0;

            this.x1 = 0;
            this.y1 = 0;
            this.x2 = 0;
            this.y2 = 0;
        }

        setPos(x,y){
            this.prevX = this.x;
            this.prevY = this.y;
            this.x = x;
            this.y = y;
        }

        setAngle(angle){
            if (angle > 360) angle = angle - 360;
            if (angle < 0) angle = 360 - angle;
            this.prevR = this.r;
            this.r = angle;
        }

        addPos(x,y){
            this.setPos(this.x + x, this.y + y);
        }

        draw(){
            [this.x1,this.y1] = this.rotatePoint(this.x-this.w, this.y+this.w);
            [this.x2,this.y2] = this.rotatePoint(this.x-this.w, this.y-this.w);        
        }

        rotatePoint(x, y){
            const zeroX = x - this.x;
            const zeroY = y - this.y;
            const angle = Math.PI / 180 * this.r;
            const newX = zeroX * Math.cos(angle) - zeroY * Math.sin(angle);
            const newY = zeroY * Math.cos(angle) + zeroX * Math.sin(angle);
            return [-newX+this.x, -newY+this.y];
        }

        move(){
            if (this.parent === null){
                const diffX = mouseX - this.x;
                const diffY = mouseY - this.y;
                let angle = ((Math.atan2(diffY, diffX)) / Math.PI * 180);
                if(angle < 0){
                    angle = 360 - (-angle);
                }

                this.setAngle(this.r+closestAngleDirection(this.r, angle));

                const x = Math.cos(Math.PI / 180 * this.r) * this.speed;
                const y = Math.sin(Math.PI / 180 * this.r) * this.speed;
                this.addPos(x, y);
            } else {
                this.setPos(this.parent.prevX, this.parent.prevY);
                this.setAngle(this.parent.prevR);
            }
        }
    }

    function closestAngleDirection(a1, a2){
        //a1 = current angle
        //a2 = angle want to get to
        let diffLeft, diffRight;
        if (a1 <= a2){
            diffLeft = 360-a2+a1;
            diffRight = a2 - a1;
        } else {
            diffLeft = a1 - a2;
            diffRight = 360-a1+a2;
        }

        if (diffLeft < 15 && diffLeft > -10) return 0;
        if (diffRight < 15 && diffRight > -10) return 0;
        if (diffLeft < diffRight) return -5;
        else return 5;
    }

    function createSegments(){
        let main = new Segment();
        segments.push(main);
        let prevSegment = main;
        for (let i = 0; i < 50; i++){
            let child = new Segment(prevSegment);
            prevSegment = child;
            segments.push(child);
        }
    }

    createSegments();

    segments[0].rotatePoint(220,220);

    setInterval(()=>{
        moveSegments();
        draw();
    },30);

    setInterval(()=>{
        mouseX = Math.random()*window.innerWidth;
        mouseY = Math.random()*window.innerHeight;
    },2);
})();