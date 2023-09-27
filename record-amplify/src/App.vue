<script setup lang="ts">
import { reactive } from 'vue';
import { Auth } from 'aws-amplify';
import { RouterView, useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

// Interface
interface State {
  model: {
    drawer: {
      show_drawer: boolean;
    };
  };
  show: {
    alert: {
      error: {
        load_user_info: boolean;
      };
    };
  };
  disabled: {
    btn: {
      reload_user_info: boolean;
    };
  };
  model_value: {
    overlay: {
      loading: boolean;
    };
  };
  if: {
    router_view: {
      loaded_user_info: boolean;
    };
  };
};

// State Setting
const state: State = reactive<State>({
  model: {
    drawer: {
      show_drawer: false,
    },
  },
  show: {
    alert: {
      error: {
        load_user_info: false,
      },
    },
  },
  disabled: {
    btn: {
      reload_user_info: false,
    },
  },
  model_value: {
    overlay: {
      loading: false,
    },
  },
  if: {
    router_view: {
      loaded_user_info: false,
    },
  },
});

// UserStore Setting
const user_store = useUserStore();
asyncLoadUser();

// Method Setting
async function asyncLoadUser(): Promise<void> {
  state.disabled.btn.reload_user_info = true;
  state.model_value.overlay.loading = true;
  try {
    const user = await Auth.currentUserInfo();
    const {
      email,
      email_verified,
      sub,
    } = user.attributes;
    user_store.init(sub, email, email_verified);
    state.show.alert.error.load_user_info = false;
    state.model_value.overlay.loading = false;
    state.if.router_view.loaded_user_info = true;
  } catch (e) {
    console.error(e);
    state.show.alert.error.load_user_info = true;
  } finally {
    state.disabled.btn.reload_user_info = false;
    state.model_value.overlay.loading = false;
  }
}

// Router Method Setting
const router = useRouter();
const route = useRoute();
function goDashboard(): void {
  if (route.path !== '/dashboard') {
    router.push({ path: '/dashboard' });
  } else {
    state.model.drawer.show_drawer = false;
  }
}
function goAccount(): void {
  if (route.path !== '/account') {
    router.push({ path: '/account' });
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
      <v-btn @click="goAccount" icon>
        <v-icon icon="mdi-account" />
      </v-btn>
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
      <v-alert
        variant="outlined"
        density="compact"
        type="error"
        v-show="state.show.alert.error.load_user_info"
      >
        ユーザー情報の取得に失敗しました．
        <v-btn
          size="small"
          variant="outlined"
          @click="asyncLoadUser"
          :disabled="state.disabled.btn.reload_user_info"
        >
          再取得する
        </v-btn>
      </v-alert>
      <v-overlay
        :model-value="state.model_value.overlay.loading"
        class="align-center justify-center"
      >
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <router-view
        v-if="state.if.router_view.loaded_user_info"
      ></router-view>
    </v-main>
  </v-app>
</template>
