<template>
  <div class="wraper">
    <v-card>
      <v-card-title class="text-center">Please register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="data.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.email"
            type="email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.egn_hash"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            v-model="data.client_number"
            label="Client number"
            required
          ></v-text-field>

          <div v-for="(address, index) in data.addresses" :key="index">
            <v-text-field
              v-model="address.address"
              label="Address"
              required
            ></v-text-field>
            <div class="btn-container">
              <v-btn
                class="btn"
                @click="removeAddress(index)"
                color="error"
                v-show="data.addresses.length > 1"
                >Remove Address</v-btn
              >
              <v-btn
                :class="{
                  btn: data.addresses.lenght > 2,
                  btnfull: data.addresses.length <= 1,
                }"
                v-show="data.addresses.length < 3"
                @click="addAddress"
                color="success"
                >Add Address</v-btn
              >
            </div>
          </div>
          <v-btn type="submit" color="primary" block>Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SingupView",
  setup() {
    const data = reactive({
      name: "",
      email: "",
      egn_hash: "",
      addresses: [{ address: "" }],
      client_number: "",
    });
    const router = useRouter();
    function addAddress() {
      data.addresses.push({ address: "" });
    }

    function removeAddress(index) {
      data.addresses.splice(index, 1);
    }

    const submit = async () => {
      await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Origin':'http://localhost:8081'
        },
        body: JSON.stringify(data),
      });

      await router.push("/login");
    };

    return {
      data,
      addAddress,
      removeAddress,
      submit,
    };
  },
};
</script>
<style>
.wraper {
  width: 40%;
  margin: 0 auto;
}
.btn-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.btn {
  width: 49%;
}
.btnfull {
  width: 100%;
}
</style>