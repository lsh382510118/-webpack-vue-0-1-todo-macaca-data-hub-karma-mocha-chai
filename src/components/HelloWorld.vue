<template>
  <div class="hello">
    <div class="input-wrap">
      <input ref="enterInput" type="text" class="enter-input" v-model="val" placeholder="enter a message!">
      <button @click="add" class="add-btn">add</button>
    </div>

    <div class="list-type">
      <div :class="{'on': type == item }" class="type-item" v-for="(item, index) in types" :key="index"
        @click="chooseType(item)">{{item}}</div>
    </div>
    <ul>
      <li class="list-item " v-for="(item,index) in checkList()" :class="getClass(item,index)" :key="index">
        <span class="completed-hander" @click="completedHander(item)"></span>
        {{item.title}}
        <span class="del" @click="del(index)"> X</span>
      </li>
    </ul>

    <div class="tips">现在共有<span class="list-num" style="color:red">{{list.length}}</span>条事件</div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        type: 'all',
        types: ['all', 'active', 'completed'],
        val: '',
        newList:[],
        list: [{
          title: "list-item 001",
          type: "active"
        }]
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      ajax(opts) {
        return new Promise((resolve, reject) => {
          var request = new XMLHttpRequest();
          request.open(opts.type, opts.api, true);
          request.onreadystatechange = function () {
            if (this.readyState === 4) {
              if (this.status >= 200 && this.status < 400) {
                var json = JSON.parse(this.responseText);
                resolve(json)
                // that.render(json.data)
              }
            }
          };
          request.send();
        })

      },
      getClass(item, index) {
        let className1 = item.type == 'completed' ? 'completed' : 'active'
        className1 = className1 + ' ' + 'list-item' + index
        return className1
      },
      render(data) {
        this.$set(this, 'list', data)
      },
      getList() {
        this.ajax({
          type: "GET",
          api: '/api/todo/query'
        }).then(data => {
          this.render(data.data)
        })
      },
      add() {
        if(!this.val){
          // alert('please enter some messaeg')
          console.log('please enter some messaeg')
          this.$refs.enterInput.focus();
          return
        }
        this.list.push({
          title: this.val,
          type: "active"
        })
        this.val = ''

        // this.ajax({
        //   type:"POST",
        //   api:'/api/todo/add'
        // }).then(data =>{
        //   // this.list.push(this.val)
        //   // this.val = ''
        //   this.render(data.data)
        // })
      },
      del(index) {
        this.list.splice(index, 1);
        // this.ajax({
        //   type:"POST",
        //   api:'/api/todo/del'
        // }).then(data =>{
        //   this.list.splice(index, 1);
        //   this.render(data.data)
        // })
      },
      chooseType(item) {
        this.type = item
      },
      completedHander(item) {
        item.type = item.type == 'active' ? 'completed' : 'active'
      },
      checkList(){
        // let newList = [...this.list];
        if(this.type == 'all'){
          return this.list
        }
        const result = this.list.filter((item)=>{
          return item.type == this.type
        })
        return result
      }
      // filters:{
      //   checkList:(){
          
      //   }
      // }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .demo-header {
    text-align: center;
    border-bottom: 1px solid #e3e3e3;
    padding: 15px 0;
  }

  .input-wrap {
    padding: 15px;
  }

  .enter-input,
  .add-btn {
    padding: 8px 6px;
    outline: none;
    margin-left: 15px;
  }

  .add-btn {
    padding: 9px 17px;
    background: #0db443;
    color: #fff;
    border: none;
    border-radius: 4px;
  }

  ul {
    list-style-type: none;
    padding: 15px;
    margin: 0 15px 15px;
    border-radius: 0 0 4px 4px;
    /* box-shadow: 1px 2px 2px 1px rgba(20, 20, 20, 0.4); */
    border: 1px solid #e3e3e3;
  }

  .list-item {
    padding: 15px 10px;
    position: relative;
  }

  .completed-hander {
    border-radius: 50%;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #E3e3e3;
    vertical-align: middle;
    margin-right: 10px;
  }

  .list-item.completed {
    text-decoration: line-through;
    color: #999;

    .completed-hander:after {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      background-color: #1576c5;
      border-radius: 50%;
      margin: 3px auto 0;
    }
  }


  .list-type {
    margin: 0 15px;
    display: flex;
    text-align: center;
    border: 1px solid #e3e3e3;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
  }

  .type-item {
    flex: 1;
    padding: 10px 0;
    transition: all 0.3s;
  }

  .type-item:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }

  .type-item+.type-item {
    border-left: 1px solid #E3e3e3;
  }

  .type-item.on {
    background: #1576c5;
    color: #fff;
  }

  .del {
    position: absolute;
    right: 10px;
    top: 15px;
    color: red;
    cursor: pointer;
  }

  .tips {
    margin: 15px;
    color: #999;
    font-size: 12px;
  }
</style>