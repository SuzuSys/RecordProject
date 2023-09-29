<script setup lang="ts">
import awsconfig from "@/aws-exports";
import { reactive } from 'vue';
import { Auth } from 'aws-amplify';

interface State {
  setup_config_str: string;
  show: {
    alert: {
      success: {
        copy: boolean;
      };
      error: {
        copy: boolean;
        get_token: boolean;
      };
    };
  };
};

const state: State = reactive<State>({
  setup_config_str: '',
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

getSetupInfo();

// methods setting
async function getSetupInfo() {
  try {
    const session = await Auth.currentSession();
    const refresh_token = session.getRefreshToken().getToken();
    const {
      aws_project_region,
      aws_user_pools_id,
      aws_user_pools_web_client_id,
      aws_appsync_graphqlEndpoint,
    } = awsconfig;
    const setup_config = {
      project_region: aws_project_region,
      user_pools_id: aws_user_pools_id,
      user_pools_web_client_id: aws_user_pools_web_client_id,
      appsync_graphqlEndpoint: aws_appsync_graphqlEndpoint,
      refresh_token,
    };
    state.setup_config_str = 'RecordConfig:' + JSON.stringify(setup_config);
    console.log(state.setup_config_str);
  } catch (e) {
    console.error(e);
    state.show.alert.success.copy = false;
    state.show.alert.error.copy = false;
    state.show.alert.error.get_token = true;
  }
};

async function copy() {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText('RecordConfig:' + state.setup_config_str);
    state.show.alert.success.copy = true;
    state.show.alert.error.copy = false;
    state.show.alert.error.get_token = false;
  } else {
    state.show.alert.success.copy = false;
    state.show.alert.error.copy = true;
    state.show.alert.error.get_token = false;
  }
};
</script>

<template>
  <v-card class="mx-auto my-12" max-width="500" variant="outlined">
    <v-card-title>Setup iOS Application</v-card-title>
    <v-card-actions>
      <v-container class="pa-1">
        <v-banner>
          <v-banner-text>
            iOS デバイスのセットアップを行います．iOS Config をクリップボードにコピーし，再度同様のショートカットにアクセスしてください．
          </v-banner-text>
          <template v-slot:actions>
            <v-btn
              @click="copy"
              variant="outlined"
            >
              Copy iOS config
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
          iOS config がコピーされました．
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
          iOS config の取得に失敗しました．
        </v-alert>
      </v-container>
    </v-card-actions>
  </v-card>
</template>