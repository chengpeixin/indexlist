// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
!function (win) {
  function resize() {
    var domWidth = domEle.getBoundingClientRect().width;
    win.rem = domWidth / 25;
    domEle.style.fontSize = win.rem + "px";
  }
  var v,
      initial_scale,
      timeCode,
      dom = win.document,
      domEle = dom.documentElement,
      viewport = dom.querySelector('meta[name="viewport"]'),
      flexible = dom.querySelector('meta[name="flexible"]');
  if (viewport) {
    //viewport：<meta name="viewport"content="initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5,user-scalable=no,minimal-ui"/>
    var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
    if (o) {
      initial_scale = parseFloat(o[2]);
      v = parseInt(1 / initial_scale);
    }
  } else {
    if (flexible) {
      var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
      if (o) {
        v = parseFloat(o[2]);
        initial_scale = parseFloat((1 / v).toFixed(2));
      }
    }
  }
  if (!v && !initial_scale) {
    var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
    v = win.devicePixelRatio;
    v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v;
  }
  //没有viewport标签的情况下
  if (domEle.setAttribute("data-dpr", v), !viewport) {
    if (viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
      domEle.firstElementChild.appendChild(viewport);
    } else {
      var m = dom.createElement("div");
      m.appendChild(viewport), dom.write(m.innerHTML);
    }
  }
  win.dpr = v;
  win.addEventListener("resize", function () {
    clearTimeout(timeCode), timeCode = setTimeout(resize, 300);
  }, false);
  win.addEventListener("pageshow", function (b) {
    b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300));
  }, false);
  /* 个人觉得没必要完成后就把body的字体设置为12
  "complete" === dom.readyState ? dom.body.style.fontSize = 12 * v + "px" : dom.addEventListener("DOMContentLoaded", function() {
   //dom.body.style.fontSize = 12 * v + "px"
  }, false);
  */
  resize();
}(window);
},{}],7:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],6:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":7}],3:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":6}],11:[function(require,module,exports) {
module.exports = {
  "code": 0,
  "data": {
    "list": [{
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "Joker",
        "Fsinger_id": "5062",
        "Fsinger_mid": "002J4UUk29y8BY",
        "Fsinger_name": "薛之谦",
        "Fsinger_tag": "541,555",
        "Fsort": "1",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Jay Chou",
        "Fsinger_id": "4558",
        "Fsinger_mid": "0025NhlN2yWrP4",
        "Fsinger_name": "周杰伦",
        "Fsinger_tag": "541,555",
        "Fsort": "2",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "2",
        "Fattribute_3": "5",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "B",
        "Fother_name": "빅뱅",
        "Fsinger_id": "11733",
        "Fsinger_mid": "004AlfUb0cVkN1",
        "Fsinger_name": "BIGBANG (빅뱅)",
        "Fsinger_tag": "645,663,676,679,694,703,710,713",
        "Fsort": "3",
        "Ftrend": "0",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "C",
        "Fother_name": "Eason Chan",
        "Fsinger_id": "143",
        "Fsinger_mid": "003Nz2So3XXYek",
        "Fsinger_name": "陈奕迅",
        "Fsinger_tag": "555",
        "Fsort": "4",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "44",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "JJ Lin",
        "Fsinger_id": "4286",
        "Fsinger_mid": "001BLpXF2DyJe2",
        "Fsinger_name": "林俊杰",
        "Fsinger_tag": "541,555",
        "Fsort": "5",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "0",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "A",
        "Fother_name": "艾伦·沃克",
        "Fsinger_id": "944940",
        "Fsinger_mid": "0020PeOh4ZaCw1",
        "Fsinger_name": "Alan Walker (艾伦·沃克)",
        "Fsinger_tag": "",
        "Fsort": "6",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Ronghao Li",
        "Fsinger_id": "60505",
        "Fsinger_mid": "000aHmbL2aPXWH",
        "Fsinger_name": "李荣浩",
        "Fsinger_tag": "",
        "Fsort": "7",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "T",
        "Fother_name": "",
        "Fsinger_id": "34412",
        "Fsinger_mid": "000zmpju02bEBm",
        "Fsinger_name": "TFBOYS",
        "Fsinger_tag": "",
        "Fsort": "8",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "M",
        "Fother_name": "魔力红乐团",
        "Fsinger_id": "4983",
        "Fsinger_mid": "001JuGrt372YIQ",
        "Fsinger_name": "Maroon 5 (魔力红乐团)",
        "Fsinger_tag": "644,645",
        "Fsort": "9",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "Vae Xu",
        "Fsinger_id": "7221",
        "Fsinger_mid": "000CK5xN3yZDJt",
        "Fsinger_name": "许嵩",
        "Fsinger_tag": "",
        "Fsort": "10",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "G",
        "Fother_name": "Gem Tang",
        "Fsinger_id": "13948",
        "Fsinger_mid": "001fNHEf1SFEFN",
        "Fsinger_name": "G.E.M. 邓紫棋",
        "Fsinger_tag": "541,555",
        "Fsort": "11",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Jason Zhang",
        "Fsinger_id": "6499",
        "Fsinger_mid": "002azErJ0UcDN6",
        "Fsinger_name": "张杰",
        "Fsinger_tag": "555",
        "Fsort": "12",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "",
        "Fsinger_id": "204664",
        "Fsinger_mid": "001SqkF53OEhdO",
        "Fsinger_name": "鹿晗",
        "Fsinger_tag": "",
        "Fsort": "13",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Ada Zhuang",
        "Fsinger_id": "89698",
        "Fsinger_mid": "003Cn3Yh16q1MO",
        "Fsinger_name": "庄心妍",
        "Fsinger_tag": "555",
        "Fsort": "14",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "Y",
        "Fother_name": "Aska Yang",
        "Fsinger_id": "11608",
        "Fsinger_mid": "003tMm0y0TuewY",
        "Fsinger_name": "杨宗纬",
        "Fsinger_tag": "555",
        "Fsort": "15",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "15",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "J",
        "Fother_name": "贾斯汀·比伯",
        "Fsinger_id": "16257",
        "Fsinger_mid": "002DYpxl3hW3EP",
        "Fsinger_name": "Justin Bieber (贾斯汀·比伯)",
        "Fsinger_tag": "645,710",
        "Fsort": "16",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "",
        "Fsinger_id": "199515",
        "Fsinger_mid": "0003ZpE43ypssl",
        "Fsinger_name": "张碧晨",
        "Fsinger_tag": "",
        "Fsort": "17",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "1"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "H",
        "Fother_name": "",
        "Fsinger_id": "163550",
        "Fsinger_mid": "002Vcz8F2hpBQj",
        "Fsinger_name": "华晨宇",
        "Fsinger_tag": "555",
        "Fsort": "18",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Jacky Cheung",
        "Fsinger_id": "174",
        "Fsinger_mid": "004Be55m1SJaLk",
        "Fsinger_name": "张学友",
        "Fsinger_tag": "555",
        "Fsort": "19",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "T",
        "Fother_name": "Hebe Tian",
        "Fsinger_id": "4701",
        "Fsinger_mid": "001ByAsv3XCdgm",
        "Fsinger_name": "田馥甄",
        "Fsinger_tag": "555",
        "Fsort": "20",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "2",
        "Fattribute_3": "4",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "R",
        "Fother_name": "ラッドウィンプス",
        "Fsinger_id": "9962",
        "Fsinger_mid": "000f1b6W1wzyRN",
        "Fsinger_name": "RADWIMPS (ラッドウィンプス)",
        "Fsinger_tag": "645,683,690,709",
        "Fsort": "21",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "Jam Hsiao",
        "Fsinger_id": "13203",
        "Fsinger_mid": "004bsIDK0awMOv",
        "Fsinger_name": "萧敬腾",
        "Fsinger_tag": "",
        "Fsort": "22",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "N",
        "Fother_name": "",
        "Fsinger_id": "137",
        "Fsinger_mid": "003LCFXH0eodXv",
        "Fsinger_name": "那英",
        "Fsinger_tag": "555",
        "Fsort": "23",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "Leehom Wang",
        "Fsinger_id": "265",
        "Fsinger_mid": "001JDzPT3JdvqK",
        "Fsinger_name": "王力宏",
        "Fsinger_tag": "541,573",
        "Fsort": "24",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Jane Zhang",
        "Fsinger_id": "4607",
        "Fsinger_mid": "000aw4WC2EQYTv",
        "Fsinger_name": "张靓颖",
        "Fsinger_tag": "555",
        "Fsort": "25",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "Kris Wu",
        "Fsinger_id": "180646",
        "Fsinger_mid": "002yeznU3VAVEV",
        "Fsinger_name": "吴亦凡",
        "Fsinger_tag": "",
        "Fsort": "26",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "B",
        "Fother_name": "",
        "Fsinger_id": "2",
        "Fsinger_mid": "002pUZT93gF4Cu",
        "Fsinger_name": "BEYOND",
        "Fsinger_tag": "541,558,569",
        "Fsort": "27",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Yoga Lin",
        "Fsinger_id": "11606",
        "Fsinger_mid": "001f0VyZ1hmWZ1",
        "Fsinger_name": "林宥嘉",
        "Fsinger_tag": "555",
        "Fsort": "28",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "17",
        "Findex": "N",
        "Fother_name": "NZBZ",
        "Fsinger_id": "69205",
        "Fsinger_mid": "003ZQQb64D5317",
        "Fsinger_name": "南征北战",
        "Fsinger_tag": "",
        "Fsort": "29",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "Silence Wan",
        "Fsinger_id": "3954",
        "Fsinger_mid": "001z2JmX09LLgL",
        "Fsinger_name": "汪苏泷",
        "Fsinger_tag": "541,555,562",
        "Fsort": "30",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "2",
        "Fattribute_3": "5",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "G",
        "Fother_name": "权志龙",
        "Fsinger_id": "19851",
        "Fsinger_mid": "000t2qd13dLpae",
        "Fsinger_name": "G-DRAGON (权志龙)",
        "Fsinger_tag": "646,663,666,676,679,690,705,714",
        "Fsort": "31",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "S",
        "Fother_name": "Sodagreen",
        "Fsinger_id": "5924",
        "Fsinger_mid": "000Q4W691sMvLG",
        "Fsinger_name": "苏打绿",
        "Fsinger_tag": "544,555,569",
        "Fsort": "32",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "P",
        "Fother_name": "",
        "Fsinger_id": "4442",
        "Fsinger_mid": "000mLAT42CFWNa",
        "Fsinger_name": "朴树",
        "Fsinger_tag": "541,555,558",
        "Fsort": "33",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "Faye Wong",
        "Fsinger_id": "264",
        "Fsinger_mid": "000GDDuQ3sGQiT",
        "Fsinger_name": "王菲",
        "Fsinger_tag": "555",
        "Fsort": "34",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "K",
        "Fother_name": "",
        "Fsinger_id": "11761",
        "Fsinger_mid": "002Sm9iK4RIsCr",
        "Fsinger_name": "筷子兄弟",
        "Fsinger_tag": "555",
        "Fsort": "35",
        "Ftrend": "-1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "M",
        "Fother_name": "",
        "Fsinger_id": "160022",
        "Fsinger_mid": "0035kILA0ydw3j",
        "Fsinger_name": "MC天佑",
        "Fsinger_tag": "",
        "Fsort": "36",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "M",
        "Fother_name": "",
        "Fsinger_id": "1045852",
        "Fsinger_mid": "000WbpKa3WokLD",
        "Fsinger_name": "MC魏小然",
        "Fsinger_tag": "",
        "Fsort": "37",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "J",
        "Fother_name": "",
        "Fsinger_id": "12111",
        "Fsinger_mid": "004YXxql1sSr2o",
        "Fsinger_name": "金志文",
        "Fsinger_tag": "541,555",
        "Fsort": "40",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "S",
        "Fother_name": "Niko Sun",
        "Fsinger_id": "22874",
        "Fsinger_mid": "001oXbjs29oPul",
        "Fsinger_name": "孙子涵",
        "Fsinger_tag": "541,555,562",
        "Fsort": "41",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "A",
        "Fother_name": "黄丽玲",
        "Fsinger_id": "6028",
        "Fsinger_mid": "003ArN8Z0WpjTz",
        "Fsinger_name": "A-Lin",
        "Fsinger_tag": "555",
        "Fsort": "42",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "",
        "Fsinger_id": "3376",
        "Fsinger_mid": "00235pCx2tYjlq",
        "Fsinger_name": "许巍",
        "Fsinger_tag": "541,558",
        "Fsort": "43",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "S",
        "Fother_name": "Donye.S",
        "Fsinger_id": "61620",
        "Fsinger_mid": "004KKLWZ4320g1",
        "Fsinger_name": "宋冬野",
        "Fsinger_tag": "544,558",
        "Fsort": "45",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "aMEI",
        "Fsinger_id": "141",
        "Fsinger_mid": "003JGrNQ3RjelA",
        "Fsinger_name": "张惠妹",
        "Fsinger_tag": "555",
        "Fsort": "46",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Steve Chou",
        "Fsinger_id": "4365",
        "Fsinger_mid": "004NMZuf2BLjg8",
        "Fsinger_name": "周传雄",
        "Fsinger_tag": "541,555",
        "Fsort": "47",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Jeff Chang",
        "Fsinger_id": "167",
        "Fsinger_mid": "0000mFvh1jtLcz",
        "Fsinger_name": "张信哲",
        "Fsinger_tag": "555",
        "Fsort": "48",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Y",
        "Fother_name": "",
        "Fsinger_id": "944274",
        "Fsinger_mid": "004coWV04C5FCV",
        "Fsinger_name": "杨洋",
        "Fsinger_tag": "",
        "Fsort": "49",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "L Xu",
        "Fsinger_id": "22704",
        "Fsinger_mid": "004aRKga0CXIPm",
        "Fsinger_name": "徐良",
        "Fsinger_tag": "541,562",
        "Fsort": "50",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "C",
        "Fother_name": "Jordan Chan",
        "Fsinger_id": "4284",
        "Fsinger_mid": "004DFS271osAwp",
        "Fsinger_name": "陈小春",
        "Fsinger_tag": "555",
        "Fsort": "51",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Q",
        "Fother_name": "Wanting Qu",
        "Fsinger_id": "34703",
        "Fsinger_mid": "0030RkE50nmpWC",
        "Fsinger_name": "曲婉婷",
        "Fsinger_tag": "",
        "Fsort": "52",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "P",
        "Fother_name": "",
        "Fsinger_id": "1102711",
        "Fsinger_mid": "003vSrlp0ujV6o",
        "Fsinger_name": "鹏泊",
        "Fsinger_tag": "",
        "Fsort": "53",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "44",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "S",
        "Fother_name": "Stefanie Sun",
        "Fsinger_id": "109",
        "Fsinger_mid": "001pWERg3vFgg8",
        "Fsinger_name": "孙燕姿",
        "Fsinger_tag": "555,558",
        "Fsort": "54",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "维兹·卡利法",
        "Fsinger_id": "12978",
        "Fsinger_mid": "000CQ06r24Naco",
        "Fsinger_name": "Wiz Khalifa (维兹·卡利法)",
        "Fsinger_tag": "644",
        "Fsort": "55",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Phil Chang",
        "Fsinger_id": "168",
        "Fsinger_mid": "0044wQXL0ElWF1",
        "Fsinger_name": "张宇",
        "Fsinger_tag": "555",
        "Fsort": "56",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "G",
        "Fother_name": "",
        "Fsinger_id": "61959",
        "Fsinger_mid": "002OfR3n1vx75j",
        "Fsinger_name": "葛林",
        "Fsinger_tag": "",
        "Fsort": "58",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "M",
        "Fother_name": "Karen Mok",
        "Fsinger_id": "54",
        "Fsinger_mid": "000cISVf2QqLc6",
        "Fsinger_name": "莫文蔚",
        "Fsinger_tag": "555",
        "Fsort": "59",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "",
        "Fsinger_id": "1012038",
        "Fsinger_mid": "004eaDNU1nfRO0",
        "Fsinger_name": "张磊",
        "Fsinger_tag": "",
        "Fsort": "60",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "J",
        "Fother_name": "",
        "Fsinger_id": "1041231",
        "Fsinger_mid": "0023ni2j3F9CpN",
        "Fsinger_name": "Jam",
        "Fsinger_tag": "",
        "Fsort": "61",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "N",
        "Fother_name": "Milk Coffee",
        "Fsinger_id": "4422",
        "Fsinger_mid": "0012bj8d36Xkw1",
        "Fsinger_name": "牛奶咖啡",
        "Fsinger_tag": "552,555",
        "Fsort": "62",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "",
        "Fsinger_id": "4604",
        "Fsinger_mid": "001adLDR1SS40P",
        "Fsinger_name": "汪峰",
        "Fsinger_tag": "541,555,569",
        "Fsort": "63",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "C",
        "Fother_name": "查理·普斯",
        "Fsinger_id": "39000",
        "Fsinger_mid": "000jnR7q3pCzYG",
        "Fsinger_name": "Charlie Puth (查理·普斯)",
        "Fsinger_tag": "644",
        "Fsort": "64",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "B",
        "Fother_name": "",
        "Fsinger_id": "4545",
        "Fsinger_mid": "003LaMHm42u7qS",
        "Fsinger_name": "本兮",
        "Fsinger_tag": "",
        "Fsort": "65",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "H",
        "Fother_name": "",
        "Fsinger_id": "24833",
        "Fsinger_mid": "002mze3U0NYXOM",
        "Fsinger_name": "胡夏",
        "Fsinger_tag": "555",
        "Fsort": "66",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "M",
        "Fother_name": "MXD",
        "Fsinger_id": "28227",
        "Fsinger_mid": "003wWQBU0fHBcj",
        "Fsinger_name": "马旭东",
        "Fsinger_tag": "555",
        "Fsort": "67",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "W",
        "Fother_name": "Vai",
        "Fsinger_id": "38625",
        "Fsinger_mid": "001WcO2V0TLCv3",
        "Fsinger_name": "威仔",
        "Fsinger_tag": "",
        "Fsort": "68",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "",
        "Fsinger_id": "11707",
        "Fsinger_mid": "002xpOdd4Dh6pu",
        "Fsinger_name": "李易峰",
        "Fsinger_tag": "555",
        "Fsort": "70",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Y",
        "Fother_name": "",
        "Fsinger_id": "7485",
        "Fsinger_mid": "004FtTNW2b0tJi",
        "Fsinger_name": "雨宗林",
        "Fsinger_tag": "555",
        "Fsort": "71",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "G",
        "Fother_name": "Claire Guo",
        "Fsinger_id": "11626",
        "Fsinger_mid": "0043Zxw10txf5O",
        "Fsinger_name": "郭静",
        "Fsinger_tag": "555",
        "Fsort": "72",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Chris Lee",
        "Fsinger_id": "4615",
        "Fsinger_mid": "002ZOuVm3Qn20Y",
        "Fsinger_name": "李宇春",
        "Fsinger_tag": "555",
        "Fsort": "73",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Angela Zhang",
        "Fsinger_id": "224",
        "Fsinger_mid": "002raUWw3PXdkT",
        "Fsinger_name": "张韶涵",
        "Fsinger_tag": "555",
        "Fsort": "74",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "M",
        "Fother_name": "MMD",
        "Fsinger_id": "943468",
        "Fsinger_mid": "003rJfMG3PPqWd",
        "Fsinger_name": "萌萌哒天团",
        "Fsinger_tag": "",
        "Fsort": "75",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "F",
        "Fother_name": "打倒男孩",
        "Fsinger_id": "4868",
        "Fsinger_mid": "003CKb192ggBqi",
        "Fsinger_name": "Fall Out Boy (打倒男孩)",
        "Fsinger_tag": "645",
        "Fsort": "76",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "R",
        "Fother_name": "蕾哈娜",
        "Fsinger_id": "6966",
        "Fsinger_mid": "002MiBdR19HQWx",
        "Fsinger_name": "Rihanna (蕾哈娜)",
        "Fsinger_tag": "710",
        "Fsort": "77",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "T",
        "Fother_name": "烟民二人组",
        "Fsinger_id": "156095",
        "Fsinger_mid": "004ABIFV1EZUAj",
        "Fsinger_name": "The Chainsmokers (烟民二人组)",
        "Fsinger_tag": "",
        "Fsort": "78",
        "Ftrend": "-1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "Ann",
        "Fsinger_id": "23800",
        "Fsinger_mid": "001oNMzI3WznzG",
        "Fsinger_name": "夏婉安",
        "Fsinger_tag": "",
        "Fsort": "79",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "",
        "Fsinger_id": "968571",
        "Fsinger_mid": "0042kZuh1dgLre",
        "Fsinger_name": "周二珂",
        "Fsinger_tag": "",
        "Fsort": "80",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "8",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "T",
        "Fother_name": "",
        "Fsinger_id": "947788",
        "Fsinger_mid": "000ndQx82fsq8Z",
        "Fsinger_name": "Tez Cadey",
        "Fsinger_tag": "",
        "Fsort": "81",
        "Ftrend": "0",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "E",
        "Fother_name": "艾米纳姆",
        "Fsinger_id": "4880",
        "Fsinger_mid": "000yDAjj2TE9j8",
        "Fsinger_name": "Eminem (艾米纳姆)",
        "Fsinger_tag": "645,647",
        "Fsort": "82",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "Hins Cheung",
        "Fsinger_id": "219",
        "Fsinger_mid": "003AfDK34H82GU",
        "Fsinger_name": "张敬轩",
        "Fsinger_tag": "541,555",
        "Fsort": "83",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "17",
        "Findex": "Q",
        "Fother_name": "",
        "Fsinger_id": "1042260",
        "Fsinger_mid": "0020IaUo4Vgsjk",
        "Fsinger_name": "齐一",
        "Fsinger_tag": "",
        "Fsort": "84",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "H",
        "Fother_name": "",
        "Fsinger_id": "1043567",
        "Fsinger_mid": "004QoDUs3jfOC6",
        "Fsinger_name": "韩安旭",
        "Fsinger_tag": "",
        "Fsort": "85",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Sam Lee",
        "Fsinger_id": "38",
        "Fsinger_mid": "002seUhN1Akj7J",
        "Fsinger_name": "李圣杰",
        "Fsinger_tag": "555,562",
        "Fsort": "86",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Z",
        "Fother_name": "",
        "Fsinger_id": "63938",
        "Fsinger_mid": "000SJp6n49rDgl",
        "Fsinger_name": "张赫宣",
        "Fsinger_tag": "",
        "Fsort": "87",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Richael Liu",
        "Fsinger_id": "161444",
        "Fsinger_mid": "003bQEFA3KrvLI",
        "Fsinger_name": "刘瑞琦",
        "Fsinger_tag": "555",
        "Fsort": "89",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "7",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "A",
        "Fother_name": "阿黛尔",
        "Fsinger_id": "12578",
        "Fsinger_mid": "003CoxJh1zFPpx",
        "Fsinger_name": "Adele (阿黛尔)",
        "Fsinger_tag": "644",
        "Fsort": "90",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "S",
        "Fother_name": "",
        "Fsinger_id": "1011983",
        "Fsinger_mid": "001t94rh4OpQn0",
        "Fsinger_name": "双笙",
        "Fsinger_tag": "",
        "Fsort": "91",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "T",
        "Fother_name": "Escape Plan",
        "Fsinger_id": "15514",
        "Fsinger_mid": "001Yxpxc0OaUUX",
        "Fsinger_name": "逃跑计划",
        "Fsinger_tag": "544,569",
        "Fsort": "92",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "2",
        "Fattribute_3": "5",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "B",
        "Fother_name": "",
        "Fsinger_id": "1190986",
        "Fsinger_mid": "003DBAjk2MMfhR",
        "Fsinger_name": "BLACKPINK",
        "Fsinger_tag": "",
        "Fsort": "93",
        "Ftrend": "0",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Y",
        "Fother_name": "Jackson",
        "Fsinger_id": "198135",
        "Fsinger_mid": "001IoTZp19YMDG",
        "Fsinger_name": "易烊千玺",
        "Fsinger_tag": "",
        "Fsort": "94",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "6",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "O",
        "Fother_name": "猫头鹰之城",
        "Fsinger_id": "12926",
        "Fsinger_mid": "002a1DuK4evNsR",
        "Fsinger_name": "Owl City (猫头鹰之城)",
        "Fsinger_tag": "644",
        "Fsort": "95",
        "Ftrend": "1",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "T",
        "Fother_name": "",
        "Fsinger_id": "6370",
        "Fsinger_mid": "000QG95i2rHlOf",
        "Fsinger_name": "谭晶",
        "Fsinger_tag": "",
        "Fsort": "96",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "C",
        "Fother_name": "Sean Chen",
        "Fsinger_id": "22926",
        "Fsinger_mid": "004EyqQS2hMS6V",
        "Fsinger_name": "陈翔",
        "Fsinger_tag": "555",
        "Fsort": "97",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Andy Lau",
        "Fsinger_id": "163",
        "Fsinger_mid": "003aQYLo2x8izP",
        "Fsinger_name": "刘德华",
        "Fsinger_tag": "555",
        "Fsort": "98",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "3",
        "Fattribute_3": "7",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "O",
        "Fother_name": "单向组合",
        "Fsinger_id": "24561",
        "Fsinger_mid": "001FXn5P0kkWfV",
        "Fsinger_name": "One Direction (单向组合)",
        "Fsinger_tag": "645",
        "Fsort": "99",
        "Ftrend": "0",
        "Ftype": "2",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "C",
        "Fother_name": "Tanya Chua",
        "Fsinger_id": "112",
        "Fsinger_mid": "000hNnWC3kko2c",
        "Fsinger_name": "蔡健雅",
        "Fsinger_tag": "541,555",
        "Fsort": "100",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "F",
        "Fother_name": "Christine Fan",
        "Fsinger_id": "4351",
        "Fsinger_mid": "003vyG9q2klWs4",
        "Fsinger_name": "范玮琪",
        "Fsinger_tag": "541,555,558",
        "Fsort": "101",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "2",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "X",
        "Fother_name": "LALA Xu",
        "Fsinger_id": "16244",
        "Fsinger_mid": "002LZVMH0zc8F4",
        "Fsinger_name": "徐佳莹",
        "Fsinger_tag": "541,555,569",
        "Fsort": "102",
        "Ftrend": "1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "1",
        "Fgenre": "0",
        "Findex": "J",
        "Fother_name": "J Sound",
        "Fsinger_id": "44018",
        "Fsinger_mid": "001m7JoC1IVL44",
        "Fsinger_name": "金南玲",
        "Fsinger_tag": "",
        "Fsort": "103",
        "Ftrend": "-1",
        "Ftype": "1",
        "voc": "0"
      },
      {
        "Farea": "0",
        "Fattribute_3": "1",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "L",
        "Fother_name": "Hacken Lee",
        "Fsinger_id": "235",
        "Fsinger_mid": "003nS2v740Lxcw",
        "Fsinger_name": "李克勤",
        "Fsinger_tag": "555",
        "Fsort": "104",
        "Ftrend": "-1",
        "Ftype": "0",
        "voc": "0"
      },
      {
        "Farea": "1",
        "Fattribute_3": "3",
        "Fattribute_4": "0",
        "Fgenre": "0",
        "Findex": "Q",
        "Fother_name": "",
        "Fsinger_id": "40798",
        "Fsinger_mid": "000H4xDG3heHtr",
        "Fsinger_name": "齐晨",
        "Fsinger_tag": "555",
        "Fsort": "105",
        "Ftrend": "1",
        "Ftype": "0",
        "voc": "0"
      }
    ],
    "per_page": 100,
    "total": 552503,
    "total_page": 5526
  },
  "message": "succ",
  "subcode": 0
}
;
},{}],9:[function(require,module,exports) {
'use strict';

var _FeHelper = require('./../json/FeHelper.json');

var _FeHelper2 = _interopRequireDefault(_FeHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var data = _FeHelper2.default.data.list;
var HOT_NAME = '热门';
var HOT_SINGE_LEN = 10;
var map = {
  hot: {
    title: HOT_NAME,
    items: []
  }
};
var list = void 0;

var Singer = function Singer(_ref) {
  var id = _ref.id,
      name = _ref.name;

  _classCallCheck(this, Singer);

  this.id = id;
  this.name = name;
  this.avatar = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + id + '.jpg?max_age=2592000';
};

data.forEach(function (item, index) {
  if (index < HOT_SINGE_LEN) {
    map.hot.items.push(new Singer({
      id: item.Fsinger_mid,
      name: item.Fother_name
    }));
  }
  var key = item.Findex;
  if (!map[key]) {
    map[key] = {
      title: key,
      items: []
    };
  }
  map[key].items.push(new Singer({
    id: item.Fsinger_mid,
    name: item.Fother_name == "" ? "不知道名称" : item.Fother_name
  }));
}, undefined);
// 为了得到有序列表，我们需要处理 map
var hot = [];
var ret = [];
for (var key in map) {
  var val = map[key];
  if (val.title.match(/[a-zA-Z]/)) {
    ret.push(val);
  } else if (val.title === HOT_NAME) {
    hot.push(val);
  }
}
ret.sort(function (a, b) {
  return a.title.charCodeAt(0) - b.title.charCodeAt(0);
});
list = hot.concat(ret);
module.exports = list;
},{"./../json/FeHelper.json":11}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*!
 * better-normal-scroll v1.12.4
 * (c) 2016-2018 ustbhuangyi
 * Released under the MIT License.
 */
var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function eventMixin(BScroll) {
  BScroll.prototype.on = function (type, fn) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    if (!this._events[type]) {
      this._events[type] = [];
    }

    this._events[type].push([fn, context]);
  };

  BScroll.prototype.once = function (type, fn) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

    function magic() {
      this.off(type, magic);

      fn.apply(context, arguments);
    }
    // To expose the corresponding function method in order to execute the off method
    magic.fn = fn;

    this.on(type, magic);
  };

  BScroll.prototype.off = function (type, fn) {
    var _events = this._events[type];
    if (!_events) {
      return;
    }

    var count = _events.length;
    while (count--) {
      if (_events[count][0] === fn || _events[count][0] && _events[count][0].fn === fn) {
        _events[count][0] = undefined;
      }
    }
  };

  BScroll.prototype.trigger = function (type) {
    var events = this._events[type];
    if (!events) {
      return;
    }

    var len = events.length;
    var eventsCopy = [].concat(toConsumableArray(events));
    for (var i = 0; i < len; i++) {
      var event = eventsCopy[i];

      var _event = slicedToArray(event, 2),
          fn = _event[0],
          context = _event[1];

      if (fn) {
        fn.apply(context, [].slice.call(arguments, 1));
      }
    }
  };
}

