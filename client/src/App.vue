<template>
  <v-app>
    <navbar :user="user"/>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer>
      <span>&copy; 2020 - Made with 💙 by ibra</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
  },

};
</script>
