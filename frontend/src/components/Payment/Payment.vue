<template>
  <!-- <v-card class="mx-auto"> -->
  <div>
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      
    >
      <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
    </v-img>
    <hr class="hr-text" data-content="NẠP CHIP QUA THẺ CÀO" />
    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

    <v-card-text class="text--primary">
      <v-subheader>Mã bí mật</v-subheader>
      <v-text-field solo></v-text-field>
      <v-subheader>Mã Serial</v-subheader>
      <v-text-field solo></v-text-field>
    </v-card-text>
  </div>

  <!-- </v-card> -->
</template>
<style lang="scss" scoped>
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
  &:before {
    content: "";
    // use the linear-gradient for the fading effect
    // use a solid background color for a solid bar
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 0.5em;
    line-height: 1.5em;
    // this is really the only tricky part, you need to specify the background color of the container element...
    color: #818078;
    background-color: #fcfcfa;
  }
}
</style>