// ssr support
var inBrowser = typeof window !== 'undefined';
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = ua && /wechatdevtools/.test(ua);
var isAndroid = ua && ua.indexOf('android') > 0;

function getNow() {
  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
}

function extend(target) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < rest.length; i++) {
    var source = rest[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}

function isUndef(v) {
  return v === undefined || v === null;
}

function getDistance(x, y) {
  return Math.sqrt(x * x + y * y);
}

var elementStyle = inBrowser && document.createElement('div').style;

var vendor = function () {
  if (!inBrowser) {
    return false;
  }
  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
}();

function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend';
    }
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, { passive: false, capture: !!capture });
}

function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, { passive: false, capture: !!capture });
}

function offset(el) {
  var left = 0;
  var top = 0;

  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }

  return {
    left: left,
    top: top
  };
}

function offsetToBody(el) {
  var rect = el.getBoundingClientRect();

  return {
    left: -(rect.left + window.pageXOffset),
    top: -(rect.top + window.pageYOffset)
  };
}

var transform = prefixStyle('transform');

var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
// fix issue #361
var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
var hasTransform = transform !== false;
var hasTransition = inBrowser && prefixStyle('transition') in elementStyle;

var style = {
  transform: transform,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd')
};

var TOUCH_EVENT = 1;
var MOUSE_EVENT = 2;

