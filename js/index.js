import data from './data'
import Bscroll from 'better-scroll'
import {
  warn,
  error
} from './util'




function listView(opts) {
  this.el = opts['el'];
  this.data = opts['data']
  this.opts = opts['config']
  this._scrollTitle = null
  this._indexDom = null
  this.touch = {}
  this.ANCHOR_HEIGHT = `number`
  this.init()
}

listView.prototype = {
  constructor: listView,
  init(opts) {
    this.render(opts)
  },
  render() {
    const el = document.querySelector(this.el);
    if (el) {
      let dom = ``
      let ShortcutIndex = []
      let ShortcutDom = ``
      this.data.forEach((v, i) => {
        let title = `<h2 class="scrollTitle">${v.title}</h2>`
        ShortcutIndex.push(v.title.substr(0, 1))
        ShortcutDom += `<li data-index="${i}" class="scroll-index">${v.title.substr(0, 1)}</li>`
        let li = ``
        v.items.forEach((item, index) => {
          li += `<li><img src="${item.avatar}"><span>${item.name}</span></li>`
        })
        var ul = `<ul>${li}</ul>`
        let str = `<li>${title}${ul}</li>`
        dom += str;
      })
      $('#wrapper ul').html(dom)
      $('.indexlist').html(ShortcutDom)
      this._scrollTitle = document.querySelectorAll('.scrollTitle');
      this._indexDom = document.querySelectorAll('.scroll-index')
      this.ANCHOR_HEIGHT = $('.scroll-index').eq(0).height()
      this.scroll = new Bscroll(el, {})
      this.addEvent();
    } else {
      error(`必须传入已存在的DOM元素`);
    }
  },
  addEvent() {
    const that = this;
    $('.indexlist').on('touchstart', '.scroll-index', onShortcuttouchstar)
    $('.indexlist').on('touchmove', '.scroll-index', onShortcuttouchmove)

    function onShortcuttouchstar(e) {
      let firstTouch = e.touches[0]
      const index = $(this).data('index')
      const scrollToDom = that._scrollTitle[index]
      that.touch.anchorIndex = index
      that.touch.y1 = firstTouch.pageY
      that.scroll.scrollToElement(scrollToDom)
    }

    function onShortcuttouchmove(e) {
      let firstTouch = e.touches[0]
      that.touch.y2 = firstTouch.pageY
      let delta = ((that.touch.y2 - that.touch.y1) / that.ANCHOR_HEIGHT) | 0
      let anchorIndex = that.touch.anchorIndex + delta
      that._scrollTo(anchorIndex)
    }
  },
  _scrollTo(index) {
    if (!index && index !== 0) return
    if (index < 0) {
      index = 0
    } else if (index > this._scrollTitle.length - 2) {
      index = this._scrollTitle.length - 2
    }
    this.scrollY = -this._scrollTitle[index]
    this.scroll.scrollToElement(this._scrollTitle[index])
  }
}
const config = {
  el: "#wrapper",
  data
}


// 加入dom元素后初始化
var list = new listView(config)