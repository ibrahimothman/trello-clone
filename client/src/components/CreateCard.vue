<template>
  <v-flex sm12 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create Card</div>
        <div>
          <v-form
            v-model="valid"
            @submit.prevent="createCard"
            @keydown.prevent.enter
          >
            <v-text-field
              v-model="card.title"
              :rules="rules.required"
              label="Title"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!valid">Create Card</v-btn>
          </v-form>
          <!-- <v-progress-circular
            v-if="creatingCard"
            :size="70"
            :width="7"
            indeterminate
            color="primary">
          </v-progress-circular> -->
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'create-card',
  props: ['listId'],
  data: () => ({
    valid: false,
    card: {
      title: '',
    },
    rules: {
      required: [(v) => !!v || 'Required.'],
    },
  }),
  methods: {
    async createCard() {
      if (this.valid) {
        const { Card } = this.$FeathersVuex.api;
        const card = new Card(this.card);
        card.listId = this.listId;
        await card.save();
        this.card = {
          name: '',
        };
      }
    },
  },
};
</script>
