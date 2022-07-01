<template>
  <div>
    <ul v-for="(item, index) in arr" :key="index">
      <li>
        <input type="checkbox" v-model="checkNumber" :value="item" />{{ item }}
      </li>
    </ul>
    <div>你选中的元素,累加的值和为:{{ allNumber }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [9, 15, 19, 25, 29, 31, 48, 57, 62, 79, 87],
      checkNumber: [],
    }
  },
  computed: {
    allNumber() {
      return this.checkNumber.reduce((a, b) => a + b, 0)
    },
  },
}
</script>

<style></style>
