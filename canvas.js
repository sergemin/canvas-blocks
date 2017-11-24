;(function() {
    let canvas = document.getElementById('canvas'),
        c = canvas.getContext('2d'),
        canvasWidth = canvas.width,
        canvasHeight = canvas.height;
    function Circle(x,y,dx,dy,radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.drawCircle = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            c.strokeStyle = 'pink';
            c.fill();
            c.stroke();
        }
        this.updateCircle = function() {
            if(this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if(this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.x += this.dx;
            this.y += this.dy;

            this.drawCircle();
        }
    }
    let circleArray = [];
    for(let i=0; i<100; i++) {
        let radius = 25,
            x = Math.random()*(canvasWidth - radius*2) + radius,
            y = Math.random()*(canvasHeight - radius*2) + radius,
            dx = (Math.random()-0.5)*3,
            dy = (Math.random()-0.5)*3;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
    function animateCircles() {
        requestAnimationFrame(animateCircles);
        c.clearRect(0,0, canvasWidth, canvasHeight);
        for(let i=0; i<circleArray.length; i++) {
            circleArray[i].updateCircle();
        }
    }
    animateCircles();
})();