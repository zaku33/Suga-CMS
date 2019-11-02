<template>
  <!-- <v-card> -->
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

      <v-list-item-title>Pride Selim</v-list-item-title>

      <!-- <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>-->
    </v-list-item>
    <v-divider></v-divider>

    <v-list>
      <!-- <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>-->

      <v-list-group prepend-icon="mdi-home-city" value="true">
        <template v-slot:activator>
          <v-list-item-title>Home</v-list-item-title>
        </template>
      </v-list-group>

      <v-list-group prepend-icon="mdi-account" value="true">
        <template v-slot:activator>
          <v-list-item-title>User</v-list-item-title>
        </template>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <!-- </v-card> -->
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", link: "/" },
        { title: "My Account", icon: "mdi-account", link: "/" },
        { title: "Users", icon: "mdi-account-group-outline", link: "/" },
        { title: "Android", icon: "fab fa-android", link: "/" },
        { title: "Payment", icon: "fab fa-amazon-pay", link: "/" }
      ],
      subGroup: []
      //   mini: true
    };
  }
};
</script>

