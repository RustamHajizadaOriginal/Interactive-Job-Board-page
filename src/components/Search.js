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
const submitHandler = (event) => {
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

  //  fetch data
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        return;
      }
      return response.json();
    })
    .then((data) => {
      // extract job items
      const { jobItems } = data;
      console.log(jobItems);
      // remove spinner
      renderSpinner("search");
      // render number of results
      numberEl.textContent = jobItems.length;
      // render job items in search job list
      renderJobList(jobItems);
    })
    .catch((error) => console.log(error));
};
searchFormEl.addEventListener("submit", submitHandler);
