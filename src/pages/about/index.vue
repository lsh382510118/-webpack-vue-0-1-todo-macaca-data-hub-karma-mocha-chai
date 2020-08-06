<template>
  <div class="about">
    about
  </div>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {
        type: 'about',

        a: 1
      }
    },
    computed: {
      // 仅读取
      aDouble: function () {
        return this.a * 2
      },
      // 读取和设置
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    },
    mounted() {
      this.start()
    },
    methods:{
      start() {
        let vm = this;
        // vm.aPlus   // => 2
        console.log(vm.aPlus)
        console.log(vm.a)
        // vm.aPlus = 3
        console.log(vm.aPlus)
        // vm.a       // => 2
        console.log(vm.a)
        // vm. // => 4
        console.log(vm.aDouble)
      }
    }

  }
</script>

<style scoped></style>