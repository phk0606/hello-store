<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1"> 이벤트 </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list dense>
      <v-list-item-group>
        <v-list-item to="/event/event-list">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>진행중인 이벤트</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item to="/company/company-location">
          <v-icon>mdi-menu-right</v-icon>
          <v-list-item-content>
            <v-list-item-title>당첨자 발표</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'EventLeft',
  data: () => ({
    items: [
      { text: 'Outer', icon: 'mdi-clock' },
      { text: 'Top', icon: 'mdi-account' },
      { text: 'Bottom', icon: 'mdi-flag' },
      { text: 'Skirt', icon: 'mdi-flag' },
      { text: 'Dress', icon: 'mdi-flag' },
    ],

    model: 1,
  }),
};
</script>

<style></style>
