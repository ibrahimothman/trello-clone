<template>
  <v-card
    @dragover="setDroppingList($event, list)"
    :class="{
      'green lighten-4':
      droppingList && list._id.toString() === droppingList._id.toString()
    }"
  >
    <v-card-title primary-title>
      <v-layout column>
        <v-flex xs12>
          <div class="headline">{{list.name}}</div>
        </v-flex>
         <v-flex xs12
          v-for="card in cards"
          :key="card._id"
          class="pa-1">
          <v-card
            draggable="true"
            @dragstart="setDraggingCard(card)"
            @dragend="dropCard" >
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs12>
                  <div>
                    <div class="headline">{{card.title}}</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <create-card :createCard="createCard"></create-card>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { mapActions, mapGetters } from 'vuex';
import CreateCard from './CreateCard.vue';

export default {
  name: 'single-list',
  components: {
    CreateCard,
  },
  props: [
    'list',
    'setDroppingList',
    'droppingList',
    'setDraggingCard',
    'dropCard',
    'cardCreated',
  ],
  created() {
    this.findCards({
      query: {
        listId: this.list._id,
      },
    });
  },
  computed: {
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    cards() {
      return this.findCardsInStore({
        query: {
          listId: this.list._id,
        },
      }).data;
    },
  },
  methods: {
    ...mapActions('cards', { findCards: 'find' }),
    async createCard(card) {
      const { Card } = this.$FeathersVuex.api;
      const newCard = new Card(card);
      newCard.boardId = this.$route.params.id;
      newCard.listId = this.list._id;
      await newCard.save();
      await this.cardCreated(card, this.list);
    },
  },

};
</script>
