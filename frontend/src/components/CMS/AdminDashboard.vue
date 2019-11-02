<template>
  <div>
    <dashboard/>
    <router-view/>
  </div>
</template>
<script>
import dashboard from "./DashBoard";
export default {
  components: {
    dashboard
  }
};
</script>