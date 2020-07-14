<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout column>
        <v-flex xs12>
          <div class="headline"> {{ list.name }} </div>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['list'],
};
</script>
