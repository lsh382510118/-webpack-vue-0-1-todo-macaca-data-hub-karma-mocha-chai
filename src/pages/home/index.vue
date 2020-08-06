<template>
  <div >
      <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './../../components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted(){
    console.log(this)
  }
}
</script>

<style>
</style>