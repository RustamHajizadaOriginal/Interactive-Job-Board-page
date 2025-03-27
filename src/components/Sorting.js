import {
  state,
  sortingEl,
  sortingBtnRelevantEl,
  sortingBtnRecentEl,
} from "../common.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickButtonEl = event.target.closest(".sorting__button");

  // stop function if no clicked button element
  if (!clickButtonEl) return;
  // check if intention is recent or relevant sorting
  clickButtonEl.className.includes("--recent") ? true : false;
  // sort job items
  if (recent) {
  } else {
  }
};

sortingEl.addEventListener("click", clickHandler);
