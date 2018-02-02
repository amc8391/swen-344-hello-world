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
import apiconnector from '../apiconnector';

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
      apiconnector.getPage('about')
        .then((responseData) => {
          this.title = responseData.title;
          this.messages = responseData.messages;
          this.images = responseData.images;
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
