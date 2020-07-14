<template>
  <v-flex sm12 pa-2>
    <v-card>
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create Card</div>
        <div>
          <v-form>
            <v-text-field
              v-model="card.title"
              :rules="notEmptyRules"
              label="Title"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!validCard">Create Card</v-btn>
          </v-form>
          <v-progress-circular
            v-if="creatingCard"
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