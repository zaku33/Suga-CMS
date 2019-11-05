<template>
  <div
    class="container"
    @mouseover="showSidebar=true;showLink=true"
    @mouseleave="showSidebar=false;showLink=false"
    :class="{'show':showSidebar}"
  >
    <div class="control"></div>
    <div class="nagivation-icons">
      <i class="fas fa-home"></i>
      <i class="fas fa-user-circle"></i>
      <i class="fas fa-info-circle"></i>
    </div>
    <div class="navigation-links">
      <transition-group name="fade">
        <div v-show="showLink" key="1">Home</div>
        <div v-show="showLink" key="2">User</div>
        <div v-show="showLink" key="3">Info</div>
      </transition-group>
      <!-- <v-row no-gutters>
          <v-col cols="6" md="4">
            <v-subheader>
              <h2 style="color:white">Loại thẻ</h2>
            </v-subheader>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-row class="mb-6">
              <v-col
                v-for="logo in logo_payments"
                :key="logo.id"
                :class="(12%logo_payments.length === 0) ? `col-md-${12/logo_payments.length} md-${12/logo_payments.length}`:'col-md-2 md-2'"
                cols="12"
              >
                <a v-bind:href="logo.refTo">
                  <img v-bind:src="require(`../../assets/payment/${logo.url}`)" />
                </a>
              </v-col>
            </v-row>
          </v-col>
      </v-row>-->
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      showSidebar: false,
      showLink: false
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  padding: 10px;
  min-height: calc(100vh-20px);
  background-color: red;
  border: solid #fff;
  border-width: 01px 0 0;
  z-index: 999;
  transition: all 0.5s ease-in-out;
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    margin-bottom: 10px;
    i {
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    }
  }
  &.show {
    width: 180px;
    .control > i {
      color: #fff;
      transform: rotateZ(-180deg);
    }
    .nagivation-icons {
      color: #fff;
    }
  }
  .nagivation-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50px;
    float: left;
    i {
      font-size: 2rem;
      padding: 10px 0;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      &:hover {
        color: #fff;
      }
    }
  }
  .navigation-link {
    padding-top: 14px;
    float: left;
    div {
      font-size: 1.35rem;
      padding-left: 10px;
      margin-bottom: 18px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
@mixin nav-childs($values...) {
  @each $var in $values {
    &:nth-child(#{$var}) {
      transition: transform linear calc(0.1s * #{$var}), display 0.5s;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  @include nav-childs(1, 2, 3);
}
.fade-enter,
.fade-leave-to {
  transform: scale(0);
}
</style>