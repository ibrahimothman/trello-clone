<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout column>
        <v-flex xs12>
          <div class="headline">{{listName}}</div>
        </v-flex>
      </v-layout>
    </v-card-title>
    <ul v-if="cards">
      <li v-for="card in cards" :key="card._id"> {{ card.title }} </li>
    </ul>
    <v-card-actions>
      <create-card :listId="listId"></create-card>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CreateCard from './CreateCard.vue';

export default {
  name: 'single-list',
  components: {
    CreateCard,
  },
  props: ['listId', 'listName'],
  created() {
    this.findCards({
      query: {
        listId: this.listId,
      },
    });
  },
  computed: {
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    cards() {
      return this.findCardsInStore({
        query: {
          listId: this.listId,
        },
      }).data;
    },
  },
  methods: {
    ...mapActions('cards', { findCards: 'find' }),
  },

};
</script>
