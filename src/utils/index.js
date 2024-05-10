/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
    let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
    let defaultBrowserLang = "";
    if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
      defaultBrowserLang = "zh";
    } else {
      defaultBrowserLang = "en";
    }
    return defaultBrowserLang;
  }
/**
 * @description 获取当前元素的某个最近父元素
 * @returns {dom||null}
 */
export function dom_parent(element,className) {
    // 从给定的元素开始，逐级向上查找父元素
    while (element && element !== document.body) {
        if (element.classList && element.classList.contains(className)) {
            // 如果找到了，返回该元素
            return element;
        }
        // 如果没找到，继续查找父元素
        element = element.parentElement;
    }
    // 如果没有找到，返回 null
    return null;
}

/**
 * @description 动态添加样式style {id:"", "css":'#div{width:30px;} .div{height:30px;}'}
 * @returns 
 */
export function addStyle(params){
  let {id=null,css}=params;
  let style=document.createElement('style');
  style.type='text/css';
  if(id){
    style.id=id;
  }
  // style.innerText=css;
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
  let head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
}

/**
 * @description 获取定位信息
 * @returns 
 */
export function getPosition(element) {
  var parent = element.parentNode;
  var offsetParent = element.offsetParent || parent;
  var offsetTop = 0, offsetLeft = 0;

  // 如果offsetParent是body，那么元素的定位是相对于视口的
  if (offsetParent === document.body) {
      offsetTop = element.offsetTop;
      offsetLeft = element.offsetLeft;
  } else {
      // 否则，我们需要计算元素相对于offsetParent的偏移量
      do {
          if (!isNaN(element.offsetTop)) {
              offsetTop += element.offsetTop;
          }
          if (!isNaN(element.offsetLeft)) {
              offsetLeft += element.offsetLeft;
          }
          element = element.offsetParent;
      } while (element && element !== offsetParent);
  }

  // 考虑到父元素的滚动偏移量
  offsetTop -= offsetParent.scrollTop;
  offsetLeft -= offsetParent.scrollLeft;

  return {
      top: offsetTop,
      left: offsetLeft
  };
}
/**
 * @description 获取内部宽度
 * @returns 
 */
export function getWidth(element) {
  var style = window.getComputedStyle(element);
  var borderLeft = parseFloat(style.borderLeftWidth);
  var borderRight = parseFloat(style.borderRightWidth);
  var paddingLeft = parseFloat(style.paddingLeft);
  var paddingRight = parseFloat(style.paddingRight);

  // 使用 getBoundingClientRect 来获取元素的宽度，包括边框
  var rect = element.getBoundingClientRect();
  var widthWithBorder = rect.width;

  // 减去左右边框和内边距以得到内部宽度
  var innerWidth = widthWithBorder - borderLeft - borderRight - paddingLeft - paddingRight;

  return innerWidth;
}