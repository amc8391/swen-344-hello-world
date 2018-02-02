<template>
<div>
  <h1>{{ title }}</h1>
  <p v-for="message in messages">
    {{ message }}
  </p>
  <div>
    <img v-for="image in images" :src="image.src" :alt="image.alt" class="albumImage">
  </div>
</div>
</template>

<script>
export default {
  name: 'About',
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
      fetch('http://localhost/api.php?page=about')
        .then((response) => {
          response.json()
            .then((responseData) => {
              this.title = responseData.title;
              this.messages = responseData.messages;
              this.images = responseData.images;
              console.log(this.title);
              console.log(this.messages);
              console.log(this.images);
            });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.albumImage {
  width: 200px;
  height: 200px;
}
</style>
