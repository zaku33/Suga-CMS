<template>
  <v-navigation-drawer
    v-model="drawer"
    expand-on-hover
    absolute
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    permanent
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{username}}</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-group
        v-model="item.active"
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        no-action
      >
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          ripple
          :to="subItem.linkTo"
          exact
        >
          <v-list-item-content>
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon v-text="subItem.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
    <!-- <v-list-item> -->
      <a @click="Logout">
        <v-icon>fas fa-sign-out-alt</v-icon>
        <v-list-item-title style="color:white">Logout</v-list-item-title>
      </a>
    <!-- </v-list-item> -->
  </v-navigation-drawer>
</template>

<script>
import API from '../../services/api';
import Swal from 'sweetalert2';
const CustomeSwal = Swal.mixin({
    customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
export default {
  beforeCreate() {
    
  },
  data() {
    return {
      drawer: true,
      username: $cookies.get("user"),
      items: [
        {
          icon: "fas fa-home",
          title: "Home",
          active: false
        },
        {
          icon: "fas fa-chart-line",
          title: "Chart",
          active: false,
          items: [
            {
              title: "Analytics",
              icon: "fas fa-chart-area",
              linkTo: "/admin/dashboard/analytics"
            },
            {
              title: "Schedular",
              icon: "fas fa-clipboard-list",
              linkTo: "/admin/dashboard/schedular"
            }
          ]
        },
        {
          icon: "fas fa-blog",
          title: "Blog",
          active: false
        },
        {
          icon: "fas fa-dice-six",
          title: "Game",
          active: false
        },
        {
          icon: "fas fa-inbox",
          title: "Email",
          active: false
        },
        {
          icon: "fas fa-bullhorn",
          title: "Announcement",
          active: false
        },
        {
          icon: "fas fa-ad",
          title: "Promotions",
          active: false
        }
      ]
    };
  },
  methods: {
    Logout() {
      CustomeSwal.fire({
        title: `Are you sure to log out?`,
        text: `You are going to log out`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          $cookies.remove("user");
          $cookies.remove("token");
          this.$router.push({ path: "/admin/login" });
        }
      });
    }
  }
};
</script>

