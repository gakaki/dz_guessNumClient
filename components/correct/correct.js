// components/correct/correct.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    result:{
      type:"string",
      value:'2A2B'
    },
    money:{
      type:"number",
      value:100
    },
    comment:{
      type:"string",
      value:'测试文字'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    confirmSrc:'https://gengxin.odao.com/update/h5/wangcai/guess/confirm.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _hide() {
      this.triggerEvent("hideEvent")
    },
    _active() {
      this.triggerEvent("actEvent")
    },
    _cancel() {
      this.triggerEvent("celEvent")
    }
  }
})
