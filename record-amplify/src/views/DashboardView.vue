<script setup lang="ts">
import { echo } from '@/graphql/queries';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { EchoQuery } from '@/API';

async function callEcho(): Promise<void> {
  try {
    let response = await API.graphql<GraphQLQuery<EchoQuery>>({
      query: echo,
      variables: {
        msg: 'Hello',
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>
      Dashboard
    </v-toolbar-title>
  </v-toolbar>
  <v-btn @click="callEcho"></v-btn>
</template>