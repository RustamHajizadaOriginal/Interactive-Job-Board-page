import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
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

  try {
    //  fetch search results
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
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
