import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
const submitHandler = async (event) => {
  // prevent default behaviour
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation(regular expression example)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError(
      "Your search query contains forbidden characters, please remove then and try again"
    );
    return;
  }
  // blur imput
  searchInputEl.blur();
  // remove previous job items
  jobListSearchEl.innerHTML = "";
  //   render spinner
  renderSpinner("search");

  //  fetch search results
  try {
    const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await response.json();
    if (!response.ok) {
      //4xxx, 5xxx status codes.
      throw new Error(
        "Resource issue (e.g. resouce doesn't exist) or server issue"
      );
    }
    // extract job items
    const { jobItems } = data;
    // remove spinner
    renderSpinner("search");
    // render number of results
    numberEl.textContent = jobItems.length;
    // render job items in search job list
    renderJobList(jobItems);
  } catch (error) {
    //network problem or other errors (e.g. trying to partse someting not JSON as JSON)
    renderSpinner("search");
    renderError(error.message);
  }
};
searchFormEl.addEventListener("submit", submitHandler);
