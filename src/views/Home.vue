<template>
  <v-app id="inspire">
    <div
      class="d-block pa-2 blue-grey darken-4 accent-4 white--text full-height"
    >
    <!--  -->
      <v-main>
        <v-container>
          <v-row align="center">
            <v-col  cols="6" md="2">
              <v-btn class="mb-5" text dark @click="filtrerByRating" active-class>
                Top rated
              </v-btn>
            </v-col>
            <v-col
            cols="12" md="5"
              >
                <v-select
                  v-model="value"
                  :items="items"
                  
                  label="Genres"
                  clearable
                  solo
                  dark
                  dense
                  item-color="blue-grey darken-4"
                  @input="filterByGenres"
                ></v-select>
              </v-col>
            <!-- Search bar -->
            <v-col  cols="12" md="5" >
              <v-text-field
                solo
                v-model="search"
                append-icon="mdi-magnify"
                label="Search for a Show"
                dark
                dense
                clearable
                @input="serachMethod"
              ></v-text-field>
            </v-col>
            <!-- Search bar end -->
          </v-row>
          <v-divider class="blue-grey darken-3 mb-5"></v-divider>
          <!-- Card of Shows list -->
          <v-row>
            <v-col
              v-for="item in filteredShows"
              :key="item.id"
              cols="md-3 sm-1"
            >
              <router-link
                :to="{ name: 'Details', params: { id: item.id } }"
                style="text-decoration: none; color: inherit;"
              >
                <!-- Card design -->
                <v-card class="mx-auto" elevation="1" color="#ECEFF1">
                  <v-img :src="item.image.medium"></v-img>
                  <v-card-title>
                    {{ item.name }}
                  </v-card-title>

                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-icon color="yellow darken-3">
                        mdi-star
                      </v-icon>

                      <div class="black--text ml-2">
                        {{ item.rating.average }}
                      </div>
                      <v-divider class="ml-2 mr-2" vertical></v-divider>
                      <span class="black--text">{{ item.premiered }}</span>
                      <span class="grey--text small">({{ item.status }})</span>
                      <v-spacer></v-spacer>
                    </v-row>
                    <v-row align="center" class="mx-0">
                      <span class="blue-grey--text darken-1">{{
                        item.genres.join()
                      }}</span>
                      <v-spacer></v-spacer>
                    </v-row>
                  </v-card-text>
                </v-card>
              </router-link>
              <!-- Card of shows end -->
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
  name: "Home",
  data: () => ({
    show: false,
    showsList: [],
    filteredShows: [],
    search: null,
    items: [],
    value: null,
    sampleArray:[]
  }),
  methods: {
    async initialize() {
      try {
        const response = await axios.get(`${SERVER_URL}`);
        this.showsList = response.data;
        this.filteredShows = response.data;
        
         response.data.filter((item)=>{
          item.genres.forEach(element => {
            
             this.items.includes(element) ? null : this.items.push(element);
          });
       
        })
      } catch (error) {
        console.log(error);
      }
    },
    serachMethod(e) {
      this.value = null;
      this.filteredShows = this.showsList.filter((item) => {
        return (
          (item.name || "").toLowerCase().indexOf((e || "").toLowerCase()) > -1
        );
      });
    },
    onClickedShow(item) {
      this.$router.push({ name: "Details", params: item });
    },
    goBack() {
      this.$router.push("/");
    },
    filtrerByRating() {
      this.filteredShows = this.filteredShows.sort(function(a, b) {
        return b.rating.average - a.rating.average;
      });
      
    },
    filterByGenres(){
      this.sampleArray = [];
      this.search = null;

      if(this.value){
        console.log(this.value.length);
        this.sampleArray = [];
        this.showsList.filter((item) => {
         item.genres.includes(this.value) ? this.sampleArray.push(item) : null
        });
        // console.log(JSON.stringify(this.sampleArray));
        this.filteredShows = this.sampleArray;
      }else{
        this.value = null;
        this.filteredShows = this.showsList;
      }
    }
  },
  created() {
    this.initialize();
  },
  computed: {},
};
</script>

<style>
.full-height {
  height: 100%;
}
.no-underline {
  text-decoration: none;
}
</style>
