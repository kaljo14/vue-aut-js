<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">Home</router-link>
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
              <li class="nav-item">
                <router-link class="nav-link " to="/login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link " to="/singup">Sing up</router-link>
              </li>
            </ul>
               <ul class="navbar-nav me-auto mb-2 mb-md-0" v-else>
                <li class="nav-item">
                  <router-link class="nav-link " to="/login" @click="logout">Log Out </router-link>
                </li>
               
              </ul>
          </div>
        </div>
      </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from "vuex";

export default {
  name: "NavigationBar",
  setup() {
    const store = useStore();

    const auth = computed(() => store.state.authenticated)
    
    //const token = localStorage.getItem('access_token');
    // const logout = async () => {
    //   await fetch('http://127.0.0.1:5000/logout', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}` },
        
    //   });
    // }
     const logout = ()=>{localStorage.removeItem('access_token');
    store.dispatch('setAuth', false);
    }
    return {
      auth,
      logout
    }
  }
}
</script>