var eventType = {
  touchstart: TOUCH_EVENT,
  touchmove: TOUCH_EVENT,
  touchend: TOUCH_EVENT,

  mousedown: MOUSE_EVENT,
  mousemove: MOUSE_EVENT,
  mouseup: MOUSE_EVENT
};

function getRect(el) {
  if (el instanceof window.SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

function preventDefaultException(el, exceptions) {
  for (var i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}

function tap(e, eventName) {
  var ev = document.createEvent('Event');
  ev.initEvent(eventName, true, true);
  ev.pageX = e.pageX;
  ev.pageY = e.pageY;
  e.target.dispatchEvent(ev);
}

function click(e) {
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';

  var eventSource = void 0;
  if (e.type === 'mouseup' || e.type === 'mousecancel') {
    eventSource = e;
  } else if (e.type === 'touchend' || e.type === 'touchcancel') {
    eventSource = e.changedTouches[0];
  }
  var posSrc = {};
  if (eventSource) {
    posSrc.screenX = eventSource.screenX || 0;
    posSrc.screenY = eventSource.screenY || 0;
    posSrc.clientX = eventSource.clientX || 0;
    posSrc.clientY = eventSource.clientY || 0;
  }
  var ev = void 0;
  var bubbles = true;
  var cancelable = true;
  if (typeof MouseEvent !== 'undefined') {
    try {
      ev = new MouseEvent(event, extend({
        bubbles: bubbles,
        cancelable: cancelable
      }, posSrc));
    } catch (e) {
      createEvent();
    }
  } else {
    createEvent();
  }

  function createEvent() {
    ev = document.createEvent('Event');
    ev.initEvent(event, bubbles, cancelable);
    extend(ev, posSrc);
  }

  // forwardedTouchEvent set to true in case of the conflict with fastclick
  ev.forwardedTouchEvent = true;
  ev._constructed = true;
  e.target.dispatchEvent(ev);
}

function dblclick(e) {
  click(e, 'dblclick');
}

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

function removeChild(el, child) {
  el.removeChild(child);
}

var DEFAULT_OPTIONS = {
  startX: 0,
  startY: 0,
  scrollX: false,
  scrollY: true,
  freeScroll: false,
  directionLockThreshold: 5,
  eventPassthrough: '',
  click: false,
  tap: false,
  /**
   * support any side
   * bounce: {
   *   top: true,
   *   bottom: true,
   *   left: true,
   *   right: true
   * }
   */
  bounce: true,
  bounceTime: 800,
  momentum: true,
  momentumLimitTime: 300,
  momentumLimitDistance: 15,
  swipeTime: 2500,
  swipeBounceTime: 500,
  deceleration: 0.0015,
  flickLimitTime: 200,
  flickLimitDistance: 100,
  resizePolling: 60,
  probeType: 0,
  preventDefault: true,
  preventDefaultException: {
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
  },
  HWCompositing: true,
  useTransition: true,
  useTransform: true,
  bindToWrapper: false,
  disableMouse: hasTouch,
  disableTouch: !hasTouch,
  observeDOM: true,
  autoBlur: true,
  /**
   * for picker
   * wheel: {
   *   selectedIndex: 0,
   *   rotate: 25,
   *   adjustTime: 400
   *   wheelWrapperClass: 'wheel-scroll',
   *   wheelItemClass: 'wheel-item'
   * }
   */
  wheel: false,
  /**
   * for slide
   * snap: {
   *   loop: false,
   *   el: domEl,
   *   threshold: 0.1,
   *   stepX: 100,
   *   stepY: 100,
   *   speed: 400,
   *   easing: {
   *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
   *     fn: function (t) {
   *       return t * (2 - t)
   *     }
   *   }
   *   listenFlick: true
   * }
   */
  snap: false,
  /**
   * for scrollbar
   * scrollbar: {
   *   fade: true,
   *   interactive: false
   * }
   */
  scrollbar: false,
  /**
   * for pull down and refresh
   * pullDownRefresh: {
   *   threshold: 50,
   *   stop: 20
   * }
   */
  pullDownRefresh: false,
  /**
   * for pull up and load
   * pullUpLoad: {
   *   threshold: 50
   * }
   */
  pullUpLoad: false,
  /**
   * for mouse wheel
   * mouseWheel: {
   *   speed: 20,
   *   invert: false,
   *   easeTime: 300
   * }
   */
  mouseWheel: false,
  stopPropagation: false,
  /**
   * for zoom
   * zoom: {
   *   start: 1,
   *   min: 1,
   *   max: 4
   * }
   */
  zoom: false,
  /**
   * for infinity
   * infinity: {
   *   render(item, div) {
   *   },
   *   createTombstone() {
   *   },
   *   fetch(count) {
   *   }
   * }
   */
  infinity: false,
  /**
   * for double click
   * dblclick: {
   *   delay: 300
   * }
   */
  dblclick: false
};

function initMixin(BScroll) {
  BScroll.prototype._init = function (el, options) {
    this._handleOptions(options);

    // init private custom events
    this._events = {};

    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;

    this.setScale(1);

    this._addDOMEvents();

    this._initExtFeatures();

    this._watchTransition();

    if (this.options.observeDOM) {
      this._initDOMObserver();
    }

    if (this.options.autoBlur) {
      this._handleAutoBlur();
    }

    this.refresh();

    if (!this.options.snap) {
      this.scrollTo(this.options.startX, this.options.startY);
    }

    this.enable();
  };

  BScroll.prototype.setScale = function (scale) {
    this.lastScale = isUndef(this.scale) ? scale : this.scale;
    this.scale = scale;
  };

  BScroll.prototype._handleOptions = function (options) {
    this.options = extend({}, DEFAULT_OPTIONS, options);

    this.translateZ = this.options.HWCompositing && hasPerspective ? ' translateZ(0)' : '';

    this.options.useTransition = this.options.useTransition && hasTransition;
    this.options.useTransform = this.options.useTransform && hasTransform;

    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

    // If you want eventPassthrough I have to lock one of the axes
    this.options.scrollX = this.options.eventPassthrough === 'horizontal' ? false : this.options.scrollX;
    this.options.scrollY = this.options.eventPassthrough === 'vertical' ? false : this.options.scrollY;

    // With eventPassthrough we also need lockDirection mechanism
    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

    if (this.options.tap === true) {
      this.options.tap = 'tap';
    }
  };

  BScroll.prototype._addDOMEvents = function () {
    var eventOperation = addEvent;
    this._handleDOMEvents(eventOperation);
  };

  BScroll.prototype._removeDOMEvents = function () {
    var eventOperation = removeEvent;
    this._handleDOMEvents(eventOperation);
  };

  BScroll.prototype._handleDOMEvents = function (eventOperation) {
    var target = this.options.bindToWrapper ? this.wrapper : window;
    eventOperation(window, 'orientationchange', this);
    eventOperation(window, 'resize', this);

    if (this.options.click) {
      eventOperation(this.wrapper, 'click', this, true);
    }

    if (!this.options.disableMouse) {
      eventOperation(this.wrapper, 'mousedown', this);
      eventOperation(target, 'mousemove', this);
      eventOperation(target, 'mousecancel', this);
      eventOperation(target, 'mouseup', this);
    }

    if (hasTouch && !this.options.disableTouch) {
      eventOperation(this.wrapper, 'touchstart', this);
      eventOperation(target, 'touchmove', this);
      eventOperation(target, 'touchcancel', this);
      eventOperation(target, 'touchend', this);
    }

    eventOperation(this.scroller, style.transitionEnd, this);
  };

  BScroll.prototype._initExtFeatures = function () {
    if (this.options.snap) {
      this._initSnap();
    }
    if (this.options.scrollbar) {
      this._initScrollbar();
    }
    if (this.options.pullUpLoad) {
      this._initPullUp();
    }
    if (this.options.pullDownRefresh) {
      this._initPullDown();
    }
    if (this.options.wheel) {
      this._initWheel();
    }
    if (this.options.mouseWheel) {
      this._initMouseWheel();
    }
    if (this.options.zoom) {
      this._initZoom();
    }
    if (this.options.infinity) {
      this._initInfinite();
    }
  };

  BScroll.prototype._watchTransition = function () {
    if (typeof Object.defineProperty !== 'function') {
      return;
    }
    var me = this;
    var isInTransition = false;
    var key = this.useTransition ? 'isInTransition' : 'isAnimating';
    Object.defineProperty(this, key, {
      get: function get() {
        return isInTransition;
      },
      set: function set(newVal) {
        isInTransition = newVal;
        // fix issue #359
        var el = me.scroller.children.length ? me.scroller.children : [me.scroller];
        var pointerEvents = isInTransition && !me.pulling ? 'none' : 'auto';
        for (var i = 0; i < el.length; i++) {
          el[i].style.pointerEvents = pointerEvents;
        }
      }
    });
  };

  BScroll.prototype._handleAutoBlur = function () {
    this.on('scrollStart', function () {
      var activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        activeElement.blur();
      }
    });
  };

  BScroll.prototype._initDOMObserver = function () {
    var _this = this;

    if (typeof MutationObserver !== 'undefined') {
      var timer = void 0;
      var observer = new MutationObserver(function (mutations) {
        // don't do any refresh during the transition, or outside of the boundaries
        if (_this._shouldNotRefresh()) {
          return;
        }
        var immediateRefresh = false;
        var deferredRefresh = false;
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (mutation.type !== 'attributes') {
            immediateRefresh = true;
            break;
          } else {
            if (mutation.target !== _this.scroller) {
              deferredRefresh = true;
              break;
            }
          }
        }
        if (immediateRefresh) {
          _this.refresh();
        } else if (deferredRefresh) {
          // attributes changes too often
          clearTimeout(timer);
          timer = setTimeout(function () {
            if (!_this._shouldNotRefresh()) {
              _this.refresh();
            }
          }, 60);
        }
      });
      var config = {
        attributes: true,
        childList: true,
        subtree: true
      };
      observer.observe(this.scroller, config);

      this.on('destroy', function () {
        observer.disconnect();
      });
    } else {
      this._checkDOMUpdate();
    }
  };

  BScroll.prototype._shouldNotRefresh = function () {
    var outsideBoundaries = this.x > this.minScrollX || this.x < this.maxScrollX || this.y > this.minScrollY || this.y < this.maxScrollY;

    return this.isInTransition || this.stopFromTransition || outsideBoundaries;
  };

  BScroll.prototype._checkDOMUpdate = function () {
    var scrollerRect = getRect(this.scroller);
    var oldWidth = scrollerRect.width;
    var oldHeight = scrollerRect.height;

    function check() {
      if (this.destroyed) {
        return;
      }
      scrollerRect = getRect(this.scroller);
      var newWidth = scrollerRect.width;
      var newHeight = scrollerRect.height;

      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        this.refresh();
      }
      oldWidth = newWidth;
      oldHeight = newHeight;

      next.call(this);
    }

    function next() {
      var _this2 = this;

      setTimeout(function () {
        check.call(_this2);
      }, 1000);
    }

    next.call(this);
  };

  BScroll.prototype.handleEvent = function (e) {
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this._start(e);
        if (this.options.zoom && e.touches && e.touches.length > 1) {
          this._zoomStart(e);
        }
        break;
      case 'touchmove':
      case 'mousemove':
        if (this.options.zoom && e.touches && e.touches.length > 1) {
          this._zoom(e);
        } else {
          this._move(e);
        }
        break;
      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        if (this.scaled) {
          this._zoomEnd(e);
        } else {
          this._end(e);
        }
        break;
      case 'orientationchange':
      case 'resize':
        this._resize();
        break;
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this._transitionEnd(e);
        break;
      case 'click':
        if (this.enabled && !e._constructed) {
          if (!preventDefaultException(e.target, this.options.preventDefaultException)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
        break;
      case 'wheel':
      case 'DOMMouseScroll':
      case 'mousewheel':
        this._onMouseWheel(e);
        break;
    }
  };

  BScroll.prototype.refresh = function () {
    var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
    var wrapperRect = getRect(this.wrapper);
    this.wrapperWidth = wrapperRect.width;
    this.wrapperHeight = wrapperRect.height;

    var scrollerRect = getRect(this.scroller);
    this.scrollerWidth = Math.round(scrollerRect.width * this.scale);
    this.scrollerHeight = Math.round(scrollerRect.height * this.scale);

    this.relativeX = scrollerRect.left;
    this.relativeY = scrollerRect.top;

    if (isWrapperStatic) {
      this.relativeX -= wrapperRect.left;
      this.relativeY -= wrapperRect.top;
    }

    this.minScrollX = 0;
    this.minScrollY = 0;

    var wheel = this.options.wheel;
    if (wheel) {
      this.items = this.scroller.children;
      this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0;
      if (this.selectedIndex === undefined) {
        this.selectedIndex = wheel.selectedIndex || 0;
      }
      this.options.startY = -this.selectedIndex * this.itemHeight;
      this.maxScrollX = 0;
      this.maxScrollY = -this.itemHeight * (this.items.length - 1);
    } else {
      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
      if (!this.options.infinity) {
        this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
      }
      if (this.maxScrollX < 0) {
        this.maxScrollX -= this.relativeX;
        this.minScrollX = -this.relativeX;
      } else if (this.scale > 1) {
        this.maxScrollX = this.maxScrollX / 2 - this.relativeX;
        this.minScrollX = this.maxScrollX;
      }
      if (this.maxScrollY < 0) {
        this.maxScrollY -= this.relativeY;
        this.minScrollY = -this.relativeY;
      } else if (this.scale > 1) {
        this.maxScrollY = this.maxScrollY / 2 - this.relativeY;
        this.minScrollY = this.maxScrollY;
      }
    }

    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX;
    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY;

    if (!this.hasHorizontalScroll) {
      this.maxScrollX = this.minScrollX;
      this.scrollerWidth = this.wrapperWidth;
    }

    if (!this.hasVerticalScroll) {
      this.maxScrollY = this.minScrollY;
      this.scrollerHeight = this.wrapperHeight;
    }

    this.endTime = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.wrapperOffset = offset(this.wrapper);

    this.trigger('refresh');

    !this.scaled && this.resetPosition();
  };

  BScroll.prototype.enable = function () {
    this.enabled = true;
  };

  BScroll.prototype.disable = function () {
    this.enabled = false;
  };
}

var ease = {
  // easeOutQuint
  swipe: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function fn(t) {
      return 1 + --t * t * t * t * t;
    }
  },
  // easeOutQuard
  swipeBounce: {
    style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fn: function fn(t) {
      return t * (2 - t);
    }
  },
  // easeOutQuart
  bounce: {
    style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    fn: function fn(t) {
      return 1 - --t * t * t * t;
    }
  }
};

