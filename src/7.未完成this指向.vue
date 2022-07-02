<template>
  <div>
    <button @click="clickFn"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  // methods声明的函数会挂载vue的实例下面
  methods: {
    clickFn() {
      console.log(this)
    },
  },
}
//vue实例上定义了一遍methods里所有的方法，并且使用bind函数将函数的this指向Vue实例上
// 3.this指向
function fn() {
  // 3.html 的时候指向window,vue调用的undefined
  console.log(this)
}
const obj = {
  name: 'test',
  a() {
    console.log(this.a)
    console.log(obj)
    //setTimeout由普通函数调用，所以由js引擎执行,指向的是window,window下面没有a方法，就是undefined
    //超时调用的代码都是在全局作用域中执行的，因此函数中this的值在非严格模式下指向window对象，在严格模式下是undefined
    // 箭头函数指向等于父级函数this指向obj
    setTimeout(function () {
      console.log(this.a)
    }, 1000)
  },
  b() {
    console.log(this)
    fn()
  },
}
obj.a()
obj.b()
</script>

<style></style>
