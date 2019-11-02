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