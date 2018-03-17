<template>
  <div class="headerView">
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'title...'
    }
  },
  props: {
    msg: {
      type: String,
      default: 'Who am I ?'
    }
  }
}
</script>

<style>

</style>
