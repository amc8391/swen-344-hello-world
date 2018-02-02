<template>
<div>
  <h1>{{ title }}</h1>
  <p v-for="message in messages">
    {{ message }}
  </p>
</div>
</template>

<script>
import apiconnector from '../apiconnector';

export default {
  name: 'HelloWorld',
  data() {
    return {
      title: '',
      messages: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.title = null;
      this.messages = [];
      apiconnector.getPage('home')
        .then((responseData) => {
          this.title = responseData.title;
          this.messages = responseData.messages;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
