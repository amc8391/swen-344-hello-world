<template>
<div>
  <h1>{{ title }}</h1>
  <p v-for="message in messages">
    {{ message }}
  </p>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      title: 'asdf',
      messages: [
        'message 1',
        'message 2',
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.title = null;
      this.messages = [];
      fetch('http://localhost/api.php?page=home')
        .then((response) => {
          response.json()
            .then((responseData) => {
              this.title = responseData.title;
              this.messages = responseData.messages;
              console.log(this.title);
              console.log(this.messages);
            });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
