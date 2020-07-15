<template>
  <v-container fluid>
      <v-layout>
        <v-flex xs10>
          <v-layout row wrap>
            <v-flex xs12>
            </v-flex>
            <v-progress-circular
              v-if="isBoardLoding"
              :size="70"
              :width="7"
              indeterminate
              color="primary">
            </v-progress-circular>
            <v-flex xs12 v-if="!isBoardLoding" pa-5>
              <v-layout row wrap>
                <v-flex xs12>
                  <h2> {{ board.name }} </h2>
                </v-flex>
                <v-flex v-for="list in lists" :key="list._id" sm3  pa-2>
                  <single-list
                    :setDroppingList="onSetDroppingList"
                    :droppingList="droppingList"
                    :setDraggingCard="onSetDraggingCard"
                    :dropCard="dropCard"
                    :listId="list._id"
                    :listName="list.name"/>
                </v-flex>
                <new-list-form :createList="createList"/>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

      </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import SingleList from '../components/SingleList.vue';
import NewListForm from '../components/NewListForm.vue';

export default {
  name: 'board',
  components: {
    SingleList,
    NewListForm,
  },
  data: () => ({
    droppingList: null,
    draggingCard: null,
  }),
  async created() {
    await this.getBoard(this.$route.params.id);
    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },
  computed: {
    ...mapState('boards', { isBoardLoding: 'isGetPending' }),
    ...mapGetters('boards', { getBoardInStore: 'get' }),
    ...mapState('lists', { isListsLoding: 'isFindPending' }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    board() {
      return this.getBoardInStore(this.$route.params.id);
    },
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },

  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    async createList(list) {
      const { List } = this.$FeathersVuex.api;
      const newList = new List(list);
      newList.boardId = this.$route.params.id;
      await newList.save();
    },
    onSetDroppingList(event, listId) {
      if (listId) {
        event.preventDefault();
        this.droppingList = listId;
      }
    },
    onSetDraggingCard(card) {
      this.draggingCard = card;
    },
    async dropCard() {
      console.log(this.draggingCard);
      this.draggingCard.listId = this.droppingList;
      await this.draggingCard.update();
      this.draggingCard = null;
      this.droppingList = null;
    },
  },

};
</script>
