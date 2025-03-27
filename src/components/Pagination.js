import {
  state,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
} from "../common.js";

import renderJobList from "./JobList.js";
const clickHandler = (event) => {
  // get clicked button element
  const clickedButtonEL = event.target.closest(".pagination__button");

  // stop function if null
  if (!clickedButtonEL) return;
  // check if intention is next or back
  const nextPage = clickedButtonEL.className.includes("--next") ? true : false;

  // update state
  nextPage ? state.currentPage++ : state.currentPage--;
  // render job items for that page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);
