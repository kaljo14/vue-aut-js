<template>
  {{ message }}
     <v-autocomplete
                    id="drawing-header-from"
                    :items ="addresses.value"
                    
                    label="Select Аddress"
                    dense
                    attach
                    outlined
                    
                  >
                  </v-autocomplete>
                  <v-icon icon="mdi-home" />

</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from "vuex";

export default {
  name: "HomeView",
  setup() {
    const message = ref('You are not logged in!');
    const store = useStore();
    let addresses = ref([]);
    let data = reactive({addresses:{address:""}});

    onMounted(async () => {
      try {
        const token = localStorage.getItem('access_token');
        console.log(token)
        const response = await fetch('http://localhost:8080/http://127.0.0.1:5000/api/users/total', {
          headers: { 'Content-Type': 'application/json' ,
           'Authorization': `Bearer ${token}`}
        });
        
         data = await response.json();
     if (data.msg === "Not enough segments") {
          throw new Error('Error 404: Not enough segments');
        }
        console.log(data);
        message.value = `Hi ${data.name}`;

        for (const address of data.addresses){
          
          addresses = address['address']
        }

        console.log(addresses)

        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });

    return {
      message,
      data,
      addresses
  
      
    }
  }
}
</script>
