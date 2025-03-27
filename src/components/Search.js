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
  // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       console.log("something went wrong");
  //       throw new Error(
  //         "Resource issue (e.g. resouce doesn't exist) or server issue"
  //       );
  //       // throw {
  //       //   message:
  //       //     "Resource issue (e.g. resouce doesn't exist) or server issue",
  //       //   name: "Error",
  //       // };
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // extract job items
  //     const { jobItems } = data;
  //     console.log(jobItems);
  //     // remove spinner
  //     renderSpinner("search");
  //     // render number of results
  //     numberEl.textContent = jobItems.length;
  //     // render job items in search job list
  //     renderJobList(jobItems);
  //   })
  //   .catch((error) => {
  //     //network problem or other errors (e.g. trying to partse someting not JSON as JSON)
  //     renderSpinner("search");
  //     renderError(error.message);
  //   });
};
searchFormEl.addEventListener("submit", submitHandler);
