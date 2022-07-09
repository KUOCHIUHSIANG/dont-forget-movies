<template>
  <div id="dont-forget-movie">
    <Navbar />
    <router-view/>
  </div>
</template>


<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './../src/components/Navbar.vue'

export default {
 name: 'App',
 components: {
   Navbar
 }
}
</script>
