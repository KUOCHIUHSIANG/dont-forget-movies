<template>
  <div id="dont-forget-movie">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./../src/components/Navbar.vue";
import Footer from "./../src/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
#dont-forget-movie {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .container {
    flex: 1;
  }
}
</style>