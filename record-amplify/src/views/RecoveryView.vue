<script setup lang="ts">
import { reactive } from 'vue';
import { Auth } from 'aws-amplify';

interface State {
  refresh_token: string;
  show: {
    alert: {
      success: {
        copy: boolean;
      };
      error: {
        copy: boolean;
        get_token: boolean;
      }
    };
  };
};

const state: State = reactive<State>({
  refresh_token: '',
  show: {
    alert: {
      success: {
        copy: false,
      },
      error: {
        copy: false,
        get_token: false,
      },
    },
  },
});

getRefreshToken();

// methods setting
async function getRefreshToken() {
  try {
    const session = await Auth.currentSession();
    state.refresh_token = session.getRefreshToken().getToken();
  } catch (e) {
    console.error(e);
    state.show.alert.success.copy = false;
    state.show.alert.error.copy = false;
    state.show.alert.error.get_token = true;
  }
  
}
async function copy() {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText('RefreshToken:' + state.refresh_token);
    state.show.alert.success.copy = true;
    state.show.alert.error.copy = false;
    state.show.alert.error.get_token = false;
  } else {
    state.show.alert.success.copy = false;
    state.show.alert.error.copy = true;
    state.show.alert.error.get_token = false;
  }
}



</script>

<template>
  <v-card class="mx-auto my-12" max-width="500" variant="outlined">
    <v-card-title>Recovery iOS Application</v-card-title>
    <v-card-actions>
      <v-container class="pa-1">
        <v-banner>
          <v-banner-text>
            Refresh token の有効期限が切れました．Refresh token をクリップボードにコピーし，再度ショートカットで同様の操作を行うことによってシステムを回復することができます．
          </v-banner-text>
          <template v-slot:actions>
            <v-btn
              @click="copy"
              variant="outlined"
            >
              Copy refresh token
            </v-btn>
          </template>
        </v-banner>
        <v-alert
          type="success"
          v-show="state.show.alert.success.copy"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          Refresh token がコピーされました．
        </v-alert>
        <v-alert
          type="error"
          v-show="state.show.alert.error.copy"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          クリップボードが使用できませんでした．
        </v-alert>
        <v-alert
          type="error"
          v-show="state.show.alert.error.get_token"
          density="compact"
          class="my-2"
          variant="outlined"
        >
          Refresh token の取得に失敗しました．
        </v-alert>
      </v-container>
    </v-card-actions>
  </v-card>
</template>