const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const events = fs.readFileSync(path.resolve(__dirname, 'log'), 'utf8');
let a = JSON.parse(events);
(async () => {
  console.log(a);
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();
  let {location, width, height} = a.metadata
  console.log(height);
  await page.setViewport({ width, height });
  await page.goto(location);


  const document = await page.evaluateHandle('document');
  const body = await page.$('body');
  const b = await page.evaluate((body, document, metadata) => {
    let elm = document.createElement('canvas');
    elm.style.width = '100%';
    elm.style.height = '100%';
    elm.style.background = 'rgba(0,0,0,0.2)';
    elm.style.position = 'absolute';
    elm.style.left = '0';
    elm.style.top = '0';
    elm.style.zIndex = '9999';
    body.append(elm);
    let {location, width, height} = metadata

    elm.width = width
    elm.height = height
    let context = elm.getContext('2d');
    context.rect(0, 0, 100, 100);
    context.fill();
    context.stroke();

    return body.innerHTML;
  }, body, document, a.metadata);
  console.log(b);
  // let context = await page.mainFrame().executionContext();
  // let ahandler = await context.evaluateHandle(()=> Promise.resolve(self))
  // console.log(ahandler);
  console.log(1);
})();
