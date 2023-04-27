<template>
  <div class="wraper">
    <v-card v-if="firstCard">
      <v-card-title class="text-center">{{ message }}</v-card-title>
      <v-card-item>
        <v-autocomplete
          v-model="selectedAddress"
          :items="data.addresses"
          item-title="address"
          item-value="id"
          label="Select address"
        ></v-autocomplete>
      </v-card-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="successGradient"
          width="140px"
          style="float: right"
          @click="toggleInputCard"
        >
          <span> напред</span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="secondCard">
      <v-card-title class="text-center">Input Meter Readings</v-card-title>
      <v-card-item>
        <!-- <div v-if="selectedAddress">
          <div
            v-for="meter in getMeters(selectedAddress)"
            :key="meter.meter_number"
          >
            <p>Number {{ meter }}</p>
            <v-text-field
              v-model="meter.readings"
              :rules="[required, validateMinLength, validateNumeric]"
              :label="`Meter number:` + meter.meter_number"
              required
              color="#3446eb"
              placeholder="0000000000"
              variant="underlined"
            ></v-text-field>
          </div>
        </div>

        <v-alert
          v-else
          density="compact"
          type="warning"
          title="No address selected !"
          text="Please Select a address"
        >
        </v-alert> -->
      </v-card-item>

      <v-card-text class="text-center" v-if="selectedAddress">
        <div
          v-for="meter in getMeters(selectedAddress)"
          :key="meter.meter_number"
        >
          <v-row style="height: 80px">
            <v-col lg="6" md="6" cols="6"
              ><v-text-field
                style="width: 200%; margin-right: 10px"
                v-model="meter.readings"
                :rules="[required]"
                :label="`Meter number:` + meter.meter_number"
                required
                color="#339e93"
                placeholder="0000000000"
                variant="underlined"
              ></v-text-field
            ></v-col>

            <v-col lg="6" md="6" cols="6">
              <!-- <div class="row-revers"> -->
              <v-file-input
                style="
                  display: flex;
                  margin-left: 1px;
                  flex-direction: row-reverse;
                  align-items: stretch;
                  font-size: 20px;
                  flex-wrap: nowrap;
                "
                class="my-file-input"
                variant="underlined"
                v-model="photos[meter.meter_number]"
                accept="image/*"
                :rules="[required]"
                prepend-icon="mdi-camera"
                capture="camera"
                @change="
                  uploadPhotos(
                    getMeters(selectedAddress),
                    meter.meter_number,
                    $event
                  )
                "
              ></v-file-input>
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          class="successGradient"
          width="140px"
          style="float: right"
          @click="togglePrevCard"
        >
          <span>Назад</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="successGradient"
          width="140px"
          style="float: right"
          @click="toggleConfirmCard"
        >
          <span> напред</span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="confirmCard" class="text-center">
      <v-card-title> Please confirm Information</v-card-title>

      <v-card-item>
        <div
          v-for="meter in getMeters(selectedAddress)"
          :key="meter.meter_number"
        >
          <p>Meter number {{ meter.meter_number }} : {{ meter.readings }}</p>
          <!-- <v-text-field
          :label="meter.readings"
          disabled
          placeholder="meter.readdings.reading_value"
        ></v-text-field> -->
        </div>
      </v-card-item>
      <v-card-actions>
        <v-btn
          class="successGradient"
          width="140px"
          style="float: right"
          @click="toggleInputCard"
        >
          <span>Назад</span>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="successGradient"
          width="140px"
          style="float: right"
          @click="sendMeterReadings(getMeters(selectedAddress))"
        >
          <span>Запази</span>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-alert v-if="showSuccessMsg" type="success" class="text-center">
      <h4>Вие успешно изпратихте показанията си !</h4>
      <v-btn @click="refreshPage">OK</v-btn>
    </v-alert>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import MeterReadingInput from "@/components/MetersReadingInput.vue";

export default {
  name: "HomeView",
  components: {
    // MetersReadingInput,
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },
  },
  setup() {
    const router = useRouter();
    const message = ref("You are not logged in!");
    const store = useStore();
    const addresses = ref([]);
    const data = ref([]);
    const selectedAddress = ref(null);
    const firstCard = ref(true);
    const secondCard = ref(false);
    const confirmCard = ref(false);
    const showSuccessMsg = ref(false);
    const photos = ref({});
    const meterReadingPhoto = ref([]);

    const getMeters = (addressId) => {
      const address = data.value.addresses.find((a) => a.id === addressId);
      return address ? address.meter_readings : [];
    };
    // const getReadings = (meterId, addressID) => {
    //   const address = data.value.addresses.find((a) => a.id === addressId);
    //   const readings = address.find((a) => a.id === meterId);
    //   return readings ? readings.readings : [];
    // };

    const toggleInputCard = () => {
      firstCard.value = false;
      secondCard.value = true;
      confirmCard.value = false;
    };
    const togglePrevCard = () => {
      firstCard.value = true;
      secondCard.value = false;
      confirmCard.value = false;
    };
    const toggleConfirmCard = () => {
      firstCard.value = false;
      secondCard.value = false;
      confirmCard.value = true;
    };
    const required = (value) => {
      return !!value || "This field is required";
    };
    const validateMinLength = (value) => {
      if (value && value.length < 8) {
        return "Minimum length is 8 characters";
      }
    };
    const validateNumeric = (value) => {
      if (value && !/^\d+$/.test(value)) {
        return "Input must be numeric";
      }
    };
    const sendMeterReadings = (object) => {
      showSuccessMsg.value = true;
      confirmCard.value = false;

      console.log(object);
      fetch(
        "http://localhost:8080/http://127.0.0.1:5000/api/user/addReadings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch request:", error);
        });
    };
    watch(
      () => message.value, // Watch for changes in the value of message
      (newValue) => {
        if (newValue === "undefined") {
          // Redirect to a different route
          router.push("/some-route");
        }
      }
    );
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
        message.value = `Hello ${data_respons.name} !`;

        data.value = data_respons;
        // addresses.value.push(...data_respons.addresses);

        await store.dispatch("setAuth", true);
      } catch (e) {
        await store.dispatch("setAuth", false);
      }
      message,
        (newValue, oldValue) => {
          console.log(`New value: ${newValue}, old value: ${oldValue}`);
        };
    });

    const uploadPhotos = async (meters, meterID, event) => {
      const photo = event.target.files[0];
      if (!photo) return;
      const formData = new FormData();

      formData.append("photo", photo);

      try {
        const response = await fetch(
          "http://localhost:8080/http://127.0.0.1:5000/detect_objects",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
        // Find the meter in the current selected address using the meterID
        meters.forEach((meter) => {
          if (meter.meter_number === meterID) {
            meter.readings = data;
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      message,
      data,
      addresses,
      selectedAddress,
      getMeters,
      toggleInputCard,
      secondCard,
      firstCard,
      togglePrevCard,
      required,
      validateMinLength,
      validateNumeric,
      confirmCard,
      toggleConfirmCard,
      sendMeterReadings,
      showSuccessMsg,
      uploadPhotos,
      photos,
      meterReadingPhoto,
    };
  },
};
</script>
<style scoped>
.wraper {
  width: 60%;
  margin: 0 auto;
}
.successGradient {
  background-color: #36a498; /* For browsers that do not support gradients */
  background-image: linear-gradient(to right, #36a498, #3bcaba);
}
/* .row-revers {
  display: flex;
  flex-direction: row-reverse;
} */
</style>

