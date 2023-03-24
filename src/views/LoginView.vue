<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <v-form v-model="form" @submit.prevent="submit">
      <v-text-field
        v-model="data.client_number"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Абонаментен Номер"
      ></v-text-field>

      <v-text-field
        v-model="data.egn_hash"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="ЕГН"
      ></v-text-field>

      <br />

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
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const data = reactive({
      client_number: "",
      egn_hash: "",
    });
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
      const response = await fetch(
        "http://localhost:8080/http://127.0.0.1:5000/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      const token = result.access_token;

      // Store the token in local storage
      localStorage.setItem("access_token", token);

      await router.push("/");
    };
    return {
      data,
      submit,
    };
  },
};
</script>