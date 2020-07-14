<template>
  <v-card
      color="red lighten-4"
      flat
      height="40px"
      tile
    >
    <v-toolbar dense pa-2>
      <v-toolbar-title>
        <v-btn text :to="{ name: 'home' }">Trello Clone</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn text :to="{ name: 'login' }">Login</v-btn>
        <v-btn text :to="{ name: 'signup' }">SignUp</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-avatar size="40">
          <img
            :src="user.user.imageUrl"
            alt="profile img"
          >
        </v-avatar>
        <v-btn text @click="logout">LogOut</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'Navbar',
  props: ['user'],
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    ...mapMutations('boards', ['clearAll']),
    async logout() {
      await this.authLogout();
      this.clearAll();
      this.$router.push('/login');
    },
  },
};
</script>
