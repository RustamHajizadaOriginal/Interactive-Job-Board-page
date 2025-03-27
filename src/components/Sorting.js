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
    state.searchJobItems.sort((a, b) => {
      return (a.daysAgo = b.daysAgo);
    });
  } else {
  }
};

sortingEl.addEventListener("click", clickHandler);
