<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="login"
        @keydown.prevent.enter>
          <v-text-field
            v-model="user.email"
            :rules="rules.email"
            label="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="rules.required"
            label="passsword"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Login</v-btn>
      </v-form>
      <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </v-layout>
  </v-container>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Signup',
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  data: () => ({
    valid: false,
    user: {
      email: '',
      password: '',
    },
    rules: {
      required: [(v) => !!v || 'Required. '],
      email: [(v) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || 'Invalid e-mail.';
      }],
    },

  }),
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      if (this.valid) {
        try {
          const res = await this.authenticate({
            strategy: 'local',
            ...this.user,
          });
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
