<template>
  <div id="app">
    <navibar></navibar>
    <router-view></router-view>
  </div>
</template>

<script>
import navibar from '@/components/Navbar'

export default {
  name: 'app',
  components: {'navibar': navibar}
}
</script>
