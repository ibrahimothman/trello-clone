<template>
  <v-toolbar
    >
    <v-toolbar-title>
      <v-btn text :to="{ name: 'home' }">Trello Clone</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn text :to="{ name: 'login' }">Login</v-btn>
      <v-btn text :to="{ name: 'signup' }">SignUp</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <v-btn text @click="logout">LogOut</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navbar',
  props: ['user'],
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    async logout() {
      await this.authLogout();
      this.$router.push('/login');
    },

  },
};
</script>
