<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="signUp"
        @keydown.prevent.enter>
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRule"
            label="username"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.displayName"
            :rules="notEmptyRule"
            label="Display Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRule"
            label="passsword"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRule"
            label="confirm passsword"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.imageUrl"
            :rules="notEmptyRule"
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
      username: '',
      displayName: '',
      password: '',
      confirmPassword: '',
      imageUrl: '',
    },
    notEmptyRule: [(v) => !!v || "can't be empty"],
    confirmPasswordRule: [(v) => vm.user.password === v || 'must be match'],
  }),
  methods: {
    async signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex.api;
        const user = new User(this.user);
        console.log(await user.save());
      }
    },
  },
};
</script>
