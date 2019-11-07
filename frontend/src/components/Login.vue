<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <h1>Login</h1>
      <v-text-field
        label="Username"
        v-model="username"
        :rules="[rules.filled]"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        autocomplete="new-password"
        v-model="password"
        :rules="[rules.filled]"
        required
      ></v-text-field>
      <v-btn color="green" dark class="mr-4" @click="Login">
        <v-icon class="mr-3">fas fa-sign-in-alt</v-icon>Login
      </v-btn>
      <v-btn color="blue" dark to="register" class="mr-4">
        <v-icon class="mr-3">fas fa-user-plus</v-icon>Register
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import API from '../services/api';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      username: "",
      password: "",
      rules: {
        filled: value => {
          return !!value || "This field must not null";
        }
      }
    };
  },
  methods: {
    async Login() {
      let body = {
        username: this.username,
        password: this.password
      };
      if (this.username == "" || this.password == "")
        return alert("Username & Password must not empty!");
      let response = await API.login(body);
      if (response.data.errCode != 200)
        return Swal.fire({
          type: "error",
          title: "Login failed!",
          text: `${response.data.message}`
        });

      var _token = `${response.data.message.type} ${response.data.message.token} `; // get bearer + token
      var obj = JSON.parse(response.config.data); // parse string json => json
      var _user = obj.username; // get username
      $cookies.set("token", _token); // save token into cookies
      $cookies.set("user", _user); // save username into cookies
      Swal.fire({
        title: `Login success!`, // title
        text: `Welcome ${_user} back!`, // text to announce
        type: "success", // icon
        timer: 1000, // waiting time
        confirmButtonText: "Go" // button
      }).then(() => {
        this.$router.push({ path: "dashboard" });
      });
    }
  }
};
</script>