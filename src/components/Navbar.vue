<template>
    <v-card
      class="mx-auto overflow-hidden">
      <v-system-bar color="black darken-3"></v-system-bar>
      <v-app-bar
      app
      shrink-on-scroll
      color="blue-grey darken-4"
      dark >
        <v-spacer></v-spacer>
        <v-toolbar-title @click="goBack()" class="text-center d-flex align-center justify-center mytitle mt-2"> 
          <v-icon>
            mdi-video-vintage
          </v-icon>TV Shows Hunter
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-card>
  </template>
  
  <script>
    export default {
      data: () => ({
        drawer: false,
        group: null,
      }),
  
      methods: {
        goBack () {
          this.$router.push('/');
        },
      },
    }
  </script>

  <style>
    .mytitle {
      font-size: 1.8rem !important;
    }
  </style>