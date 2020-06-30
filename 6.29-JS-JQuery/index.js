(function (window, undefined) {
  function njQuery(selector) {
    return new njQuery.prototype.init(selector);
  }

  njQuery.prototype = {
    constructor: njQuery,
    jquery : "1.12.4",
    selector : "",
    length : 0,
    // push --- 找到数组的push方法
    // 冒号前面的push将来由njQuery对象先用
    // 相当于[].push.apply(this)
    push : [].push,
    sort : [].sort,
    splice : [].splice,
    init: function (selector) {
      // 1. 传入“” null undefined  NAN 0 false 返回空的jQuery对象
      selector = njQuery.trim(selector);
      if (!selector) {
        // return this;
      
      }
      else if(njQuery.isFunction(selector)){
        njQuery.ready(selector)
      }
      // 2.字符串
      else if (njQuery.isString(selector)) {
        // 2.1 判断是否是代码片段
        if (njQuery.isHTML(selector)) {
          // 1. 根据代码片段创建所有元素
          var temp = document.createElement("div");
          temp.innerHTML = selector;

          // 2. 将创建好的一级元素添加到jQuery当中
          // for(var i = 0; i < temp.children.length; i++){
          //     this[i] = temp.children[i];
          // }

          // 3. 给jQuery对象添加length属性
          // this.length = temp.children.length;

          // 真数组转换为伪数组 ---- [].apply(obj,arr)
          // 伪数组转换为真数组 ---  var arr = [].slice.call(obj)
          [].push.apply(this, temp.children); //----替代了2 3 步操作

          // 此时此刻的this是jquery对象
          // 4. 返回加工好的this(jQuery)
          // return this;
        }
        // 判断是否是选择器
        else {
          //1. 找到对应的元素
          var res = document.querySelectorAll(selector);
          // 将找到的元素加到njquery
          // for (var i = 0; i < res.length; i++) {
          //   this[i] = res[i];
          // }
          // this.length = res.length;
          [].push.apply(this, res);
          // 返回加工的this
          // return this;
        }
        
      }
      // 3. 数组
      else if(njQuery.isArray(selector)){
        // if(({}).toString.apply(selector) === "[object Array]"){
        //   [].push.apply(this,selector);
        //   return this
        // }else{
        //   // 将自定义的伪数组转换为真数组
        //   var arr = [].slice.call(selector);
        //   // 再将真数组转换为伪数组
        //   [].push.apply(this,arr);
        //   return this
        // }
        var arr = [].slice.call(selector);
        [].push.apply(this,arr);
        // return this

        // 
      }
      // 4. 其他类型
      else{
        this[0] = selector;
        this.length = 1
        // return this
      }
    }
  };
  njQuery.isString = function (str) {
    return typeof str === "string";
  };
  njQuery.isHTML = function (str) {
    return (
      str.charAt(0) == "<" &&
      str.charAt(str.length - 1) == ">" &&
      str.length >= 3
    );
  };

njQuery.extend  = njQuery.prototype.extend = function(obj){
  for(var key in obj){
    this[key] = obj[key]
  }
}

njQuery.extend({
  trim : function (str) {
    if(!njQuery.isString(str)){
      return str
    }
    if (str.trim) {
      return str.trim();
    } else {
      return str.replace(/^\s+|\s+$/g, "");
    }
  },
  isObject : function(sele){
    return typeof sele === "object"
  },
  isWindow : function(sele){
    return sele === window
  },
  isArray : function(sele){
    if(njQuery.isObject(sele) && !njQuery.isWindow && "length" in sele){
      return true
    }
    return false
  },
  isFunction : function(sele){
    return typeof sele === "function"
  },
  ready : function(fn){
    // 判断是否加载完毕
    if(document.readyState == "complete"){
      fn()
    }else if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
        fn()
      })
    }
    else{
      document.attachEvent("onreadystatechange",function(){
        if(document.readyState == "complete"){
          fn()
        }
      })
    }
  }

})

  // njQuery.trim = function (str) {
  //   if(!njQuery.isString(str)){
  //     return str
  //   }
  //   if (str.trim) {
  //     return str.trim();
  //   } else {
  //     return str.replace(/^\s+|\s+$/g, "");
  //   }
  // };
  // njQuery.isObject = function(sele){
  //   return typeof sele === "object"
  // }
  // njQuery.isWindow = function(sele){
  //   return sele === window
  // }
  // njQuery.isArray = function(sele){
  //   if(njQuery.isObject(sele) && !njQuery.isWindow && "length" in sele){
  //     return true
  //   }
  //   return false
  // }
  // njQuery.isFunction = function(sele){
  //   return typeof sele === "function"
  // }




  njQuery.prototype.init.prototype = njQuery.prototype;
  window.njQuery = window.$ = njQuery;
})(window);