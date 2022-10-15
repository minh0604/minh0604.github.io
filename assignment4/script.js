//make function when load window
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    /* console.log(ctx); */
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // I use particle system to break img to pixel
    class Particle {
        constructor(effect, x, y, color){
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = 0;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap; 
            //change the speed and distances
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.9; 
            this.friction = 0.9;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0;
        }   
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        // make the particle move
        update(){
            //find the distance of the mouse 
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;
            if(this.distance < this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            // particle come back at begining
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        warp(){
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease = 0.09; 
        }
    } 
    // to handle particle at the same time
    class Effect {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesAraay = [];
            this.image = document.getElementById('image1');
            //make the image to center of canvas
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.6;
            console.log(this.x,this.y)
            this.gap = 2;
            this.mouse = {
                radius: 1500,
                x: undefined, 
                y: undefined
            }
            // function for mouse move
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
                backGround.style.background = "transparent";
                backGround.style.transition = "4s";
            });
        }
        //push partical
        init(context){
            context.drawImage(this.image, this.x, this.y);
            // this content all positon and color in cavas
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            // loop
            for (let y = 0; y < this.height; y += this.gap){
                for(let x = 0; x < this.width; x += this.gap){
                    //if pixel have color --> apply one partical
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = 'rgb('+ red + ',' + green +',' + blue + ')';
                    if(alpha >0){
                        this.particlesAraay.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        draw(context){
            this.particlesAraay.forEach(particle => particle.draw(context));
            
        }
        update(){
            this.particlesAraay.forEach(particle => particle.update());
        }
        warp(){
            this.particlesAraay.forEach(particle => particle.warp());
        }
    }
    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    console.log(effect.particlesAraay);
    // to make animate and interactive
    function animate(){
        // clear canvas rect
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();
    //warp button
    const warpButton = document.getElementById('warpButton');
    // when hit button transparent of background = black
    const backGround = document.getElementById('canvas1')
    warpButton.addEventListener('click', function(){
        effect.warp();
        backGround.style.background = "black";   
        backGround.style.transition = "0.1s";     
    });
});



