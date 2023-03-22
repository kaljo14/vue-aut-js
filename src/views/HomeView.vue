<template class="login-form">
  {{ message }}
  <base-v-component goBackText="Обратно към водомери" goBackTo="/" />
  <v-card v-if="firstCard">
    <v-card-item>
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

      <!-- <v-text-field
          label="Водомер"
          autocomplete="off"
          readonly
          dense
          v-model="meterReading.meter_number "
          v-on="on"
        ></v-text-field> -->

      <!-- <v-text-field
                      label="Водомер"
                      height="30"
                      autocomplete="off"
                      v-on="on"
                      v-model="getMeters(selectedAddress).model_number"
                      readonly
                      dense
                    >

                          <v-text-field
                  label="СВО идентификатор"
                  v-model="waterMeterData.svoId"
                  autocomplete="off"
                  readonly
                  dense
                /> -->
    </v-card-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="successGradient"
        width="140px"
        style="float: right"
        @click="toggleNextCard"
      >
        <span> напред</span>
      </v-btn>
    </v-card-actions>
    <!-- 
  <div>
      <h1>Enter Meter Reading</h1>
      <meter-reading-input v-model="reading" />
      <button @click="submit">Submit</button>
    </div> -->
  </v-card >
 
  <v-card v-if="secondCard">
    <v-card-item>
      <v-autocomplete
        v-model="selectedAddress"
        :items="data.addresses"
        color="white"
        item-title="address"
        item-value="id"
        label="watermeter"
      ></v-autocomplete>
    </v-card-item>
  </v-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
// import MeterReadingInput from "@/components/MetersReadingInput.vue";

export default {
  name: "HomeView",
  components: {
    // MetersReadingInput,
  },
  setup() {
    const message = ref("You are not logged in!");
    const store = useStore();
    const addresses = ref([]);
    const data = ref([]);
    const selectedAddress = ref(null);
    const firstCard = ref(true);
    const secondCard = ref(false);

    const getMeters = (addressId) => {
      const address = data.value.addresses.find((a) => a.id === addressId);
      return address ? address.meter_readings : [];
    };

    const toggleNextCard = () => {
      firstCard.value != firstCard.value;
      secondCard.value != secondCard.value;
    };

    onMounted(async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://localhost:8080/http://127.0.0.1:5000/api/users/total",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let data_respons = await response.json();
        if (data_respons.msg === "Not enough segments") {
          throw new Error("Error 404: Not enough segments");
        }

        console.log(data_respons);
        message.value = `Hi ${data_respons.name}`;

        data.value = data_respons;
        // addresses.value.push(...data_respons.addresses);

        await store.dispatch("setAuth", true);
      } catch (e) {
        await store.dispatch("setAuth", false);
      }
    });

    return {
      message,
      data,
      addresses,
      selectedAddress,
      getMeters,
      toggleNextCard,
      secondCard,
      firstCard
    };
  },
};
</script>
<style scoped>
.body {
  background-color: #eeeeee;
}
.successGradient {
  background-color: #36a498; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, #36a498, #3bcaba);
}
</style>
