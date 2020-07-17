<template>
  <v-container fluid>
      <v-layout>
        <v-flex xs10>
          <v-layout row wrap pa-5>
            <v-flex xs12 v-if="boardError">
              <v-alert :value="boardError" type="error">
                {{boardError.message}}
              </v-alert>
            </v-flex>
            <v-progress-circular
              v-if="isBoardLoding || isListsLoding"
              :size="70"
              :width="7"
              indeterminate
              color="primary">
            </v-progress-circular>
            <v-flex xs12 v-if="!boardError">
              <v-layout row wrap>
                <v-flex xs12>
                  <h2 v-if="board">{{board.name}}</h2>
                </v-flex>
                <v-flex sm3 v-for="list in lists" :key="list._id" pa-2>
                  <single-list
                    :list="list"
                    :setDroppingList="onSetDroppingList"
                    :setDraggingCard="onSetDraggingCard"
                    :droppingList="droppingList"
                    :dropCard="dropCard"
                    :cardCreated="onCardCreated"
                  ></single-list>
                </v-flex>
                <new-list-form :createList="createList"></new-list-form>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs2>
          <!-- <pre>{{activities}}</pre> -->
          <activities :activities="activities"></activities>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { mapState, mapActions, mapGetters } from 'vuex';
import SingleList from '../components/SingleList.vue';
import NewListForm from '../components/NewListForm.vue';
import Activities from '../components/Activities.vue';

export default {
  name: 'board',
  components: {
    SingleList,
    NewListForm,
    Activities,
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
    this.findActivities({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards',
      {
        isBoardLoding: 'isGetPending',
        boardError: 'errorOnGet',
      }),
    ...mapGetters('boards', { getBoardInStore: 'get' }),
    ...mapState('lists', { isListsLoding: 'isFindPending' }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('activities', { findActivitiesInStore: 'find' }),
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
    activities() {
      return this.findActivitiesInStore({
        query: {
          boardId: this.$route.params.id,
          $sort: {
            createdAt: -1,
          },
        },
      }).data;
    },
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('activities', { findActivities: 'find' }),
    async createList(list) {
      const { List } = this.$FeathersVuex.api;
      const newList = new List(list);
      newList.boardId = this.$route.params.id;
      await newList.save();
      await this.createActivity(`created list **${newList.name}**`);
    },
    async onCardCreated(card, list) {
      await this.createActivity(`created card **${card.title}** in list **${list.name}**`);
    },
    onSetDroppingList(event, list) {
      if (list) {
        event.preventDefault();
        this.droppingList = list;
      }
    },
    onSetDraggingCard(card) {
      this.draggingCard = card;
    },
    async dropCard() {
      if (this.draggingCard.listId !== this.droppingList._id) {
        this.draggingCard.listId = this.droppingList._id;
        await this.draggingCard.update();
        await this.createActivity(`moved card **${this.draggingCard.title}** to list **${this.droppingList.name}**`);
      }
      this.draggingCard = null;
      this.droppingList = null;
    },
    async createActivity(text) {
      const { Activity } = this.$FeathersVuex.api;
      const activity = new Activity();
      activity.boardId = this.$route.params.id;
      activity.text = text;
      await activity.save();
    },
  },

};
</script>
