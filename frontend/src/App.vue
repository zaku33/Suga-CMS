<template>
<v-app>
  <div id="app">
    <body>
      <v-responsive :aspect-ratio="16/9" >
        <!-- <v-card-text> -->
        <router-view></router-view>
        <!-- </v-card-text> -->
      </v-responsive>
    </body>
  </div>
</v-app>
<!-- </v-app> -->
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1px;
}
</style>
