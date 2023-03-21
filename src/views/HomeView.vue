<template>
  {{ message }}

          <v-autocomplete
          v-model="selectedAddress"
          :items="data.addresses"
          color="white"
          item-title="address"
          item-value="id"
          label="Select address"
          ></v-autocomplete>
        
          
           <v-autocomplete 
           v-if="selectedAddress"
            :items="getMeters(selectedAddress)"
            color="white"
            item-title="meter_number"
            item-value="id"
            label="Select a meter"
          ></v-autocomplete>


<!-- 
  <div>
      <h1>Enter Meter Reading</h1>
      <meter-reading-input v-model="reading" />
      <button @click="submit">Submit</button>
    </div> -->



  
</template>

<script>
import { onMounted, ref} from 'vue';
import { useStore } from "vuex";
// import MeterReadingInput from "@/components/MetersReadingInput.vue";


export default {
  name: "HomeView",
   components: {
    // MetersReadingInput,
  },
  setup() {
    const message = ref('You are not logged in!');
    const store = useStore();
    const addresses = ref([]);
    const data = ref([]);
    const selectedAddress = ref(null)
    
    const getMeters = (addressId) => {
      const address = data.value.addresses.find(a => a.id === addressId);
      return address ? address.meter_readings : [];
    }

    onMounted(async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:8080/http://127.0.0.1:5000/api/users/total', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        let data_respons = await response.json();
        if (data_respons.msg === "Not enough segments") {
          throw new Error('Error 404: Not enough segments');
        }

        console.log(data_respons);
        message.value = `Hi ${data_respons.name}`;
        
         data.value = data_respons;
        // addresses.value.push(...data_respons.addresses);
        
        


        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }

    });

    return {
      message,
      data,
      addresses,
      selectedAddress,
      getMeters
    }
  }
}
</script>
<style scoped>

</style>
