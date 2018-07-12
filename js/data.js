import json from './../json/FeHelper.json'
const data = json.data.list
const HOT_NAME = '热门';
const HOT_SINGE_LEN = 10
let map = {
  hot: {
    title: HOT_NAME,
    items: []
  }
}
let list;
class Singer {
  constructor({
    id,
    name
  }) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

data.forEach(function (item, index) {
  if (index < HOT_SINGE_LEN) {
    map.hot.items.push(
      new Singer({
        id: item.Fsinger_mid,
        name: item.Fother_name
      })
    )
  }
  const key = item.Findex
  if (!map[key]) {
    map[key] = {
      title: key,
      items: []
    }
  }
  map[key].items.push(
    new Singer({
      id: item.Fsinger_mid,
      name: item.Fother_name
    })
  )
}, this)
// 为了得到有序列表，我们需要处理 map
let hot = []
let ret = []
for (let key in map) {
  let val = map[key]
  if (val.title.match(/[a-zA-Z]/)) {
    ret.push(val)
  } else if (val.title === HOT_NAME) {
    hot.push(val)
  }
}
ret.sort((a, b) => {
  return a.title.charCodeAt(0) - b.title.charCodeAt(0)
})
list = hot.concat(ret)
module.exports = list;