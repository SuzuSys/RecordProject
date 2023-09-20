<script setup lang="ts">
import { reactive } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";

interface State {
  model: {
    drawer: {
      show_drawer: boolean;
    };
  };
}

const state: State = reactive<State>({
  model: {
    drawer: {
      show_drawer: false,
    },
  },
});

// Router Method Setting
const router = useRouter();
const route = useRoute();
function goDashboard(): void {
  if (route.path !== "/dashboard") {
    router.push({ path: "/dashboard" });
  } else {
    state.model.drawer.show_drawer = false;
  }
}
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="state.model.drawer.show_drawer = !state.model.drawer.show_drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Record</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="state.model.drawer.show_drawer" temporary>
      <v-list nav density="compact">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          @click="goDashboard"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
