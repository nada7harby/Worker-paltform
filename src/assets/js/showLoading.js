function e(e, n = "body") {
    e ? document.querySelector(n).insertAdjacentHTML("beforeend", '\n          <div id="spinner" class="align-items-center bottom-0 d-flex end-0 justify-content-center position-fixed start-0 top-0 z-index-1070" tabindex="-1" aria-hidden="true">\n            <link rel="stylesheet" href="/static/css/spinner.css">\n            <div class="h-100px spinner-border w-100px" role="status">\n              <span class="visually-hidden">Loading...</span>\n            </div>\n          </div>\n          ') : document.getElementById("spinner").remove()
}
export {
    e as s
};
//# sourceMappingURL=showLoading.js.map