<template>
  <div id="app">
    <div class="container">
      <!-- 顶部框模块 -->
      <div class="form-group">
        <div class="input-group">
          <h4>品牌管理</h4>
        </div>
      </div>

      <!-- 数据表格 -->
      <table class="table table-bordered table-hover mt-2">
        <thead>
          <tr>
            <th>编号</th>
            <th>资产名称</th>
            <th>价格</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td :class="{ red: item.price > 100 }">{{ item.price }}</td>
            <td>{{ item.time | formatDate }}</td>
            <td><a href="#" @click.prevent="delFn(item.id)">删除</a></td>
          </tr>
          <tr style="background-color: #eee">
            <td>统计:</td>
            <td colspan="2">总价钱为: {{ allPrice }}</td>
            <td colspan="2">平均价: {{ svgPrice }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 添加资产 -->
      <form class="form-inline" style="display: flex">
        <div class="form-group">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="资产名称"
              v-model.trim="name1"
            />
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="form-group">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="价格"
              v-model.trim="price1"
            />
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 阻止表单提交 -->
        <button class="btn btn-primary" @click.prevent="addFn">添加资产</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      // 1.4 读取本地缓存，如果没有就导入默认设置数据
      list: JSON.parse(localStorage.getItem('list')) || [
        { id: 100, name: '外套', price: 199, time: new Date('2010-08-12') },
        { id: 101, name: '裤子', price: 34, time: new Date('2013-09-01') },
        { id: 102, name: '鞋', price: 25.4, time: new Date('2018-11-22') },
        { id: 103, name: '头发', price: 19900, time: new Date('2020-12-12') },
      ],
      name1: '',
      price1: 0,
    }
  },
  methods: {
    delFn(id) {
      const index = this.list.findIndex((item) => id == item.id)
      this.list.splice(index, 1)
    },

    addFn() {
      if (this.name1 == '' || this.price1 == 0) {
        this.price1 = 0
        return alert('Please entet')
      }
      const id = this.list[this.list.length - 1]
        ? this.list[this.list.length - 1].id + 1
        : 100
      this.list.push({
        id,
        name: this.name1,
        price: this.price1,
        time: new Date(),
      })
      ;(this.name1 = ''), (this.price1 = 0)
    },
  },
  filters: {
    formatDate(val) {
      return moment(val).format('YYYY-MM-DD')
    },
  },
  computed: {
    allPrice() {
      // 运算时候前面加个+号会默认转换成数值
      return this.list.reduce((a, b) => a + +b.price, 0)
    },
    svgPrice() {
      return (this.allPrice / (this.list.length - 1)).toFixed(2)
    },
  },
  // 1.0监听事件
  watch: {
    //1.1 对数组进行监听
    list: {
      handler() {
        //1.2 保存到本地
        localStorage.setItem('list', JSON.stringify(this.list))
      },
      //1.3  进行深度监听
      deep: true,
      //1.5 将缓存存入本地
      immediate: true,
    },
  },
}
</script>

<style>
.red {
  color: red;
}
</style>
