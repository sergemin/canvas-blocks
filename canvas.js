;(function() {
    let canvas = document.getElementById('canvas'),
        c = canvas.getContext('2d'),
        canvasWidth = document.documentElement.clientWidth,
        canvasHeight = 400;
    let mousePosition = {
        x: undefined,
        y: undefined
    };
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let maxRadius = 40;
    //let minRadius = 10;
    let colorArray = [
        '#cc55aa',
        '#56ac54',
        '#a8fcd4',
        '#18facc'
    ]
    canvas.addEventListener('mousemove', function(e) {
        mousePosition.x = e.offsetX;
        mousePosition.y = e.offsetY;
    });
    window.addEventListener('resize', function() {
        init();
    })
    function Circle(x,y,dx,dy,radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

        this.drawCircle = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            c.fillStyle = this.color;
            c.fill();
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

            //interactivity
            if(mousePosition.x - this.x < 50 && mousePosition.x -this.x > -50 && mousePosition.y - this.y < 50 && mousePosition.y -this.y > -50) {
                if(this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if(this.radius > this.minRadius) {
                this.radius -= 1;
            }
            this.drawCircle();
        }
    }
    let circleArray = [];
    function init() {
        circleArray = [];
        for(let i=0; i<400; i++) {
            let radius = Math.floor(Math.random()*5 +1),
                x = Math.random()*(canvasWidth - radius*2) + radius,
                y = Math.random()*(canvasHeight - radius*2) + radius,
                dx = (Math.random()-0.5)*3,
                dy = (Math.random()-0.5)*3;
            circleArray.push(new Circle(x,y,dx,dy,radius));
        }
    }
    function animateCircles() {
        requestAnimationFrame(animateCircles);
        c.clearRect(0,0, canvasWidth, canvasHeight);
        for(let i=0; i<circleArray.length; i++) {
            circleArray[i].updateCircle();
        }
    }
    init();
    animateCircles();
})();