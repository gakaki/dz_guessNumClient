// components/keyboard/keyboard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num:{
      type: String,
      value:''
    },
    delnum:{
      type: String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active:[false,false,false,false,false,false,false,false,false,false],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeSelecte(e){
      if(this.properties.num.length > 3) {
        return 
      }
      let newArr = [];
      newArr = this.data.active.map((v, n) => {
        if (n == e.currentTarget.dataset.num) {
          if (!v) {
            let myEventDetail = { num: e.currentTarget.dataset.num }
            this.triggerEvent('numclick', myEventDetail)
          }
          return true
        } else {
          return v
        }
      })
      this.setData({
        active: newArr
      })
    },
    back(e) {
      this.triggerEvent('del')
      let newArr = this.data.active;
      newArr[this.properties.delnum] = false
      this.setData({
        active: newArr
      })
    }
  }
})
