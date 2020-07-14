<template>
  <v-flex sm3 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create List</div>
        <div>
          <v-form
            v-model="valid"
            @submit.prevent="onCreateList"
            @keydown.prevent.enter>
            <v-text-field
              v-model="list.name"
              :rules="rules.requierd"
              label="Name"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!valid">Create list</v-btn>
          </v-form>
          <v-progress-circular
            v-if="false"
            :size="70"
            :width="7"
            indeterminate
            color="primary">
          </v-progress-circular>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['createList'],
  data: () => ({
    valid: false,
    list: {
      name: '',
    },
    rules: {
      required: [(v) => !!v || 'Required.'],
    },
  }),
  methods: {
    async onCreateList() {
      if (this.valid) {
        await this.createList(this.list);
        console.log('list created successfully');
        this.list = {
          name: '',
        };
      }
    },
  },
};
</script>
