<template>
<div id="app">
  <v-app>
    <body>
      <v-responsive :aspect-ratio="16/9">
        <router-view />
      </v-responsive>
    </body>
  </v-app>
</div>
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
