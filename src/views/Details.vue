<template>
  <v-app id="inspire">
    <div
      class="d-block pa-2 blue-grey darken-4 accent-4 white--text full-height"
    >
      <v-main>
        <v-container>
          <v-row dense="" class="pa-7">
            <v-col>
              <v-card class="ma-7" outlined tile>
                <v-img :src="showDetails.image.medium"></v-img>
              </v-card>
            </v-col>
            <v-col cols="13" sm="6" md="8">
              <div dark class="d-flex flex-column  ma-7 ml-0">
                <h1>
                  {{ showDetails.name.toUpperCase() }}
                </h1>
              </div>
              <div dark class="d-flex flex-column  ma-7 ml-2">
                <v-row>
                  <v-icon color="yellow darken-3" dense>
                    mdi-star
                  </v-icon>
                  <div class="blue-grey--text lighten-2 darken-2 ml-2">
                    {{ showDetails.rating.average }}
                  </div>
                  <v-divider
                    class="ml-2 mr-2 blue-grey darken-3"
                    vertical
                  ></v-divider>
                  <span class="blue-grey--text lighten-2"
                    >{{ showDetails.premiered }} ({{
                      showDetails.status
                    }})</span
                  >
                  <v-divider
                    class="ml-2 mr-2 blue-grey darken-3"
                    vertical
                  ></v-divider>
                  <span class="blue-grey--text darken-1">{{
                    showDetails.genres.join()
                  }}</span>
                </v-row>
              </div>
              <div dark class="d-flex flex-column  ma-7 ml-2">
                <v-row>
                  <span v-html="showDetails.summary"></span>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "../config/general";

export default {
  name: "Details",

  data: () => ({
    showDetails: {},
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let response = await axios.get(
        `${SERVER_URL}` + "/" + this.$route.params.id
      );
      console.log("passing id: " + JSON.stringify(response.data.image.medium));
      this.showDetails = response.data;
      // console.log('data :'+ JSON.stringify(this.$route.params));
    },
    goBack() {
      this.$router.push("/");
    },
    getSummary(val) {
      let summary = val;
      summary = summary.replace("<p>", "");
      return summary;
    },
  },
};
</script>
