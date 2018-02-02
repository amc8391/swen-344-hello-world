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
      fetch('http://localhost/api.php?page=nav')
        .then((response) => {
          response.json()
            .then((responseData) => {
              this.navLinks = responseData.links;
              console.log(this.navLinks);
            });
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
