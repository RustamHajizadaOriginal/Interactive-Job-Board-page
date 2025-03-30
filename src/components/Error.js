import { DEFAULT_DISPLAY_TIME, errorTextEl, errorEl } from "../common.js";

const renderError = (message = "Something went wrong") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

export default renderError;

// const a = 10;
// const hello = () => {
//   let b = 5;
//   let c = 10;
// };
// hello();
// import x from "./x.js";

// function hello() {
//   let b = 5;
//   let c = 10;
//   return b + c;
// }

// if ((z = 10)) {
//   let b = 5;
//   let c = 10;
// } else {
//
// hello
// try {
//   let b = 5;
//   let c = 10;
// } catch (error) {}