function momentum(current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
  var distance = current - start;
  var speed = Math.abs(distance) / time;

  var deceleration = options.deceleration,
      itemHeight = options.itemHeight,
      swipeBounceTime = options.swipeBounceTime,
      wheel = options.wheel,
      swipeTime = options.swipeTime;

  var duration = swipeTime;
  var rate = wheel ? 4 : 15;

  var destination = current + speed / deceleration * (distance < 0 ? -1 : 1);

  if (wheel && itemHeight) {
    destination = Math.round(destination / itemHeight) * itemHeight;
  }

  if (destination < lowerMargin) {
    destination = wrapperSize ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - wrapperSize / rate * speed) : lowerMargin;
    duration = swipeBounceTime;
  } else if (destination > upperMargin) {
    destination = wrapperSize ? Math.min(upperMargin + wrapperSize / 4, upperMargin + wrapperSize / rate * speed) : upperMargin;
    duration = swipeBounceTime;
  }

  return {
    destination: Math.round(destination),
    duration: duration
  };
}

var DEFAULT_INTERVAL = 100 / 60;

function noop() {}

var requestAnimationFrame = function () {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop;
  }
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
  // if all else fails, use setTimeout
  function (callback) {
    return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
  };
}();

var cancelAnimationFrame = function () {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop;
  }
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

var DIRECTION_UP = 1;
var DIRECTION_DOWN = -1;
var DIRECTION_LEFT = 1;
var DIRECTION_RIGHT = -1;

var PROBE_DEBOUNCE = 1;

var PROBE_REALTIME = 3;

function warn(msg) {
  console.error('[BScroll warn]: ' + msg);
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error('[BScroll] ' + msg);
  }
}

function coreMixin(BScroll) {
  BScroll.prototype._start = function (e) {
    var _eventType = eventType[e.type];
    if (_eventType !== TOUCH_EVENT) {
      if (e.button !== 0) {
        return;
      }
    }
    if (!this.enabled || this.destroyed || this.initiated && this.initiated !== _eventType) {
      return;
    }
    this.initiated = _eventType;

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }
    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.moved = false;
    this.distX = 0;
    this.distY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.movingDirectionX = 0;
    this.movingDirectionY = 0;
    this.directionLocked = 0;

    this._transitionTime();
    this.startTime = getNow();

    if (this.options.wheel) {
      this.target = e.target;
    }

    this.stop();

    var point = e.touches ? e.touches[0] : e;

    this.startX = this.x;
    this.startY = this.y;
    this.absStartX = this.x;
    this.absStartY = this.y;
    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this.trigger('beforeScrollStart');
  };

  BScroll.prototype._move = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }
    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    var point = e.touches ? e.touches[0] : e;
    var deltaX = point.pageX - this.pointX;
    var deltaY = point.pageY - this.pointY;

    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this.distX += deltaX;
    this.distY += deltaY;

    var absDistX = Math.abs(this.distX);
    var absDistY = Math.abs(this.distY);

    var timestamp = getNow();

    // We need to move at least momentumLimitDistance pixels for the scrolling to initiate
    if (timestamp - this.endTime > this.options.momentumLimitTime && absDistY < this.options.momentumLimitDistance && absDistX < this.options.momentumLimitDistance) {
      return;
    }

    // If you are scrolling in one direction lock the other
    if (!this.directionLocked && !this.options.freeScroll) {
      if (absDistX > absDistY + this.options.directionLockThreshold) {
        this.directionLocked = 'h'; // lock horizontally
      } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
        this.directionLocked = 'v'; // lock vertically
      } else {
        this.directionLocked = 'n'; // no lock
      }
    }

    if (this.directionLocked === 'h') {
      if (this.options.eventPassthrough === 'vertical') {
        e.preventDefault();
      } else if (this.options.eventPassthrough === 'horizontal') {
        this.initiated = false;
        return;
      }
      deltaY = 0;
    } else if (this.directionLocked === 'v') {
      if (this.options.eventPassthrough === 'horizontal') {
        e.preventDefault();
      } else if (this.options.eventPassthrough === 'vertical') {
        this.initiated = false;
        return;
      }
      deltaX = 0;
    }

    deltaX = this.hasHorizontalScroll ? deltaX : 0;
    deltaY = this.hasVerticalScroll ? deltaY : 0;
    this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
    this.movingDirectionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;

    var newX = this.x + deltaX;
    var newY = this.y + deltaY;

    var top = false;
    var bottom = false;
    var left = false;
    var right = false;
    // Slow down or stop if outside of the boundaries
    var bounce = this.options.bounce;
    if (bounce !== false) {
      top = bounce.top === undefined ? true : bounce.top;
      bottom = bounce.bottom === undefined ? true : bounce.bottom;
      left = bounce.left === undefined ? true : bounce.left;
      right = bounce.right === undefined ? true : bounce.right;
    }
    if (newX > this.minScrollX || newX < this.maxScrollX) {
      if (newX > this.minScrollX && left || newX < this.maxScrollX && right) {
        newX = this.x + deltaX / 3;
      } else {
        newX = newX > this.minScrollX ? this.minScrollX : this.maxScrollX;
      }
    }
    if (newY > this.minScrollY || newY < this.maxScrollY) {
      if (newY > this.minScrollY && top || newY < this.maxScrollY && bottom) {
        newY = this.y + deltaY / 3;
      } else {
        newY = newY > this.minScrollY ? this.minScrollY : this.maxScrollY;
      }
    }

    if (!this.moved) {
      this.moved = true;
      this.trigger('scrollStart');
    }

    this._translate(newX, newY);

    if (timestamp - this.startTime > this.options.momentumLimitTime) {
      this.startTime = timestamp;
      this.startX = this.x;
      this.startY = this.y;

      if (this.options.probeType === PROBE_DEBOUNCE) {
        this.trigger('scroll', {
          x: this.x,
          y: this.y
        });
      }
    }

    if (this.options.probeType > PROBE_DEBOUNCE) {
      this.trigger('scroll', {
        x: this.x,
        y: this.y
      });
    }

    var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

    var pX = this.pointX - scrollLeft;
    var pY = this.pointY - scrollTop;

    if (pX > document.documentElement.clientWidth - this.options.momentumLimitDistance || pX < this.options.momentumLimitDistance || pY < this.options.momentumLimitDistance || pY > document.documentElement.clientHeight - this.options.momentumLimitDistance) {
      this._end(e);
    }
  };

  BScroll.prototype._end = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }
    this.initiated = false;

    if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }
    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.trigger('touchEnd', {
      x: this.x,
      y: this.y
    });

    this.isInTransition = false;

    // ensures that the last position is rounded
    var newX = Math.round(this.x);
    var newY = Math.round(this.y);

    var deltaX = newX - this.absStartX;
    var deltaY = newY - this.absStartY;
    this.directionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0;
    this.directionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0;

    // if configure pull down refresh, check it first
    if (this.options.pullDownRefresh && this._checkPullDown()) {
      return;
    }

    // check if it is a click operation
    if (this._checkClick(e)) {
      this.trigger('scrollCancel');
      return;
    }

    // reset if we are outside of the boundaries
    if (this.resetPosition(this.options.bounceTime, ease.bounce)) {
      return;
    }

    this._translate(newX, newY);

    this.endTime = getNow();
    var duration = this.endTime - this.startTime;
    var absDistX = Math.abs(newX - this.startX);
    var absDistY = Math.abs(newY - this.startY);

    // flick
    if (this._events.flick && duration < this.options.flickLimitTime && absDistX < this.options.flickLimitDistance && absDistY < this.options.flickLimitDistance) {
      this.trigger('flick');
      return;
    }

    var time = 0;
    // start momentum animation if needed
    if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
      var top = false;
      var bottom = false;
      var left = false;
      var right = false;
      var bounce = this.options.bounce;
      if (bounce !== false) {
        top = bounce.top === undefined ? true : bounce.top;
        bottom = bounce.bottom === undefined ? true : bounce.bottom;
        left = bounce.left === undefined ? true : bounce.left;
        right = bounce.right === undefined ? true : bounce.right;
      }
      var wrapperWidth = this.directionX === DIRECTION_RIGHT && left || this.directionX === DIRECTION_LEFT && right ? this.wrapperWidth : 0;
      var wrapperHeight = this.directionY === DIRECTION_DOWN && top || this.directionY === DIRECTION_UP && bottom ? this.wrapperHeight : 0;
      var momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.minScrollX, wrapperWidth, this.options) : { destination: newX, duration: 0 };
      var momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options) : { destination: newY, duration: 0 };
      newX = momentumX.destination;
      newY = momentumY.destination;
      time = Math.max(momentumX.duration, momentumY.duration);
      this.isInTransition = true;
    } else {
      if (this.options.wheel) {
        newY = Math.round(newY / this.itemHeight) * this.itemHeight;
        time = this.options.wheel.adjustTime || 400;
      }
    }

    var easing = ease.swipe;
    if (this.options.snap) {
      var snap = this._nearestSnap(newX, newY);
      this.currentPage = snap;
      time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
      newX = snap.x;
      newY = snap.y;

      this.directionX = 0;
      this.directionY = 0;
      easing = this.options.snap.easing || ease.bounce;
    }

    if (newX !== this.x || newY !== this.y) {
      // change easing function when scroller goes out of the boundaries
      if (newX > this.minScrollX || newX < this.maxScrollX || newY > this.minScrollY || newY < this.maxScrollY) {
        easing = ease.swipeBounce;
      }
      this.scrollTo(newX, newY, time, easing);
      return;
    }

    if (this.options.wheel) {
      this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight));
    }
    this.trigger('scrollEnd', {
      x: this.x,
      y: this.y
    });
  };

  BScroll.prototype._checkClick = function (e) {
    // when in the process of pulling down, it should not prevent click
    var preventClick = this.stopFromTransition && !this.pulling;
    this.stopFromTransition = false;

    // we scrolled less than 15 pixels
    if (!this.moved) {
      if (this.options.wheel) {
        if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) {
          var index = Math.abs(Math.round(this.y / this.itemHeight));
          var _offset = Math.round((this.pointY + offsetToBody(this.wrapper).top - this.wrapperHeight / 2) / this.itemHeight);
          this.target = this.items[index + _offset];
        }
        this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, true, true, ease.swipe);
        return true;
      } else {
        if (!preventClick) {
          var _dblclick = this.options.dblclick;
          var dblclickTrigged = false;
          if (_dblclick && this.lastClickTime) {
            var _dblclick$delay = _dblclick.delay,
                delay = _dblclick$delay === undefined ? 300 : _dblclick$delay;

            if (getNow() - this.lastClickTime < delay) {
              dblclickTrigged = true;
              dblclick(e);
            }
          }
          if (this.options.tap) {
            tap(e, this.options.tap);
          }

          if (this.options.click && !preventDefaultException(e.target, this.options.preventDefaultException)) {
            click(e);
          }
          this.lastClickTime = dblclickTrigged ? null : getNow();
          return true;
        }
        return false;
      }
    }
    return false;
  };

  BScroll.prototype._resize = function () {
    var _this = this;

    if (!this.enabled) {
      return;
    }
    // fix a scroll problem under Android condition
    if (isAndroid) {
      this.wrapper.scrollTop = 0;
    }
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(function () {
      _this.refresh();
    }, this.options.resizePolling);
  };

  BScroll.prototype._startProbe = function () {
    cancelAnimationFrame(this.probeTimer);
    this.probeTimer = requestAnimationFrame(probe);

    var me = this;

    function probe() {
      var pos = me.getComputedPosition();
      me.trigger('scroll', pos);
      if (!me.isInTransition) {
        me.trigger('scrollEnd', pos);
        return;
      }
      me.probeTimer = requestAnimationFrame(probe);
    }
  };

  BScroll.prototype._transitionTime = function () {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    this.scrollerStyle[style.transitionDuration] = time + 'ms';

    if (this.options.wheel) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style[style.transitionDuration] = time + 'ms';
      }
    }

    if (this.indicators) {
      for (var _i = 0; _i < this.indicators.length; _i++) {
        this.indicators[_i].transitionTime(time);
      }
    }
  };

  BScroll.prototype._transitionTimingFunction = function (easing) {
    this.scrollerStyle[style.transitionTimingFunction] = easing;

    if (this.options.wheel) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style[style.transitionTimingFunction] = easing;
      }
    }

    if (this.indicators) {
      for (var _i2 = 0; _i2 < this.indicators.length; _i2++) {
        this.indicators[_i2].transitionTimingFunction(easing);
      }
    }
  };

  BScroll.prototype._transitionEnd = function (e) {
    if (e.target !== this.scroller || !this.isInTransition) {
      return;
    }

    this._transitionTime();
    var needReset = !this.pulling || this.movingDirectionY === DIRECTION_UP;
    if (needReset && !this.resetPosition(this.options.bounceTime, ease.bounce)) {
      this.isInTransition = false;
      if (this.options.probeType !== PROBE_REALTIME) {
        this.trigger('scrollEnd', {
          x: this.x,
          y: this.y
        });
      }
    }
  };

  BScroll.prototype._translate = function (x, y, scale) {
    assert(!isUndef(x) && !isUndef(y), 'Translate x or y is null or undefined.');
    if (isUndef(scale)) {
      scale = this.scale;
    }
    if (this.options.useTransform) {
      this.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')' + this.translateZ;
    } else {
      x = Math.round(x);
      y = Math.round(y);
      this.scrollerStyle.left = x + 'px';
      this.scrollerStyle.top = y + 'px';
    }

    if (this.options.wheel) {
      var _options$wheel$rotate = this.options.wheel.rotate,
          rotate = _options$wheel$rotate === undefined ? 25 : _options$wheel$rotate;

      for (var i = 0; i < this.items.length; i++) {
        var deg = rotate * (y / this.itemHeight + i);
        this.items[i].style[style.transform] = 'rotateX(' + deg + 'deg)';
      }
    }

    this.x = x;
    this.y = y;
    this.setScale(scale);

    if (this.indicators) {
      for (var _i3 = 0; _i3 < this.indicators.length; _i3++) {
        this.indicators[_i3].updatePosition();
      }
    }
  };

  BScroll.prototype._animate = function (destX, destY, duration, easingFn) {
    var me = this;
    var startX = this.x;
    var startY = this.y;
    var startScale = this.lastScale;
    var destScale = this.scale;
    var startTime = getNow();
    var destTime = startTime + duration;

    function step() {
      var now = getNow();

      if (now >= destTime) {
        me.isAnimating = false;
        me._translate(destX, destY, destScale);

        me.trigger('scroll', {
          x: me.x,
          y: me.y
        });

        if (!me.pulling && !me.resetPosition(me.options.bounceTime)) {
          me.trigger('scrollEnd', {
            x: me.x,
            y: me.y
          });
        }
        return;
      }
      now = (now - startTime) / duration;
      var easing = easingFn(now);
      var newX = (destX - startX) * easing + startX;
      var newY = (destY - startY) * easing + startY;
      var newScale = (destScale - startScale) * easing + startScale;

      me._translate(newX, newY, newScale);

      if (me.isAnimating) {
        me.animateTimer = requestAnimationFrame(step);
      }

      if (me.options.probeType === PROBE_REALTIME) {
        me.trigger('scroll', {
          x: me.x,
          y: me.y
        });
      }
    }

    this.isAnimating = true;
    cancelAnimationFrame(this.animateTimer);
    step();
  };

  BScroll.prototype.scrollBy = function (x, y) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;

    x = this.x + x;
    y = this.y + y;

    this.scrollTo(x, y, time, easing);
  };

  BScroll.prototype.scrollTo = function (x, y) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ease.bounce;

    this.isInTransition = this.options.useTransition && time > 0 && (x !== this.x || y !== this.y);

    if (!time || this.options.useTransition) {
      this._transitionTimingFunction(easing.style);
      this._transitionTime(time);
      this._translate(x, y);

      if (time && this.options.probeType === PROBE_REALTIME) {
        this._startProbe();
      }

      if (!time && (x !== this.x || y !== this.y)) {
        this.trigger('scroll', {
          x: x,
          y: y
        });
        // force reflow to put everything in position
        this._reflow = document.body.offsetHeight;
        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
          this.trigger('scrollEnd', {
            x: x,
            y: y
          });
        }
      }

      if (this.options.wheel) {
        if (y > this.minScrollY) {
          this.selectedIndex = 0;
        } else if (y < this.maxScrollY) {
          this.selectedIndex = this.items.length - 1;
        } else {
          this.selectedIndex = Math.round(Math.abs(y / this.itemHeight));
        }
      }
    } else {
      this._animate(x, y, time, easing.fn);
    }
  };

  BScroll.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
    if (!el) {
      return;
    }
    el = el.nodeType ? el : this.scroller.querySelector(el);

    if (this.options.wheel && el.className !== this.options.wheel.wheelItemClass) {
      return;
    }

    var pos = offset(el);
    pos.left -= this.wrapperOffset.left;
    pos.top -= this.wrapperOffset.top;

    // if offsetX/Y are true we center the element to the screen
    if (offsetX === true) {
      offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
    }
    if (offsetY === true) {
      offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
    }

    pos.left -= offsetX || 0;
    pos.top -= offsetY || 0;
    pos.left = pos.left > this.minScrollX ? this.minScrollX : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
    pos.top = pos.top > this.minScrollY ? this.minScrollY : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

    if (this.options.wheel) {
      pos.top = Math.round(pos.top / this.itemHeight) * this.itemHeight;
    }

    this.scrollTo(pos.left, pos.top, time, easing);
  };

  BScroll.prototype.resetPosition = function () {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var easeing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ease.bounce;

    var x = this.x;
    var roundX = Math.round(x);
    if (!this.hasHorizontalScroll || roundX > this.minScrollX) {
      x = this.minScrollX;
    } else if (roundX < this.maxScrollX) {
      x = this.maxScrollX;
    }

    var y = this.y;
    var roundY = Math.round(y);
    if (!this.hasVerticalScroll || roundY > this.minScrollY) {
      y = this.minScrollY;
    } else if (roundY < this.maxScrollY) {
      y = this.maxScrollY;
    }

    if (x === this.x && y === this.y) {
      return false;
    }

    this.scrollTo(x, y, time, easeing);

    return true;
  };

  BScroll.prototype.getComputedPosition = function () {
    var matrix = window.getComputedStyle(this.scroller, null);
    var x = void 0;
    var y = void 0;

    if (this.options.useTransform) {
      matrix = matrix[style.transform].split(')')[0].split(', ');
      x = +(matrix[12] || matrix[4]);
      y = +(matrix[13] || matrix[5]);
    } else {
      x = +matrix.left.replace(/[^-\d.]/g, '');
      y = +matrix.top.replace(/[^-\d.]/g, '');
    }

    return {
      x: x,
      y: y
    };
  };

  BScroll.prototype.stop = function () {
    if (this.options.useTransition && this.isInTransition) {
      this.isInTransition = false;
      cancelAnimationFrame(this.probeTimer);
      var pos = this.getComputedPosition();
      this._translate(pos.x, pos.y);
      if (this.options.wheel) {
        this.target = this.items[Math.round(-pos.y / this.itemHeight)];
      } else {
        this.trigger('scrollEnd', {
          x: this.x,
          y: this.y
        });
      }
      this.stopFromTransition = true;
    } else if (!this.options.useTransition && this.isAnimating) {
      this.isAnimating = false;
      cancelAnimationFrame(this.animateTimer);
      this.trigger('scrollEnd', {
        x: this.x,
        y: this.y
      });
      this.stopFromTransition = true;
    }
  };

  BScroll.prototype.destroy = function () {
    this.destroyed = true;
    this.trigger('destroy');
    if (this.options.useTransition) {
      cancelAnimationFrame(this.probeTimer);
    } else {
      cancelAnimationFrame(this.animateTimer);
    }
    this._removeDOMEvents();
    // remove custom events
    this._events = {};
  };
}

