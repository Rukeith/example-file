<template>
  <div class="view">
    <h1>{{title}}</h1>
    <input v-model="newStr" type="text" @keyup.enter="addData" />
    <ul>
      <li :class="{finish:item.isFinished}" :key="item.text" v-for="item in items" @click="toggleFinish(item)">
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      title: 'TodoList',
      items: [
        {
          text: 'tonight 18:00 running',
          isFinished: false
        },
        {
          text: 'today breakfast',
          isFinished: true
        }
      ],
      newStr: ''
    };
  },
  methods: {
    toggleFinish: (item) => {
      item.isFinished = !item.isFinished;
    },
    addData: function () {
      this.items.push({
        text: this.newStr,
        isFinished: false
      });
      // trigger myMsg event and pass params
      this.$emit('myMsg', this.newStr);
      this.newStr = '';
    }
  }
}
</script>

<style>
  .view {
    width: 400px;
    border: 1px solid gray;
    margin: 20px auto;
  }
  .view, .title {
    border-bottom: 1px solid gray;
  }
  .view ul li {
    cursor: pointer;
    margin: 10px 0;
    list-style: none;
  }
  .finish {
    color: gray;
    text-decoration: line-through;
  }
</style>
