<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="signUp"
        @keydown.prevent.enter>
          <v-text-field
            v-model="user.email"
            :rules="rules.email"
            label="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.displayName"
            :rules="rules.required"
            label="Display Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="rules.required"
            label="passsword"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :rules="rules.confirmPasswordRule"
            label="confirm passsword"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.imageUrl"
            :rules="rules.required"
            label="image URL"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">SignUp</v-btn>
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
import { mapState } from 'vuex';

export default {
  name: 'Signup',
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  data: (vm) => ({
    valid: false,
    user: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
      imageUrl: '',
    },
    rules: {
      required: [(v) => !!v || 'Required. '],
      confirmPasswordRule: [(v) => vm.user.password === v || 'must be match'],
      email: [(v) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || 'Invalid e-mail.';
      }],
    },

  }),
  methods: {
    async signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex.api;
        const user = new User(this.user);
        await user.save();
        this.$router.push('/login');
      }
    },
  },
};
</script>
