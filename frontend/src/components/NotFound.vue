<template>
  <div style="text-align:center">
    <div>
      <h1 style="color:red;">404 PAGE NOT FOUND!</h1>
    </div>
    <div>
      <h3 style="color:white">
        Cannot found <strong style="color:red">{{currentRouteName}}</strong> Page
      </h3>
    </div>
    <div>
      <router-link :to="{path :'/admin'}">
        <h2 style="color:greenyellow">Back to main page</h2>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.path;
    }
  }
};
</script>