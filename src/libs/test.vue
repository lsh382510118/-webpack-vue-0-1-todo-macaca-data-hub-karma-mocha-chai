<template>
    <div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
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
        },
    }
</script>

<style lang="scss" scoped>

</style>