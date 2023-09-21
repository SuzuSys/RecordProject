<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import App from '@/App.vue';
import '@aws-amplify/ui-vue/styles.css';
import { Amplify } from "aws-amplify";
import awsconfig from "@/aws-exports";
Amplify.configure(awsconfig);
</script>

<template>
  <authenticator>
    <app></app>
  </authenticator>
</template>