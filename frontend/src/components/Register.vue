<template>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <h1>Register</h1>

      <v-text-field
        label="Username"
        placeholder="Username"
        v-model="username"
        clearable
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        label="Email"
        placeholder="Email"
        v-model="email"
        clearable
        :rules="[rules.required,rules.email]"
        required
      ></v-text-field>

      <v-text-field
        label="Password"
        placeholder="Password"
        type="password"
        autocomplete="new-password"
        v-model="password"
        clearable
        :rules="[rules.required,rules.min_length]"
        required
      ></v-text-field>

      <v-text-field
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        autocomplete="new-password"
        v-model="confirm_password"
        clearable
        :rules="[rules.required,rules.min_length,matchPassword]"
        required
      ></v-text-field>

      <v-btn color="blue" dark class="mr-4" @click="Register" :disabled="allFieldFullFill">
        <v-icon class="mr-3">fas fa-user-plus</v-icon>Register
      </v-btn>
      <br>
      <br>
      <hr>
      <h5>Have already had account ? <a> <router-link v-bind:to="'login'">Login</router-link> </a></h5>
    </v-flex>
  </v-layout>
</template>
<script>
import API from '../services/api';
import Swal from 'sweetalert2';

export default {
  data() {
    let tempPassword = "";
    return {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      blockRegister: true,
      rules: {
        required: value => {
          return !!value || "This field must not null";
        },
        min_length: value =>
          value != null
            ? value.length >= 6 || "Atleast 6 characters"
            : "This field must not null",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail."; // true / false || message
        }
      }
    };
  },
  computed: {
    matchPassword() {
      return () =>
        this.password === this.confirm_password || "Not match with password!";
    },
    allFieldFullFill() {
      return (this.blockRegister =
        this.username != "" &&
        this.password.length >= 6 &&
        this.confirm_password == this.password &&
        this.rules.email(this.email) == true
          ? false
          : true);
    }
  },
  methods: {
    async Register() {
      let body = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      let response = await API.register(body);
      if (response.data.errCode != 200)
        return alert(`This username or email has already existed!`);
      Swal.fire({
        title: `${response.data.message}`,
        text: "Go to login page",
        type: "success",
        confirmButtonText: "Go"
      }).then(() => {
        this.$router.push("/admin/login");
      });
    }
  }
};
</script>