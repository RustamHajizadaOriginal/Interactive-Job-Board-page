import { BASE_API_URL, jobDetailsContentEl, getData } from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
const loadhashChangeHandler = async () => {
  //get id from URL
  const id = window.location.hash.substring(1);
  if (id) {
    //   remove previous job details content
    jobDetailsContentEl.innerHTML = "";
    // add spinner
    renderJobDetails(jobItem);
    try {
      // fetch job item data
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // extract job item
      const { jobItem } = data;

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadhashChangeHandler);
window.addEventListener("hashchange", loadhashChangeHandler);
