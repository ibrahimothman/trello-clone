<template>
  <v-layout row fill-height style="align-items:stretch;">
    <v-flex xs12>
      <v-card
      height="100%"
      max-width="500"
      tile
      >
      <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Activities</h3>
          </div>
        </v-card-title>
        <v-list three-line>
          <v-list-item v-for="activity in activities" :key="activity._id">

            <v-list-item-content>
              <!-- <v-list-item-title v-text="activity.userId"></v-list-item-title> -->
              <v-list-item-subtitle v-html="markdownify(activity.text)"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import marked from 'marked';

export default {
  name: 'activities',
  props: ['activities'],
  methods: {
    markdownify(str) {
      return marked(str);
    },
  },
};
</script>
