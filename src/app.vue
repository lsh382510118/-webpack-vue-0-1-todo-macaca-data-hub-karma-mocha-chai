<template>
    <div id="root" :style="this.$store.state.app.theme" class="root">
        <div class="home-top">
            <div class="left">this is a todoList</div>
            <div class="right">
                <router-link class="head-link" to="/">Home</router-link>
                <router-link class="head-link" to="/about">About</router-link>
                <button class="choose-theme" @click="toggleTheme">换肤</button>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                themeType: false,
            }
        },
        name: 'root',
        components: {},
        mounted() {
            console.log(this)
        },
        methods: {
            toggleTheme(index) {
                this.$store.dispatch('setTheme','#999')
                this.themeType = !this.themeType
                let type = this.themeType
                window.document.documentElement.setAttribute(
                    "data-theme",
                    type ? "dark" : "light"
                );
            }

        }
    }
</script>

<style lang="scss">
    @import "@/assets/styles/_hander.scss";

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .home-top {
        text-align: center;
        height: 80px;
        line-height: 80px;
        @include background_color("background_color1");
        position: relative;
        display: flex;
        justify-content: space-between;
        color: #fff;
        .left{
            font-size: 28px;
            font-weight: bold;
            padding-left: 30px;
        }
        .right{
            font-size: 0;
        }
        .head-link{
            font-size: 18px;
            text-decoration: none;
            display: inline-block;
            vertical-align: top;
            padding: 0 15px;
            color: #fff;
            &.router-link-exact-active{
                color: #333;
                background-color: #fff;
            }

        }
        .choose-theme{
            // position: absolute;
            // right: 20px;
            // top: 20px;
            outline: none;
            border: 1px solid #333;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
            background-color: rgba(255,255,255,0.8);
            border-radius: 6px;
            color: #333;
            margin: 20px 30px;
            &:hover{

            }
        }
    }
</style>