function snapMixin(BScroll) {
  BScroll.prototype._initSnap = function () {
    var _this = this;

    this.currentPage = {};
    var snap = this.options.snap;

    if (snap.loop) {
      var children = this.scroller.children;
      if (children.length > 1) {
        prepend(children[children.length - 1].cloneNode(true), this.scroller);
        this.scroller.appendChild(children[1].cloneNode(true));
      } else {
        // Loop does not make any sense if there is only one child.
        snap.loop = false;
      }
    }

    var el = snap.el;
    if (typeof el === 'string') {
      el = this.scroller.querySelectorAll(el);
    }

    this.on('refresh', function () {
      _this.pages = [];

      if (!_this.wrapperWidth || !_this.wrapperHeight || !_this.scrollerWidth || !_this.scrollerHeight) {
        return;
      }

      var stepX = snap.stepX || _this.wrapperWidth;
      var stepY = snap.stepY || _this.wrapperHeight;

      var x = 0;
      var y = void 0;
      var cx = void 0;
      var cy = void 0;
      var i = 0;
      var l = void 0;
      var m = 0;
      var n = void 0;
      var rect = void 0;
      if (!el) {
        cx = Math.round(stepX / 2);
        cy = Math.round(stepY / 2);

        while (x > -_this.scrollerWidth) {
          _this.pages[i] = [];
          l = 0;
          y = 0;

          while (y > -_this.scrollerHeight) {
            _this.pages[i][l] = {
              x: Math.max(x, _this.maxScrollX),
              y: Math.max(y, _this.maxScrollY),
              width: stepX,
              height: stepY,
              cx: x - cx,
              cy: y - cy
            };

            y -= stepY;
            l++;
          }

          x -= stepX;
          i++;
        }
      } else {
        l = el.length;
        n = -1;

        for (; i < l; i++) {
          rect = getRect(el[i]);
          if (i === 0 || rect.left <= getRect(el[i - 1]).left) {
            m = 0;
            n++;
          }

          if (!_this.pages[m]) {
            _this.pages[m] = [];
          }

          x = Math.max(-rect.left, _this.maxScrollX);
          y = Math.max(-rect.top, _this.maxScrollY);
          cx = x - Math.round(rect.width / 2);
          cy = y - Math.round(rect.height / 2);

          _this.pages[m][n] = {
            x: x,
            y: y,
            width: rect.width,
            height: rect.height,
            cx: cx,
            cy: cy
          };

          if (x > _this.maxScrollX) {
            m++;
          }
        }
      }

      _this._checkSnapLoop();

      var initPageX = snap._loopX ? 1 : 0;
      var initPageY = snap._loopY ? 1 : 0;
      _this._goToPage(_this.currentPage.pageX || initPageX, _this.currentPage.pageY || initPageY, 0);

      // Update snap threshold if needed.
      var snapThreshold = snap.threshold;
      if (snapThreshold % 1 === 0) {
        _this.snapThresholdX = snapThreshold;
        _this.snapThresholdY = snapThreshold;
      } else {
        _this.snapThresholdX = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].width * snapThreshold);
        _this.snapThresholdY = Math.round(_this.pages[_this.currentPage.pageX][_this.currentPage.pageY].height * snapThreshold);
      }
    });

    this.on('scrollEnd', function () {
      if (snap.loop) {
        if (snap._loopX) {
          if (_this.currentPage.pageX === 0) {
            _this._goToPage(_this.pages.length - 2, _this.currentPage.pageY, 0);
          }
          if (_this.currentPage.pageX === _this.pages.length - 1) {
            _this._goToPage(1, _this.currentPage.pageY, 0);
          }
        } else {
          if (_this.currentPage.pageY === 0) {
            _this._goToPage(_this.currentPage.pageX, _this.pages[0].length - 2, 0);
          }
          if (_this.currentPage.pageY === _this.pages[0].length - 1) {
            _this._goToPage(_this.currentPage.pageX, 1, 0);
          }
        }
      }
    });

    if (snap.listenFlick !== false) {
      this.on('flick', function () {
        var time = snap.speed || Math.max(Math.max(Math.min(Math.abs(_this.x - _this.startX), 1000), Math.min(Math.abs(_this.y - _this.startY), 1000)), 300);

        _this._goToPage(_this.currentPage.pageX + _this.directionX, _this.currentPage.pageY + _this.directionY, time);
      });
    }

    this.on('destroy', function () {
      if (snap.loop) {
        var _children = _this.scroller.children;
        if (_children.length > 2) {
          removeChild(_this.scroller, _children[_children.length - 1]);
          removeChild(_this.scroller, _children[0]);
        }
      }
    });
  };

  BScroll.prototype._checkSnapLoop = function () {
    var snap = this.options.snap;

    if (!snap.loop || !this.pages || !this.pages.length) {
      return;
    }

    if (this.pages.length > 1) {
      snap._loopX = true;
    }
    if (this.pages[0] && this.pages[0].length > 1) {
      snap._loopY = true;
    }
    if (snap._loopX && snap._loopY) {
      warn('Loop does not support two direction at the same time.');
    }
  };

  BScroll.prototype._nearestSnap = function (x, y) {
    if (!this.pages.length) {
      return { x: 0, y: 0, pageX: 0, pageY: 0 };
    }

    var i = 0;
    // Check if we exceeded the snap threshold
    if (Math.abs(x - this.absStartX) <= this.snapThresholdX && Math.abs(y - this.absStartY) <= this.snapThresholdY) {
      return this.currentPage;
    }

    if (x > this.minScrollX) {
      x = this.minScrollX;
    } else if (x < this.maxScrollX) {
      x = this.maxScrollX;
    }

    if (y > this.minScrollY) {
      y = this.minScrollY;
    } else if (y < this.maxScrollY) {
      y = this.maxScrollY;
    }

    var l = this.pages.length;
    for (; i < l; i++) {
      if (x >= this.pages[i][0].cx) {
        x = this.pages[i][0].x;
        break;
      }
    }

    l = this.pages[i].length;

    var m = 0;
    for (; m < l; m++) {
      if (y >= this.pages[0][m].cy) {
        y = this.pages[0][m].y;
        break;
      }
    }

    if (i === this.currentPage.pageX) {
      i += this.directionX;

      if (i < 0) {
        i = 0;
      } else if (i >= this.pages.length) {
        i = this.pages.length - 1;
      }

      x = this.pages[i][0].x;
    }

    if (m === this.currentPage.pageY) {
      m += this.directionY;

      if (m < 0) {
        m = 0;
      } else if (m >= this.pages[0].length) {
        m = this.pages[0].length - 1;
      }

      y = this.pages[0][m].y;
    }

    return {
      x: x,
      y: y,
      pageX: i,
      pageY: m
    };
  };

  BScroll.prototype._goToPage = function (x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var time = arguments[2];
    var easing = arguments[3];

    var snap = this.options.snap;

    if (!snap || !this.pages || !this.pages.length) {
      return;
    }

    easing = easing || snap.easing || ease.bounce;

    if (x >= this.pages.length) {
      x = this.pages.length - 1;
    } else if (x < 0) {
      x = 0;
    }

    if (!this.pages[x]) {
      return;
    }

    if (y >= this.pages[x].length) {
      y = this.pages[x].length - 1;
    } else if (y < 0) {
      y = 0;
    }

    var posX = this.pages[x][y].x;
    var posY = this.pages[x][y].y;

    time = time === undefined ? snap.speed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

    this.currentPage = {
      x: posX,
      y: posY,
      pageX: x,
      pageY: y
    };
    this.scrollTo(posX, posY, time, easing);
  };

  BScroll.prototype.goToPage = function (x, y, time, easing) {
    var snap = this.options.snap;
    if (!snap || !this.pages || !this.pages.length) {
      return;
    }

    if (snap.loop) {
      var len = void 0;
      if (snap._loopX) {
        len = this.pages.length - 2;
        if (x >= len) {
          x = len - 1;
        } else if (x < 0) {
          x = 0;
        }
        x += 1;
      } else {
        len = this.pages[0].length - 2;
        if (y >= len) {
          y = len - 1;
        } else if (y < 0) {
          y = 0;
        }
        y += 1;
      }
    }
    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.next = function (time, easing) {
    var snap = this.options.snap;
    if (!snap) {
      return;
    }

    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;

    x++;
    if (x >= this.pages.length && this.hasVerticalScroll) {
      x = 0;
      y++;
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.prev = function (time, easing) {
    var snap = this.options.snap;
    if (!snap) {
      return;
    }

    var x = this.currentPage.pageX;
    var y = this.currentPage.pageY;

    x--;
    if (x < 0 && this.hasVerticalScroll) {
      x = 0;
      y--;
    }

    this._goToPage(x, y, time, easing);
  };

  BScroll.prototype.getCurrentPage = function () {
    var snap = this.options.snap;
    if (!snap) {
      return null;
    }

    if (snap.loop) {
      var currentPage = void 0;
      if (snap._loopX) {
        currentPage = extend({}, this.currentPage, {
          pageX: this.currentPage.pageX - 1
        });
      } else {
        currentPage = extend({}, this.currentPage, {
          pageY: this.currentPage.pageY - 1
        });
      }
      return currentPage;
    }
    return this.currentPage;
  };
}

function wheelMixin(BScroll) {
  BScroll.prototype.wheelTo = function () {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (this.options.wheel) {
      this.y = -index * this.itemHeight;
      this.scrollTo(0, this.y);
    }
  };

  BScroll.prototype.getSelectedIndex = function () {
    return this.options.wheel && this.selectedIndex;
  };

  BScroll.prototype._initWheel = function () {
    var wheel = this.options.wheel;
    if (!wheel.wheelWrapperClass) {
      wheel.wheelWrapperClass = 'wheel-scroll';
    }
    if (!wheel.wheelItemClass) {
      wheel.wheelItemClass = 'wheel-item';
    }
    if (wheel.selectedIndex === undefined) {
      wheel.selectedIndex = 0;
      warn('wheel option selectedIndex is required!');
    }
  };
}

var INDICATOR_MIN_LEN = 8;

function scrollbarMixin(BScroll) {
  BScroll.prototype._initScrollbar = function () {
    var _this = this;

    var _options$scrollbar = this.options.scrollbar,
        _options$scrollbar$fa = _options$scrollbar.fade,
        fade = _options$scrollbar$fa === undefined ? true : _options$scrollbar$fa,
        _options$scrollbar$in = _options$scrollbar.interactive,
        interactive = _options$scrollbar$in === undefined ? false : _options$scrollbar$in;

    this.indicators = [];
    var indicator = void 0;

    if (this.options.scrollX) {
      indicator = {
        el: createScrollbar('horizontal'),
        direction: 'horizontal',
        fade: fade,
        interactive: interactive
      };
      this._insertScrollBar(indicator.el);

      this.indicators.push(new Indicator(this, indicator));
    }

    if (this.options.scrollY) {
      indicator = {
        el: createScrollbar('vertical'),
        direction: 'vertical',
        fade: fade,
        interactive: interactive
      };
      this._insertScrollBar(indicator.el);
      this.indicators.push(new Indicator(this, indicator));
    }

    this.on('refresh', function () {
      for (var i = 0; i < _this.indicators.length; i++) {
        _this.indicators[i].refresh();
      }
    });

    if (fade) {
      this.on('scrollEnd', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade();
        }
      });

      this.on('scrollCancel', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade();
        }
      });

      this.on('scrollStart', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade(true);
        }
      });

      this.on('beforeScrollStart', function () {
        for (var i = 0; i < _this.indicators.length; i++) {
          _this.indicators[i].fade(true, true);
        }
      });
    }

    this.on('destroy', function () {
      _this._removeScrollBars();
    });
  };

  BScroll.prototype._insertScrollBar = function (scrollbar) {
    this.wrapper.appendChild(scrollbar);
  };

  BScroll.prototype._removeScrollBars = function () {
    for (var i = 0; i < this.indicators.length; i++) {
      this.indicators[i].destroy();
    }
  };
}

