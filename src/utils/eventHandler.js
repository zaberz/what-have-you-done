import getXPath from './xpath';

export function clickHandler(e) {
  let {clientX, clientY, target} = e;
  let xpath = getXPath(target);

  return {
    type: 'click',
    x: clientX,
    y: clientY,
    path: xpath
  };
}

export function scrollHandler(e) {

}

export default {};
