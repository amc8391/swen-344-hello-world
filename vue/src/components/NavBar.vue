<template>
<div>
  <ul>
    <li v-for="link in navLinks" class="navLink">
      <router-link :to="'/' + link.href">{{ link.title }}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
import apiconnector from '../apiconnector';

export default {
  name: 'NavBar',
  data() {
    return {
      navLinks: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.title = null;
      this.messages = [];
      apiconnector.getPage('nav')
        .then((responseData) => {
          this.navLinks = responseData.links;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navLink {
  list-style-type: none;
}
</style>
