<template>
  <!-- <div id="app">
    <button id="install-button" style="display: none;">Add to Home Screen</button>

  </div> -->
  <v-card class="mx-auto px-6 py-8 card-comp" max-width="344">
    <v-card-title class="text-center">Account Login</v-card-title>
    <v-form v-model="form" @submit.prevent="submit">
      <v-text-field
        v-model="data.client_number"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Client Number"
      ></v-text-field>

      <v-text-field
        v-model="data.egn_hash"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="EGN"
      ></v-text-field>

      <v-alert
        v-if="errorMsg"
        density="compact"
        type="error"
        :text="errorMsg"
        class="alert-msg"
      >
      </v-alert>

      <v-btn
        :disabled="!form"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Sign In
      </v-btn>
    </v-form>
  </v-card>

  <!-- <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <input
      v-model="data.client_number"
      type="number"
      class="form-control"
      placeholder="Абонаментен Номер"
      required
    />

    <input
      v-model="data.egn_hash"
      type="password"
      class="form-control"
      placeholder="ЕГН"
      required
    /> 
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
  -->
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const data = reactive({
      client_number: "",
      egn_hash: "",
    });
    const errorMsg = ref("");

    const router = useRouter();
    // access_token and saves it as cookie
    // const submit = async () => {

    //   const response = await fetch('http://127.0.0.1:5000/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     credentials:'include',
    //     body: JSON.stringify(data)
    //   });

    //   const accessToken = response.headers.get('Set-Cookie').split(';')[0].split('=')[1];
    //   document.cookie = `access_token=${accessToken}; path=/;`;

    //   await router.push('/');
    // }

    ///takes access_token and saves it in storage
    const submit = async () => {
      try {
        const response = await fetch("https://wmapi.dron.bg/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.message !== undefined) {
          errorMsg.value = result.message;
        } else {
          const token = result.access_token;
          // if (token === undefined){displayErrorMsg}
          // Store the token in local storage
          localStorage.setItem("access_token", token);

          await router.push("/home");
        }
      } catch (error) {
        console.error("Error occurred during fetch:", error);
      }
    };
    return {
      data,
      submit,
      errorMsg,
    };
  },
};
</script>
<style scoped>
.alert-msg {
  margin-bottom: 5px;
}
.card-comp {
  width: 90%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>