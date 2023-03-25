<template>
  <!-- <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/singup">Sing up</router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" @click="logout"
              >Log Out
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation grow v-model="value" active bg-color="#36a498">
      <v-btn @click="$router.push('/login')" v-if="!auth">
        <v-icon>mdi-login</v-icon>
        Login
      </v-btn>

      <v-btn @click="$router.push('/singup')" v-if="!auth">
        <v-icon>mdi-account-plus-outline</v-icon>

        Sign up
      </v-btn>
      <v-btn @click="logout" v-else>
        <v-icon>mdi-logout</v-icon>

        <span>Log out</span>
      </v-btn>
      <v-btn @click="$router.push('/alert')">
        <v-icon>mdi-pipe-leak</v-icon>

        <span>Report Alert</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "NavigationBar",

  setup() {
    const store = useStore();
    const router = useRouter();

    const auth = computed(() => store.state.authenticated);

    //const token = localStorage.getItem('access_token');
    // const logout = async () => {
    //   await fetch('http://127.0.0.1:5000/logout', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}` },

    //   });
    // }
    const logout = () => {
      router.push("/login");
      localStorage.removeItem("access_token");
      store.dispatch("setAuth", false);
    };
    return {
      auth,
      logout,
    };
  },
};
</script>
