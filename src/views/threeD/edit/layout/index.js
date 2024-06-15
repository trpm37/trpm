import { dom_parent } from "@/utils/utils";

/**
 * @description edit-card展开收起
 * @returns {String}
 */
export function card_fold(e) {
  let dom = dom_parent(e.target, "edit-card");
  if (dom) {
    if (dom.classList.contains("fold")) {
      dom.classList.remove("fold");
    } else {
      dom.classList.add("fold");
    }
  }
}
/**
 * @description edit-card展开收起(多个)
 * @returns {String}
 */
export function card_folds(e) {
  console.log(e);
  let dom = e.target.parentElement;
  if (dom) {
    let box = dom_parent(e.target, "box");
    let cards = box.querySelectorAll(".edit-card");
    let isFold = dom.classList.contains("fold");
    if (isFold) {
      dom.classList.remove("fold");
    } else {
      dom.classList.add("fold");
    }
    cards.forEach(function (ele) {
      if (isFold) {
        ele.classList.remove("fold");
      } else {
        ele.classList.add("fold");
      }
    });
  }
}