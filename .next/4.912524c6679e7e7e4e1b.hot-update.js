webpackHotUpdate(4,{

/***/ "./ethereum/web3.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web3__ = __webpack_require__("./node_modules/web3/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_web3__);
//@dev: Configure web3 with provider from MetaMask

/*var provider = (window.web3.currentProvider);
const web3 = new Web3(provider);*/
//@dwv-info: 'let' means redifine the variable

var web3; //@dev-info: 'typeof' means the string is undefined on server 

if (typeof windows !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser AND MetaMask is running.
  web3 = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a(window.web3.currentProvider);
} else {
  // we are on the server 'OR' the user is  not running MetaMask
  var provider = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a.providers.HttpProvider('https://rinkeby.infura.io/v3/e9c3ef2192494de8a3ba773a8526b459');
  web3 = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a(provider);
}

/* harmony default export */ __webpack_exports__["a"] = (web3);

/***/ })

})
//# sourceMappingURL=4.912524c6679e7e7e4e1b.hot-update.js.map