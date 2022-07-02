<template>
  <div id="app">
    <table class="tb">
      <tr>
        <th><input type="checkbox" v-model="isAll" />全选</th>
        <th>商品</th>
        <th>单价</th>
        <th>数量</th>
        <th>小记</th>
        <th>操作</th>
      </tr>
      <!-- 循环渲染的元素tr -->
      <tr v-for="item in list" :key="item.id">
        <td><input type="checkbox" v-model="item.c" /></td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>
          <button @click="reduceFn(item.id)">-</button
          ><input type="text" v-model.number="item.quantity" />
          <button @click="addFn(item.id)">+</button>
        </td>
        <td>{{ item.time }}</td>
        <td><button @click="delFn(item.id)">删除</button></td>
      </tr>

      <tr v-if="list.length === 0">
        <td colspan="4">没有数据咯~</td>
      </tr>
    </table>
    <br />
    <button @click="delTrue">删除选中商品</button>
    <button @click="delAll">清理购物车</button>
    <br />
    <div style="margin-top: 20px">
      <h2>统计：{{ commodityNumber }}</h2>
      <p>已经选中商品件数</p>
      <p>总价{{ allPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: '',
      list: [
        {
          id: 1,
          name: '奔驰',
          price: 100,
          quantity: 1,
          time: '2020-08-01',
          c: false,
        },
        {
          id: 2,
          name: '宝马',
          price: 150,
          quantity: 1,
          time: '2020-08-02',
          c: false,
        },
        {
          id: 3,
          name: '奥迪',
          price: 200,
          quantity: 1,
          time: '2020-08-03',
          c: false,
        },
      ],
    }
  },
  methods: {
    delFn(id) {
      // 删除按钮 - 得到索引, 删除数组里元素
      const index = this.list.findIndex((item) => item.id === id)
      this.list.splice(index, 1)
    },
    reduceFn(val) {
      const index = this.list.findIndex((item) => item.id == val)
      this.list[index].quantity--
    },
    addFn(val) {
      const index = this.list.findIndex((item) => item.id == val)
      this.list[index].quantity++
    },

    // 删除选中的商品
    delTrue() {
      // 1.0 创建一个新数组，用来接收满足条件的项
      let newArr = []
      // 1.1 遍历每一项
      this.list.forEach((item) => {
        // 1.2 挑出为false的数据
        if (!item.c) {
          // 1.3 添加到新数组
          newArr.push(item)
        }
      })
      // 1.4 赋值改变原生数组，渲染到界面上
      this.list = newArr
    },

    // 删除清理购物车
    delAll() {
      this.list = []
    },
  },

  // 监听数量使他数值不小于0
  watch: {
    list: {
      handler() {
        if (this.list.every((item) => item.quantity >= 0)) {
          return console.log(1)
        }
        const index = this.list.findIndex((item) => item.quantity < 0)
        this.list[index].quantity = 0
      },
      deep: true,
    },
  },

  computed: {
    // 全选
    isAll: {
      set(val) {
        this.list.forEach((item) => (item.c = val))
      },
      get() {
        if (this.list.length == 0) {
          return false
        }
        return this.list.every((item) => item.c)
      },
    },

    //统计
    commodityNumber() {
      return this.list.reduce((a, b) => a + b.quantity, 0)
    },

    //总价
    allPrice() {
      return this.list.reduce((a, b) => a + b.price * b.quantity, 0)
    },
  },
}
</script>

<style>
#app {
  width: 600px;
  margin: 10px auto;
}

.tb {
  border-collapse: collapse;
  width: 100%;
}

.tb th {
  background-color: #0094ff;
  color: white;
}

.tb td,
.tb th {
  padding: 5px;
  border: 1px solid black;
  text-align: center;
}

.add {
  padding: 5px;
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>
