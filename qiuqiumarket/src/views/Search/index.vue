<template>
  <div>
    我是search组件
    <h1>收到的query参数keyword:{{Route.query.keyword}}</h1>
    <h1>收到的params参数keyword:{{Route.params.keyword}}</h1>
    <h1>收到的params参数didi:{{Route.params.didi}}</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent ({
  name:'Search',
  components:{},
  props:{},
  setup(props, ctx){
    const Route = useRoute();
    const Router = useRouter();
    return {
      Route
    }
  },
})
</script>

<style scoped>
</style>