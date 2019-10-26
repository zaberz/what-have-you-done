import Painter from './utils/painter';
import {getElementByXpath} from "./utils/xpath";

class FireEvent {
  constructor() {
  }

  init() {
  }

  loadEvents(e) {
    let Paint = new Painter(e.metadata);
    Paint.parseEvents(e.events);
    this.fireEvents(e);
  }

  fireEvents(e) {
    let typedEvent = {
      click: [],
      scroll: [],
    };
    e.events.forEach(event => {
      switch (event.type) {
        case 'click':
          typedEvent.click.push(event);
          break;
        case 'scroll':
          typedEvent.scroll.push(event);
          break;
      }
    });

    typedEvent.click.forEach(event => {
      let time = event.time;
      setTimeout(() => {
        this.fire(event);
      }, time);
    });

    typedEvent.scroll.forEach(event => {
      let startAt = event.from.time;
      let endAt = event.to.time;
      let totalTime = endAt - startAt;

      let dt = 20;
      setTimeout(() => {
        // todo change to requestAnimationFrame
        let startTime = +new Date();
        let timerId = setInterval(() => {
          let now = +new Date();

          if (now - startTime > totalTime) {
            clearInterval(timerId);
            return;
          }
          let dx = (event.to.x - event.from.x) / totalTime * (now - startTime);
          let dy = (event.to.y - event.from.y) / totalTime * (now - startTime);

          let sx = event.from.x + dx;
          let sy = event.from.y + dy;
          window.scrollTo(sx, sy);
        }, dt);
      }, startAt);
    });
  }

  fire(e) {
    switch (e.type) {
      case 'click':
        let elm = getElementByXpath(e.path);
        let clickEvent = new Event('click');
        elm.dispatchEvent(clickEvent);
        break;
    }
  }
}

export default new FireEvent();
