<template>
  <div id="dont-forget-movie">
    <Navbar />
    <!-- 🔍 PSE 搜尋框 -->
    <div class="container my-4">
      <div class="gcse-search"></div>
    </div>
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
  mounted() {
    // 動態插入 Google PSE 的 script
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=00b05b3a64a2645bd"; // ← 改成你的 Engine ID
    script.async = true;
    document.body.appendChild(script);
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