function createScrollbar(direction) {
  var scrollbar = document.createElement('div');
  var indicator = document.createElement('div');

  scrollbar.style.cssText = 'position:absolute;z-index:9999;pointerEvents:none';
  indicator.style.cssText = 'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';

  indicator.className = 'bscroll-indicator';

  if (direction === 'horizontal') {
    scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
    indicator.style.height = '100%';
    scrollbar.className = 'bscroll-horizontal-scrollbar';
  } else {
    scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
    indicator.style.width = '100%';
    scrollbar.className = 'bscroll-vertical-scrollbar';
  }

  scrollbar.style.cssText += ';overflow:hidden';
  scrollbar.appendChild(indicator);

  return scrollbar;
}

function Indicator(scroller, options) {
  this.wrapper = options.el;
  this.wrapperStyle = this.wrapper.style;
  this.indicator = this.wrapper.children[0];
  this.indicatorStyle = this.indicator.style;
  this.scroller = scroller;
  this.direction = options.direction;
  if (options.fade) {
    this.visible = 0;
    this.wrapperStyle.opacity = '0';
  } else {
    this.visible = 1;
  }

  this.sizeRatioX = 1;
  this.sizeRatioY = 1;
  this.maxPosX = 0;
  this.maxPosY = 0;
  this.x = 0;
  this.y = 0;

  if (options.interactive) {
    this._addDOMEvents();
  }
}

Indicator.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'touchstart':
    case 'mousedown':
      this._start(e);
      break;
    case 'touchmove':
    case 'mousemove':
      this._move(e);
      break;
    case 'touchend':
    case 'mouseup':
    case 'touchcancel':
    case 'mousecancel':
      this._end(e);
      break;
  }
};

Indicator.prototype.refresh = function () {
  if (this._shouldShow()) {
    this.transitionTime();
    this._calculate();
    this.updatePosition();
  }
};

Indicator.prototype.fade = function (visible, hold) {
  var _this2 = this;

  if (hold && !this.visible) {
    return;
  }

  var time = visible ? 250 : 500;

  visible = visible ? '1' : '0';

  this.wrapperStyle[style.transitionDuration] = time + 'ms';

  clearTimeout(this.fadeTimeout);
  this.fadeTimeout = setTimeout(function () {
    _this2.wrapperStyle.opacity = visible;
    _this2.visible = +visible;
  }, 0);
};

Indicator.prototype.updatePosition = function () {
  if (this.direction === 'vertical') {
    var y = Math.round(this.sizeRatioY * this.scroller.y);

    if (y < 0) {
      this.transitionTime(500);
      var height = Math.max(this.indicatorHeight + y * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.height = height + 'px';
      y = 0;
    } else if (y > this.maxPosY) {
      this.transitionTime(500);
      var _height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.height = _height + 'px';
      y = this.maxPosY + this.indicatorHeight - _height;
    } else {
      this.indicatorStyle.height = this.indicatorHeight + 'px';
    }
    this.y = y;

    if (this.scroller.options.useTransform) {
      this.indicatorStyle[style.transform] = 'translateY(' + y + 'px)' + this.scroller.translateZ;
    } else {
      this.indicatorStyle.top = y + 'px';
    }
  } else {
    var x = Math.round(this.sizeRatioX * this.scroller.x);

    if (x < 0) {
      this.transitionTime(500);
      var width = Math.max(this.indicatorWidth + x * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.width = width + 'px';
      x = 0;
    } else if (x > this.maxPosX) {
      this.transitionTime(500);
      var _width = Math.max(this.indicatorWidth - (x - this.maxPosX) * 3, INDICATOR_MIN_LEN);
      this.indicatorStyle.width = _width + 'px';
      x = this.maxPosX + this.indicatorWidth - _width;
    } else {
      this.indicatorStyle.width = this.indicatorWidth + 'px';
    }

    this.x = x;

    if (this.scroller.options.useTransform) {
      this.indicatorStyle[style.transform] = 'translateX(' + x + 'px)' + this.scroller.translateZ;
    } else {
      this.indicatorStyle.left = x + 'px';
    }
  }
};

Indicator.prototype.transitionTime = function () {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  this.indicatorStyle[style.transitionDuration] = time + 'ms';
};

Indicator.prototype.transitionTimingFunction = function (easing) {
  this.indicatorStyle[style.transitionTimingFunction] = easing;
};

Indicator.prototype.destroy = function () {
  this._removeDOMEvents();
  this.wrapper.parentNode.removeChild(this.wrapper);
};

Indicator.prototype._start = function (e) {
  var point = e.touches ? e.touches[0] : e;

  e.preventDefault();
  e.stopPropagation();

  this.transitionTime();

  this.initiated = true;
  this.moved = false;
  this.lastPointX = point.pageX;
  this.lastPointY = point.pageY;

  this.startTime = getNow();

  this._handleMoveEvents(addEvent);
  this.scroller.trigger('beforeScrollStart');
};

Indicator.prototype._move = function (e) {
  var point = e.touches ? e.touches[0] : e;

  e.preventDefault();
  e.stopPropagation();

  if (!this.moved) {
    this.scroller.trigger('scrollStart');
  }

  this.moved = true;

  var deltaX = point.pageX - this.lastPointX;
  this.lastPointX = point.pageX;

  var deltaY = point.pageY - this.lastPointY;
  this.lastPointY = point.pageY;

  var newX = this.x + deltaX;
  var newY = this.y + deltaY;

  this._pos(newX, newY);
};

Indicator.prototype._end = function (e) {
  if (!this.initiated) {
    return;
  }
  this.initiated = false;

  e.preventDefault();
  e.stopPropagation();

  this._handleMoveEvents(removeEvent);

  var snapOption = this.scroller.options.snap;
  if (snapOption) {
    var speed = snapOption.speed,
        _snapOption$easing = snapOption.easing,
        easing = _snapOption$easing === undefined ? ease.bounce : _snapOption$easing;

    var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

    var time = speed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

    if (this.scroller.x !== snap.x || this.scroller.y !== snap.y) {
      this.scroller.directionX = 0;
      this.scroller.directionY = 0;
      this.scroller.currentPage = snap;
      this.scroller.scrollTo(snap.x, snap.y, time, easing);
    }
  }

  if (this.moved) {
    this.scroller.trigger('scrollEnd', {
      x: this.scroller.x,
      y: this.scroller.y
    });
  }
};

Indicator.prototype._pos = function (x, y) {
  if (x < 0) {
    x = 0;
  } else if (x > this.maxPosX) {
    x = this.maxPosX;
  }

  if (y < 0) {
    y = 0;
  } else if (y > this.maxPosY) {
    y = this.maxPosY;
  }

  x = Math.round(x / this.sizeRatioX);
  y = Math.round(y / this.sizeRatioY);

  this.scroller.scrollTo(x, y);
  this.scroller.trigger('scroll', {
    x: this.scroller.x,
    y: this.scroller.y
  });
};

Indicator.prototype._shouldShow = function () {
  if (this.direction === 'vertical' && this.scroller.hasVerticalScroll || this.direction === 'horizontal' && this.scroller.hasHorizontalScroll) {
    this.wrapper.style.display = '';
    return true;
  }
  this.wrapper.style.display = 'none';
  return false;
};

Indicator.prototype._calculate = function () {
  if (this.direction === 'vertical') {
    var wrapperHeight = this.wrapper.clientHeight;
    this.indicatorHeight = Math.max(Math.round(wrapperHeight * wrapperHeight / (this.scroller.scrollerHeight || wrapperHeight || 1)), INDICATOR_MIN_LEN);
    this.indicatorStyle.height = this.indicatorHeight + 'px';

    this.maxPosY = wrapperHeight - this.indicatorHeight;

    this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY;
  } else {
    var wrapperWidth = this.wrapper.clientWidth;
    this.indicatorWidth = Math.max(Math.round(wrapperWidth * wrapperWidth / (this.scroller.scrollerWidth || wrapperWidth || 1)), INDICATOR_MIN_LEN);
    this.indicatorStyle.width = this.indicatorWidth + 'px';

    this.maxPosX = wrapperWidth - this.indicatorWidth;

    this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX;
  }
};

Indicator.prototype._addDOMEvents = function () {
  var eventOperation = addEvent;
  this._handleDOMEvents(eventOperation);
};

Indicator.prototype._removeDOMEvents = function () {
  var eventOperation = removeEvent;
  this._handleDOMEvents(eventOperation);
  this._handleMoveEvents(eventOperation);
};

Indicator.prototype._handleMoveEvents = function (eventOperation) {
  if (!this.scroller.options.disableTouch) {
    eventOperation(window, 'touchmove', this);
  }
  if (!this.scroller.options.disableMouse) {
    eventOperation(window, 'mousemove', this);
  }
};

Indicator.prototype._handleDOMEvents = function (eventOperation) {
  if (!this.scroller.options.disableTouch) {
    eventOperation(this.indicator, 'touchstart', this);
    eventOperation(window, 'touchend', this);
  }
  if (!this.scroller.options.disableMouse) {
    eventOperation(this.indicator, 'mousedown', this);
    eventOperation(window, 'mouseup', this);
  }
};

function pullDownMixin(BScroll) {
  BScroll.prototype._initPullDown = function () {
    // must watch scroll in real time
    this.options.probeType = PROBE_REALTIME;
  };

  BScroll.prototype._checkPullDown = function () {
    var _options$pullDownRefr = this.options.pullDownRefresh,
        _options$pullDownRefr2 = _options$pullDownRefr.threshold,
        threshold = _options$pullDownRefr2 === undefined ? 90 : _options$pullDownRefr2,
        _options$pullDownRefr3 = _options$pullDownRefr.stop,
        stop = _options$pullDownRefr3 === undefined ? 40 : _options$pullDownRefr3;

    // check if a real pull down action

    if (this.directionY !== DIRECTION_DOWN || this.y < threshold) {
      return false;
    }

    if (!this.pulling) {
      this.pulling = true;
      this.trigger('pullingDown');
    }
    this.scrollTo(this.x, stop, this.options.bounceTime, ease.bounce);

    return this.pulling;
  };

  BScroll.prototype.finishPullDown = function () {
    this.pulling = false;
    this.resetPosition(this.options.bounceTime, ease.bounce);
  };

  BScroll.prototype.openPullDown = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.options.pullDownRefresh = config;
    this._initPullDown();
  };

  BScroll.prototype.closePullDown = function () {
    this.options.pullDownRefresh = false;
  };
}

function pullUpMixin(BScroll) {
  BScroll.prototype._initPullUp = function () {
    // must watch scroll in real time
    this.options.probeType = PROBE_REALTIME;

    this.pullupWatching = false;
    this._watchPullUp();
  };

  BScroll.prototype._watchPullUp = function () {
    if (this.pullupWatching) {
      return;
    }
    this.pullupWatching = true;
    this.on('scroll', this._checkToEnd);
  };

  BScroll.prototype._checkToEnd = function (pos) {
    var _this = this;

    var _options$pullUpLoad$t = this.options.pullUpLoad.threshold,
        threshold = _options$pullUpLoad$t === undefined ? 0 : _options$pullUpLoad$t;

    if (this.movingDirectionY === DIRECTION_UP && pos.y <= this.maxScrollY + threshold) {
      // reset pullupWatching status after scroll end.
      this.once('scrollEnd', function () {
        _this.pullupWatching = false;
      });
      this.trigger('pullingUp');
      this.off('scroll', this._checkToEnd);
    }
  };

  BScroll.prototype.finishPullUp = function () {
    var _this2 = this;

    if (this.pullupWatching) {
      this.once('scrollEnd', function () {
        _this2._watchPullUp();
      });
    } else {
      this._watchPullUp();
    }
  };

  BScroll.prototype.openPullUp = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.options.pullUpLoad = config;
    this._initPullUp();
  };

  BScroll.prototype.closePullUp = function () {
    this.options.pullUpLoad = false;
    if (!this.pullupWatching) {
      return;
    }
    this.pullupWatching = false;
    this.off('scroll', this._checkToEnd);
  };
}

