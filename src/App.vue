<template>
  <NavigationBar />

  <main class="form-signin w-100 m-auto">
    <router-view />
  </main>
</template>
<script>
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  components: { NavigationBar },
};
</script>

<style>
/* .form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} */
</style>
