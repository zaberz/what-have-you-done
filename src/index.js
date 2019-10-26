import {clickHandler, scrollHandler} from './utils/eventHandler';
import {throttle, debounce} from 'lodash-es';

scrollHandler();

class WHTD {
  constructor() {
    this.startAt = +new Date();
    this.url = '';
    this._initEvent();

    this.metaData = null;
    this.events = [];
  }


  init(url, option) {
    this.url = url;
    let location = window.location.href;
    // let width = document.body.clientWidth;
    // let height = document.body.clientHeight;
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.metaData = {
      location,
      width,
      height
    };
  }

  _initEvent() {
    document.addEventListener('click', this._handler.bind(this));
    document.addEventListener('touchstart', this._handler.bind(this));
    document.addEventListener('touchend', this._handler.bind(this));
    document.addEventListener('scroll', debounce(this._scrollHandler().bind(this), 300, {leading: true}));
    window.addEventListener('beforeunload', this.save.bind(this));
  }

  _handler(e) {
    let now = +new Date();
    let time = now - this.startAt;
    switch (e.type) {
      case 'click':
        let event = clickHandler(e);
        event.time = time;
        this.events.push(event);
        break;
      case 'scroll':
        console.log(e);
        break;
      default:
        console.log(4);
        break;
    }
  }

  _scrollHandler(e) {
    let hasStart = false;

    let startInfo = {
    };
    let endInfo = {
    };
    return function (e) {
      if (!hasStart) {
        hasStart = true;
        startInfo = {
          time: +new Date() - this.startAt,
          x: document.documentElement.scrollLeft,
          y: document.documentElement.scrollTop
        };
      } else {
        hasStart = false;
        endInfo = {
          time: +new Date() - this.startAt,
          x: document.documentElement.scrollLeft,
          y: document.documentElement.scrollTop
        };
        let event = {
          path: '',
          type: 'scroll',
          from: startInfo,
          to: endInfo
        };
        this.events.push(event);
      }
      console.log(this);
    };
  }

  save() {
    if (navigator.sendBeacon) {
      let data = {
        metadata: this.metaData,
        events: this.events
      };

      let result = navigator.sendBeacon(this.url, JSON.stringify(data));
      if (result) {
        console.log('Successfully queued!');
      } else {
        console.log('Failure.');
      }
    } else {
      // 回退到xmlhttprequest
    }
  }

  export() {
  }

  send() {
  }
}


export default new WHTD();
