import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";
import renderError from "./Error.js";
const submitHandler = (event) => {
  // prevent default behaviour
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation(regular expression example)
  const forbiddenPattern = /[0-999999999]/;
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
  spinnerSearchEl.classList.add("spinner--visible");
  //  fetch data
  fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
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
      spinnerSearchEl.classList.remove("spinner--visible");
      // render number of results
      numberEl.textContent = jobItems.length;
      // render job items in search job list
      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
                        <li class="job-item">
                          <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${jobItem.badgeLetters}</div>
                            <div class="job-item__middle">
                              <h3 class="third-heading">${jobItem.title}</h3>
                              <p class="job-item__company">${jobItem.company}</p>
                              <div class="job-item__extras">
                                <p class="job-item__extra">
                                  <i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}
                                </p>
                                <p class="job-item__extra">
                                  <i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}
                                </p>
                                <p class="job-item__extra">
                                  <i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}
                                </p>
                              </div>
                            </div>
                            <div class="job-item__right">
                              <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                              <time class="job-item__time">${jobItem.daysAgo}d</time>
                            </div>
                          </a>
                        </li>
                      `;
        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
    })
    .catch((error) => console.log(error));
};
searchFormEl.addEventListener("submit", submitHandler);
