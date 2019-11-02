<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <v-img
          src="https://sttammanyfederalcu.org/wp-content/uploads/2018/02/visa-purchase-alerts-banner.png"
          aspect-ratio="1.4"
          style="max-height: 150px !important;"
        ></v-img>
        <hr class="hr-text" data-content="NẠP CHIP QUA THẺ CÀO" />
      </v-col>
    </v-row>
  </v-parallax>
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