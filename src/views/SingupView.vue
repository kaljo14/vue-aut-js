<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please register</h1>

    <input v-model="data.name" class="form-control" placeholder="Name" required>

    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>

    <input v-model="data.egn_hash"  class="form-control" placeholder="Password" required>
    <input v-model="data.client_number"  class="form-control" placeholder="client number" required>
    <button v-show="data.addresses.length < 3" type="button" @click="addAddress()" class="btn btn-danger">Add Address</button>
    <div v-for="(address, index) in data.addresses" :key="index">
        <input v-model="address.address" class="form-control" placeholder="Address" required>
        <button type="button" @click="removeAddress(index)" class="btn btn-danger">Remove Address</button>
        
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router";

export default {
  name: "SingupView",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      egn_hash: '',
      addresses:[{ address: '' }],
      client_number:''
    });
    const router = useRouter();
    function addAddress() {
      data.addresses.push({ address: '' });
    }

    function removeAddress(index) {
      data.addresses.splice(index, 1);
    }

    const submit = async () => {
      await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
      // 'Origin':'http://localhost:8081' 
     },
        body: JSON.stringify(data),
      });

      await router.push('/login');
    }

    return {
      data,
      addAddress,
      removeAddress,
      submit
    }
  }
}
</script>