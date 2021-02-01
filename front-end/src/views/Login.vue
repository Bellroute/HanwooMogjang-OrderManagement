<template>
  <div id="login">
    <h1 style="text-align: center;">한우목장</h1>
    <h2 style="text-align: center;">- 로그인 -</h2>
    <div class="input_row">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="username" />
    </div>
    <div class="input_row">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div class="button" v-on:click="login">로그인</div>
  </div>
</template>

<script>
import router from "../router/index";
import VueCookies from "vue-cookies";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    if (VueCookies.get("token")) {
      router.push("/");
    }
  },
  methods: {
    login: async function() {
      await axios
        .post("http://localhost:8080/api/auth/login", {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          if (response.status === 200) {
            VueCookies.set("token", response.data.token);
            router.push("/");
          }
        })
        .catch(function(err) {
          console.log(err);
          alert("로그인 실패");
        });
    }
  }
};
</script>

<style scoped>
#login {
  background-color: white;
  padding: 5% 10%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

label {
  display: block;
  font-size: 15px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 5px;
  text-align: left;
}

input {
  background-color: white;
  border: 1px solid #0e3773;
  border-radius: 0;
  color: #0e3773;
  outline: none;
  font-size: 14px;
  font-family: "Avenir Next", "KoPub Dotum", sans-serif;
  height: auto;
  padding: 15px;
  width: 100%;
  -webkit-appearance: none;
}

.button {
  margin-top: 5%;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  background-color: #42b883;
  padding: 10px 40px;
  color: white;
  width: 90%;
  border-radius: 10px;
}
</style>
