import {
  state,
  sortingEl,
  sortingBtnRelevantEl,
  sortingBtnRecentEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickButtonEl = event.target.closest(".sorting__button");

  // stop function if no clicked button element
  if (!clickButtonEl) return;
  // check if intention is recent or relevant sorting
  const recent = clickButtonEl.className.includes("--recent") ? true : false;
  // sort job items
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return (a.daysAgo = b.daysAgo);
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relavanceScore - a.relavanceScore;
    });
  }
  // render job items in list
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
