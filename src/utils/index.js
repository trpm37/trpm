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