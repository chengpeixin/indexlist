import data from './data'
import Bscroll from 'better-scroll'


function warn(text) {
  console.warn(text)
}

function error(text) {
  console.error(text)
}

function listView(opts) {
  this.el = opts['el'];
  this.opts = opts['config']
  this.Bscroll = Bscroll;
}

listView.prototype = {
  constructor: listView,
  init(opts) {
    this.render(opts)
  },
  render() {
    const el = document.querySelector(this.el);
    if (el) {
      this.scroll = new this.Bscroll(el, {})
    } else {
      error(`必须传入已存在的DOM元素`);
    }
  }
}

var list = new listView("#wrappear")
list.init();