function mouseWheelMixin(BScroll) {
  BScroll.prototype._initMouseWheel = function () {
    var _this = this;

    this._handleMouseWheelEvent(addEvent);

    this.on('destroy', function () {
      clearTimeout(_this.mouseWheelTimer);
      _this._handleMouseWheelEvent(removeEvent);
    });

    this.firstWheelOpreation = true;
  };

  BScroll.prototype._handleMouseWheelEvent = function (eventOperation) {
    eventOperation(this.wrapper, 'wheel', this);
    eventOperation(this.wrapper, 'mousewheel', this);
    eventOperation(this.wrapper, 'DOMMouseScroll', this);
  };

  BScroll.prototype._onMouseWheel = function (e) {
    var _this2 = this;

    if (!this.enabled) {
      return;
    }
    e.preventDefault();

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    if (this.firstWheelOpreation) {
      this.trigger('scrollStart');
    }
    this.firstWheelOpreation = false;

    var _options$mouseWheel = this.options.mouseWheel,
        _options$mouseWheel$s = _options$mouseWheel.speed,
        speed = _options$mouseWheel$s === undefined ? 20 : _options$mouseWheel$s,
        _options$mouseWheel$i = _options$mouseWheel.invert,
        invert = _options$mouseWheel$i === undefined ? false : _options$mouseWheel$i,
        _options$mouseWheel$e = _options$mouseWheel.easeTime,
        easeTime = _options$mouseWheel$e === undefined ? 300 : _options$mouseWheel$e;

    clearTimeout(this.mouseWheelTimer);
    this.mouseWheelTimer = setTimeout(function () {
      if (!_this2.options.snap && !easeTime) {
        _this2.trigger('scrollEnd', {
          x: _this2.x,
          y: _this2.y
        });
      }
      _this2.firstWheelOpreation = true;
    }, 400);

    var wheelDeltaX = void 0;
    var wheelDeltaY = void 0;

    switch (true) {
      case 'deltaX' in e:
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * speed;
          wheelDeltaY = -e.deltaY * speed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
        break;
      case 'wheelDeltaX' in e:
        wheelDeltaX = e.wheelDeltaX / 120 * speed;
        wheelDeltaY = e.wheelDeltaY / 120 * speed;
        break;
      case 'wheelDelta' in e:
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
        break;
      case 'detail' in e:
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
        break;
      default:
        return;
    }

    var direction = invert ? -1 : 1;
    wheelDeltaX *= direction;
    wheelDeltaY *= direction;

    if (!this.hasVerticalScroll) {
      wheelDeltaX = wheelDeltaY;
      wheelDeltaY = 0;
    }

    var newX = void 0;
    var newY = void 0;
    if (this.options.snap) {
      newX = this.currentPage.pageX;
      newY = this.currentPage.pageY;

      if (wheelDeltaX > 0) {
        newX--;
      } else if (wheelDeltaX < 0) {
        newX++;
      }

      if (wheelDeltaY > 0) {
        newY--;
      } else if (wheelDeltaY < 0) {
        newY++;
      }

      this._goToPage(newX, newY);
      return;
    }

    newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
    newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

    this.movingDirectionX = this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
    this.movingDirectionY = this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

    if (newX > this.minScrollX) {
      newX = this.minScrollX;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > this.minScrollY) {
      newY = this.minScrollY;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    this.scrollTo(newX, newY, easeTime, ease.swipe);
    this.trigger('scroll', {
      x: this.x,
      y: this.y
    });
  };
}

function zoomMixin(BScroll) {
  BScroll.prototype._initZoom = function () {
    var _options$zoom = this.options.zoom,
        _options$zoom$start = _options$zoom.start,
        start = _options$zoom$start === undefined ? 1 : _options$zoom$start,
        _options$zoom$min = _options$zoom.min,
        min = _options$zoom$min === undefined ? 1 : _options$zoom$min,
        _options$zoom$max = _options$zoom.max,
        max = _options$zoom$max === undefined ? 4 : _options$zoom$max;

    this.scale = Math.min(Math.max(start, min), max);
    this.setScale(this.scale);
    this.scrollerStyle[style.transformOrigin] = '0 0';
  };

  BScroll.prototype._zoomTo = function (scale, originX, originY, startScale) {
    this.scaled = true;

    var lastScale = scale / (startScale || this.scale);
    this.setScale(scale);

    this.refresh();

    var newX = Math.round(this.startX - (originX - this.relativeX) * (lastScale - 1));
    var newY = Math.round(this.startY - (originY - this.relativeY) * (lastScale - 1));

    if (newX > this.minScrollX) {
      newX = this.minScrollX;
    } else if (newX < this.maxScrollX) {
      newX = this.maxScrollX;
    }

    if (newY > this.minScrollY) {
      newY = this.minScrollY;
    } else if (newY < this.maxScrollY) {
      newY = this.maxScrollY;
    }

    if (this.x !== newX || this.y !== newY) {
      this.scrollTo(newX, newY, this.options.bounceTime);
    }

    this.scaled = false;
  };

  BScroll.prototype.zoomTo = function (scale, x, y) {
    var _offsetToBody = offsetToBody(this.wrapper),
        left = _offsetToBody.left,
        top = _offsetToBody.top;

    var originX = x + left - this.x;
    var originY = y + top - this.y;
    this._zoomTo(scale, originX, originY);
  };

  BScroll.prototype._zoomStart = function (e) {
    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);

    this.startDistance = getDistance(deltaX, deltaY);
    this.startScale = this.scale;

    var _offsetToBody2 = offsetToBody(this.wrapper),
        left = _offsetToBody2.left,
        top = _offsetToBody2.top;

    this.originX = Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 + left - this.x;
    this.originY = Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 + top - this.y;

    this.trigger('zoomStart');
  };

  BScroll.prototype._zoom = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    var firstFinger = e.touches[0];
    var secondFinger = e.touches[1];
    var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
    var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
    var distance = getDistance(deltaX, deltaY);
    var scale = distance / this.startDistance * this.startScale;

    this.scaled = true;

    var _options$zoom2 = this.options.zoom,
        _options$zoom2$min = _options$zoom2.min,
        min = _options$zoom2$min === undefined ? 1 : _options$zoom2$min,
        _options$zoom2$max = _options$zoom2.max,
        max = _options$zoom2$max === undefined ? 4 : _options$zoom2$max;

    if (scale < min) {
      scale = 0.5 * min * Math.pow(2.0, scale / min);
    } else if (scale > max) {
      scale = 2.0 * max * Math.pow(0.5, max / scale);
    }

    var lastScale = scale / this.startScale;

    var x = this.startX - (this.originX - this.relativeX) * (lastScale - 1);
    var y = this.startY - (this.originY - this.relativeY) * (lastScale - 1);

    this.setScale(scale);

    this.scrollTo(x, y, 0);
  };

  BScroll.prototype._zoomEnd = function (e) {
    if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {
      e.preventDefault();
    }

    if (this.options.stopPropagation) {
      e.stopPropagation();
    }

    this.isInTransition = false;
    this.isAnimating = false;
    this.initiated = 0;

    var _options$zoom3 = this.options.zoom,
        _options$zoom3$min = _options$zoom3.min,
        min = _options$zoom3$min === undefined ? 1 : _options$zoom3$min,
        _options$zoom3$max = _options$zoom3.max,
        max = _options$zoom3$max === undefined ? 4 : _options$zoom3$max;

    var scale = this.scale > max ? max : this.scale < min ? min : this.scale;

    this._zoomTo(scale, this.originX, this.originY, this.startScale);

    this.trigger('zoomEnd');
  };
}

// import { ease } from '../util/ease'

// Number of items to instantiate beyond current view in the scroll direction.
var RUNWAY_ITEMS = 30;

// Number of items to instantiate beyond current view in the opposite direction.
var RUNWAY_ITEMS_OPPOSITE = 10;

// The animation interval (in ms) for fading in content from tombstones.
var ANIMATION_DURATION_MS = 200;

// The number of pixels of default additional length to allow scrolling to.
var DEFAULT_SCROLL_RUNWAY = 2000;

function infiniteMixin(BScroll) {
  BScroll.prototype._initInfinite = function () {
    this.options.probeType = 3;
    this.maxScrollY = -DEFAULT_SCROLL_RUNWAY;
    this.infiniteScroller = new InfiniteScroller(this, this.options.infinity);
  };
}

function isTombstoneNode(node) {
  if (node && node.classList) {
    return node.classList.contains('tombstone');
  }
}

function InfiniteScroller(scroller, options) {
  var _this = this;

  this.options = options;
  assert(typeof this.options.createTombstone === 'function', 'Infinite scroll need createTombstone Function to create tombstone');

  assert(typeof this.options.fetch === 'function', 'Infinite scroll need fetch Function to fetch new data.');

  assert(typeof this.options.render === 'function', 'Infinite scroll need render Function to render each item.');

  this.firstAttachedItem = 0;
  this.lastAttachedItem = 0;

  this.anchorScrollTop = 0;
  this.anchorItem = {
    index: 0,
    offset: 0
  };
  this.tombstoneHeight = 0;
  this.tombstoneWidth = 0;
  this.tombstones = [];

  this.items = [];
  this.loadedItems = 0;
  this.requestInProgress = false;
  this.hasMore = true;

  this.scroller = scroller;
  this.wrapperEl = this.scroller.wrapper;
  this.scrollerEl = this.scroller.scroller;
  this.scroller.on('scroll', function () {
    _this.onScroll();
  });
  this.scroller.on('resize', function () {
    _this.onResize();
  });

  this.onResize();
}

InfiniteScroller.prototype.onScroll = function () {
  var scrollTop = -this.scroller.y;
  var delta = scrollTop - this.anchorScrollTop;
  if (scrollTop === 0) {
    this.anchorItem = {
      index: 0,
      offset: 0
    };
  } else {
    this.anchorItem = this._calculateAnchoredItem(this.anchorItem, delta);
  }

  this.anchorScrollTop = scrollTop;
  var lastScreenItem = this._calculateAnchoredItem(this.anchorItem, this.wrapperEl.offsetHeight);

  var start = this.anchorItem.index;
  var end = lastScreenItem.index;
  if (delta < 0) {
    start -= RUNWAY_ITEMS;
    end += RUNWAY_ITEMS_OPPOSITE;
  } else {
    start -= RUNWAY_ITEMS_OPPOSITE;
    end += RUNWAY_ITEMS;
  }
  this.fill(start, end);
  this.maybeRequestContent();
};

