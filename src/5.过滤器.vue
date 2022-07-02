<template>
  <div>
    <div>{{ msg | transformation }}</div>
    <div>时间:{{ timer | newTimer }}</div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      msg: '国内网站' + ':' + '粉丝数量' + ':' + 187.6986 + '万',
      timer: moment(new Date()).format('YYYY-MM-DD'),
    }
  },
  filters: {
    transformation: (val) => {
      return val.replace('万', '千').replace('内', '外')
    },
    newTimer: (val) => {
      return moment(val).format('YYYY/MM/DD')
    },
  },
}
</script>

<style></style>
