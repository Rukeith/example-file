<template>
  <div id="app">
    <HeaderView :msg="title"/>
    <img src="./assets/logo.png">
    <List @myMsg="getData" />
  </div>
</template>

<script>
import List from './components/List';
import HeaderView from './components/Header';

// father --> children by props
// children --> father by custom event

export default {
  name: 'App',
  components: {
    List,
    HeaderView
  },
  data() {
    return {
      title: 'Vue tutorial'
    };
  },
  methods: {
    getData(msg) {
      console.log(`Get data from children = ${msg}`);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