InfiniteScroller.prototype.onResize = function () {
  var tombstone = this.options.createTombstone();
  tombstone.style.position = 'absolute';
  this.scrollerEl.appendChild(tombstone);
  tombstone.style.display = '';
  this.tombstoneHeight = tombstone.offsetHeight;
  this.tombstoneWidth = tombstone.offsetWidth;
  this.scrollerEl.removeChild(tombstone);

  for (var i = 0; i < this.items.length; i++) {
    this.items[i].height = this.items[i].width = 0;
  }

  this.onScroll();
};

InfiniteScroller.prototype.fill = function (start, end) {
  this.firstAttachedItem = Math.max(0, start);
  if (!this.hasMore) {
    end = Math.min(end, this.items.length);
  }
  this.lastAttachedItem = end;
  this.attachContent();
};

InfiniteScroller.prototype.maybeRequestContent = function () {
  var _this2 = this;

  if (this.requestInProgress || !this.hasMore) {
    return;
  }
  var itemsNeeded = this.lastAttachedItem - this.loadedItems;
  if (itemsNeeded <= 0) {
    return;
  }
  this.requestInProgress = true;
  this.options.fetch(itemsNeeded).then(function (items) {
    if (items) {
      _this2.addContent(items);
    } else {
      _this2.hasMore = false;
      var tombstoneLen = _this2._removeTombstones();
      var curPos = 0;
      if (_this2.anchorItem.index <= _this2.items.length) {
        curPos = _this2._fixScrollPosition();
        _this2._setupAnimations({}, curPos);
        _this2.scroller.resetPosition(_this2.scroller.options.bounceTime);
      } else {
        _this2.anchorItem.index -= tombstoneLen;
        curPos = _this2._fixScrollPosition();
        _this2._setupAnimations({}, curPos);
        _this2.scroller.stop();
        _this2.scroller.resetPosition();
        _this2.onScroll();
      }
    }
  });
};

InfiniteScroller.prototype.addContent = function (items) {
  this.requestInProgress = false;
  for (var i = 0; i < items.length; i++) {
    if (this.items.length <= this.loadedItems) {
      this._addItem();
    }
    this.items[this.loadedItems++].data = items[i];
  }
  this.attachContent();
  this.maybeRequestContent();
};

InfiniteScroller.prototype.attachContent = function () {
  var unusedNodes = this._collectUnusedNodes();
  var tombstoneAnimations = this._createDOMNodes(unusedNodes);
  this._cleanupUnusedNodes(unusedNodes);
  this._cacheNodeSize();
  var curPos = this._fixScrollPosition();
  this._setupAnimations(tombstoneAnimations, curPos);
};

InfiniteScroller.prototype._removeTombstones = function () {
  var markIndex = void 0;
  var tombstoneLen = 0;
  var itemLen = this.items.length;
  for (var i = 0; i < itemLen; i++) {
    var currentNode = this.items[i].node;
    var currentData = this.items[i].data;
    if ((!currentNode || isTombstoneNode(currentNode)) && !currentData) {
      if (!markIndex) {
        markIndex = i;
      }
      if (currentNode) {
        this.scrollerEl.removeChild(currentNode);
      }
    }
  }
  tombstoneLen = itemLen - markIndex;
  this.items.splice(markIndex);
  this.lastAttachedItem = Math.min(this.lastAttachedItem, this.items.length);
  return tombstoneLen;
};

InfiniteScroller.prototype._collectUnusedNodes = function () {
  var unusedNodes = [];
  for (var i = 0; i < this.items.length; i++) {
    // Skip the items which should be visible.
    if (i === this.firstAttachedItem) {
      i = this.lastAttachedItem - 1;
      continue;
    }
    var currentNode = this.items[i].node;
    if (currentNode) {
      if (isTombstoneNode(currentNode)) {
        // Cache tombstones for reuse
        this.tombstones.push(currentNode);
        this.tombstones[this.tombstones.length - 1].style.display = 'none';
      } else {
        unusedNodes.push(currentNode);
      }
    }
    this.items[i].node = null;
  }
  return unusedNodes;
};

InfiniteScroller.prototype._createDOMNodes = function (unusedNodes) {
  var tombstoneAnimations = {};
  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
    while (this.items.length <= i) {
      this._addItem();
    }
    var currentNode = this.items[i].node;
    var currentData = this.items[i].data;
    if (currentNode) {
      if (isTombstoneNode(currentNode) && currentData) {
        currentNode.style.zIndex = 1;
        tombstoneAnimations[i] = [currentNode, this.items[i].top - this.anchorScrollTop];
        this.items[i].node = null;
      } else {
        continue;
      }
    }
    var node = currentData ? this.options.render(currentData, unusedNodes.pop()) : this._getTombStone();
    node.style.position = 'absolute';
    this.items[i].top = -1;
    this.scrollerEl.appendChild(node);
    this.items[i].node = node;
  }
  return tombstoneAnimations;
};

InfiniteScroller.prototype._cleanupUnusedNodes = function (unusedNodes) {
  while (unusedNodes.length) {
    this.scrollerEl.removeChild(unusedNodes.pop());
  }
};

InfiniteScroller.prototype._cacheNodeSize = function () {
  for (var i = this.firstAttachedItem; i < this.lastAttachedItem; i++) {
    // Only cache the height if we have the real contents, not a placeholder.
    if (this.items[i].data && !this.items[i].height) {
      this.items[i].height = this.items[i].node.offsetHeight;
      this.items[i].width = this.items[i].node.offsetWidth;
    }
  }
};

InfiniteScroller.prototype._fixScrollPosition = function () {
  this.anchorScrollTop = 0;
  for (var _i = 0; _i < this.anchorItem.index; _i++) {
    this.anchorScrollTop += this.items[_i].height || this.tombstoneHeight;
  }
  this.anchorScrollTop += this.anchorItem.offset;

  // Position all nodes.
  var curPos = this.anchorScrollTop - this.anchorItem.offset;
  var i = this.anchorItem.index;
  while (i > this.firstAttachedItem) {
    curPos -= this.items[i - 1].height || this.tombstoneHeight;
    i--;
  }

  return curPos;
};

InfiniteScroller.prototype._setupAnimations = function (tombstoneAnimations, curPos) {
  var _this3 = this;

  for (var i in tombstoneAnimations) {
    var animation = tombstoneAnimations[i];
    this.items[i].node.style.transform = 'translateY(' + (this.anchorScrollTop + animation[1]) + 'px) scale(' + this.tombstoneWidth / this.items[i].width + ', ' + this.tombstoneHeight / this.items[i].height + ')';
    // Call offsetTop on the nodes to be animated to force them to apply current transforms.
    /* eslint-disable no-unused-expressions */
    this.items[i].node.offsetTop;
    animation[0].offsetTop;
    this.items[i].node.style.transition = 'transform ' + ANIMATION_DURATION_MS + 'ms';
  }

  for (var _i2 = this.firstAttachedItem; _i2 < this.lastAttachedItem; _i2++) {
    var _animation = tombstoneAnimations[_i2];
    if (_animation) {
      var tombstoneNode = _animation[0];
      tombstoneNode.style.transition = 'transform ' + ANIMATION_DURATION_MS + 'ms, opacity ' + ANIMATION_DURATION_MS + 'ms';
      tombstoneNode.style.transform = 'translateY(' + curPos + 'px) scale(' + this.items[_i2].width / this.tombstoneWidth + ', ' + this.items[_i2].height / this.tombstoneHeight + ')';
      tombstoneNode.style.opacity = 0;
    }
    if (curPos !== this.items[_i2].top) {
      if (!_animation) {
        this.items[_i2].node.style.transition = '';
      }
      this.items[_i2].node.style.transform = 'translateY(' + curPos + 'px)';
    }
    this.items[_i2].top = curPos;
    curPos += this.items[_i2].height || this.tombstoneHeight;
  }

  this.scroller.maxScrollY = -(curPos - this.wrapperEl.offsetHeight + (this.hasMore ? DEFAULT_SCROLL_RUNWAY : 0));

  setTimeout(function () {
    for (var _i3 in tombstoneAnimations) {
      var _animation2 = tombstoneAnimations[_i3];
      _animation2[0].style.display = 'none';
      // Tombstone can be recycled now.
      _this3.tombstones.push(_animation2[0]);
    }
  }, ANIMATION_DURATION_MS);
};

InfiniteScroller.prototype._getTombStone = function () {
  var tombstone = this.tombstones.pop();
  if (tombstone) {
    tombstone.style.display = '';
    tombstone.style.opacity = 1;
    tombstone.style.transform = '';
    tombstone.style.transition = '';
    return tombstone;
  }
  return this.options.createTombstone();
};

InfiniteScroller.prototype._addItem = function () {
  this.items.push({
    data: null,
    node: null,
    height: 0,
    width: 0,
    top: 0
  });
};

InfiniteScroller.prototype._calculateAnchoredItem = function (initialAnchor, delta) {
  if (delta === 0) {
    return initialAnchor;
  }
  var i = initialAnchor.index;
  var tombstones = 0;

  delta += initialAnchor.offset;
  if (delta < 0) {
    while (delta < 0 && i > 0 && this.items[i - 1].height) {
      delta += this.items[i - 1].height;
      i--;
    }
    tombstones = Math.max(-i, Math.ceil(Math.min(delta, 0) / this.tombstoneHeight));
  } else {
    while (delta > 0 && i < this.items.length && this.items[i].height && this.items[i].height < delta) {
      delta -= this.items[i].height;
      i++;
    }
    if (i >= this.items.length || !this.items[i].height) {
      tombstones = Math.floor(Math.max(delta, 0) / this.tombstoneHeight);
    }
  }
  i += tombstones;
  delta -= tombstones * this.tombstoneHeight;

  return {
    index: i,
    offset: delta
  };
};

function BScroll(el, options) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
  if (!this.wrapper) {
    warn('Can not resolve the wrapper DOM.');
  }
  this.scroller = this.wrapper.children[0];
  if (!this.scroller) {
    warn('The wrapper need at least one child element to be scroller.');
  }
  // cache style for better performance
  this.scrollerStyle = this.scroller.style;

  this._init(el, options);
}

initMixin(BScroll);
coreMixin(BScroll);
eventMixin(BScroll);
snapMixin(BScroll);
wheelMixin(BScroll);
scrollbarMixin(BScroll);
pullDownMixin(BScroll);
pullUpMixin(BScroll);
mouseWheelMixin(BScroll);
zoomMixin(BScroll);
infiniteMixin(BScroll);

BScroll.Version = '1.12.4';

exports.default = BScroll;
},{}],12:[function(require,module,exports) {
module.exports = {
  warn: function warn(text) {
    console.warn(text);
  },
  error: function error(text) {
    console.error(text);
  }
};
},{}],8:[function(require,module,exports) {
'use strict';

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _betterScroll = require('better-scroll');

var _betterScroll2 = _interopRequireDefault(_betterScroll);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listView(opts) {
  this.el = opts['el'];
  this.data = opts['data'];
  this.opts = opts['config'];
  this._scrollTitle = null;
  this._indexDom = null;
  this.touch = {};
  this.ANCHOR_HEIGHT = 'number';
  this.init();
}

listView.prototype = {
  constructor: listView,
  init: function init(opts) {
    this.render(opts);
  },
  render: function render() {
    var el = document.querySelector(this.el);
    if (el) {
      var dom = '';
      var ShortcutIndex = [];
      var ShortcutDom = '';
      this.data.forEach(function (v, i) {
        var title = '<h2 class="scrollTitle">' + v.title + '</h2>';
        ShortcutIndex.push(v.title.substr(0, 1));
        ShortcutDom += '<li data-index="' + i + '" class="scroll-index">' + v.title.substr(0, 1) + '</li>';
        var li = '';
        v.items.forEach(function (item, index) {
          li += '<li><img src="' + item.avatar + '"><span>' + item.name + '</span></li>';
        });
        var ul = '<ul>' + li + '</ul>';
        var str = '<li>' + title + ul + '</li>';
        dom += str;
      });
      $('#wrapper ul').html(dom);
      $('.indexlist').html(ShortcutDom);
      this._scrollTitle = document.querySelectorAll('.scrollTitle');
      this._indexDom = document.querySelectorAll('.scroll-index');
      this.ANCHOR_HEIGHT = $('.scroll-index').eq(0).height();
      this.scroll = new _betterScroll2.default(el, {});
      this.addEvent();
    } else {
      (0, _util.error)('\u5FC5\u987B\u4F20\u5165\u5DF2\u5B58\u5728\u7684DOM\u5143\u7D20');
    }
  },
  addEvent: function addEvent() {
    var that = this;
    $('.indexlist').on('touchstart', '.scroll-index', onShortcuttouchstar);
    $('.indexlist').on('touchmove', '.scroll-index', onShortcuttouchmove);

    function onShortcuttouchstar(e) {
      var firstTouch = e.touches[0];
      var index = $(this).data('index');
      var scrollToDom = that._scrollTitle[index];
      that.touch.anchorIndex = index;
      that.touch.y1 = firstTouch.pageY;
      that.scroll.scrollToElement(scrollToDom);
    }

    function onShortcuttouchmove(e) {
      var firstTouch = e.touches[0];
      that.touch.y2 = firstTouch.pageY;
      var delta = (that.touch.y2 - that.touch.y1) / that.ANCHOR_HEIGHT | 0;
      var anchorIndex = that.touch.anchorIndex + delta;
      that._scrollTo(anchorIndex);
    }
  },
  _scrollTo: function _scrollTo(index) {
    if (!index && index !== 0) return;
    if (index < 0) {
      index = 0;
    } else if (index > this._scrollTitle.length - 2) {
      index = this._scrollTitle.length - 2;
    }
    this.scrollY = -this._scrollTitle[index];
    this.scroll.scrollToElement(this._scrollTitle[index]);
  }
};
var config = {
  el: "#wrapper",
  data: _data2.default

  // 加入dom元素后初始化
};var list = new listView(config);
},{"./data":9,"better-scroll":10,"./util":12}],2:[function(require,module,exports) {
'use strict';

require('./js/lib/rem');

require('./css/index.css');

require('./css/flb.css');

require('./js/');
},{"./js/lib/rem":5,"./css/index.css":3,"./css/flb.css":4,"./js/":8}],18:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '40689' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[18,2], null)
//# sourceMappingURL=/main.9978c24b.map