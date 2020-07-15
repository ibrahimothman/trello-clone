<template>
  <v-card
    @dragover="setDroppingList($event, listId)"
    :class="{'green lighten-4': listId === droppingList}"
  >
    <v-card-title primary-title>
      <v-layout column>
        <v-flex xs12>
          <div class="headline">{{listName}}</div>
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
  props: [
    'listId',
    'listName',
    'setDroppingList',
    'droppingList',
    'setDraggingCard',
    'dropCard',
  ],
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
