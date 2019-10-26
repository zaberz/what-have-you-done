class Painter {
  constructor(metadata) {
    let elm = document.createElement('canvas');
    this.width = elm.width = metadata.width;
    this.height = elm.height = metadata.height;

    elm.style.width = '100%';
    elm.style.height = '100%';
    // elm.style.background = 'rgba(0,0,0,0.2)';
    elm.style.position = 'fixed';
    elm.style.left = '0';
    elm.style.top = '0';
    elm.style.zIndex = '9999';
    document.body.append(elm);

    this.context = elm.getContext('2d');
    this.context.strokeStyle = 'red'
    this.context.lineWidth = 6;
    this.scene = [];
  }

  parseEvents(events) {
    events.forEach(event => {
      let time = event.time;
      setTimeout(() => {
        this.scene.push(event);
        this.draw();
        setTimeout(() => {
          this.scene.shift();
          this.draw();

        }, 300);
      }, time);
    });
  }

  draw() {
    let context = this.context;
    context.clearRect(0, 0, this.width, this.height);

    this.scene.forEach(event=> {
      this.drawClickEvent(event)
    })
  }

  drawClickEvent(event) {
    let context = this.context;
    context.beginPath();
    context.arc(event.x, event.y, 10, 0, Math.PI * 2);
    // context.fill();
    context.stroke();
    context.closePath();
  }
}

export default Painter;
