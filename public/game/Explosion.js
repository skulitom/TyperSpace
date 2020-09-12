class Explosion {
    constructor(x, y, color, startSize) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.time = 0;
        this.startSize = startSize + startSize * startSize * 0.08;
    }

    update = () => {
        const dt = 0.1;
        this.time = this.time + dt;
        if (this.time > 0.8) {
            return true;    
        }

        return false;
    };

    draw = () => {
        const size = sqrt(this.startSize * this.time * 100);
        if(this.color) {
            fill(this.color.r, this.color.g, this.color.b);
        } else {
            fill(255,0,0);
        }
        circle(this.x, this.y, size);
    };
  
}