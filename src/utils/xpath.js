export function getXpathByElement(element) {
  if (element.id !== "") {
    //判断id属性，如果这个元素有id，则显 示//*[@id="xPath"] 形式内容
    return '//*[@id=\"' + element.id + '\"]';
  }
  // 这里需要需要主要字符串转译问题，可参考js 动态生成html时字符串和变量转译（注意引号的作用）
  if (element === document.body) {
    //递归到body处，结束递归
    return '/html/' + element.tagName.toLowerCase();
  }
  let ix = 1;//在nodelist中的位置，且每次点击初始化
  let siblings = element.parentNode.childNodes;//同级的子元素
  for (let i = 0, l = siblings.length; i < l; i++) {
    let sibling = siblings[i]; //如果这个元素是siblings数组中的元素，则执行递归操作
    if (sibling === element) {
      return getXpathByElement(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']';
    } else if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

export function getElementByXpath(path, contextNode = document.body) {
  return document.evaluate(path, contextNode, null, XPathResult.ANY_TYPE,null).iterateNext()
}

export default getXpathByElement;
