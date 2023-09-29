<script setup lang="ts">
// import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Auth } from 'aws-amplify';
/*
async function callEcho(): Promise<void> {
  try {
    let response = await API.graphql<GraphQLQuery<EchoQuery>>({
      query: echo,
      variables: {
        msg: 'Hello',
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
*/
async function callAuth(): Promise<void> {
  const user = await Auth.currentSession();
  console.log(user);
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>
      Dashboard
    </v-toolbar-title>
  </v-toolbar>
  <v-btn @click="callAuth">
    callAuth
  </v-btn>
</template>