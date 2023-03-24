<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <v-card-title class="text-center"> Report Alert</v-card-title>
    <v-form v-model="form" @submit.prevent="submit">
      <v-text-field
        v-model="data.alert_description"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Describre the allert"
      ></v-text-field>

      <v-text-field
        v-model="data.alert_location_description"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Location"
      ></v-text-field>

      <p>here: {{ gelocation.latitude }}</p>

      <v-file-input
        v-model="data.photo"
        accept="image/*"
        label="Take a photo"
        class="mb-2"
        :rules="[required]"
        prepend-icon="mdi-camera"
        capture="camera"
      ></v-file-input>

      <v-btn
        :disabled="!form"
        block
        color="error"
        size="large"
        type="submit"
        variant="elevated"
      >
        Send Alert
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { reactive, ref, onMounted } from "vue";

export default {
  name: "AlertReport",
  setup() {
    const data = reactive({
      alert_description: "",
      alert_location_description: "",
      photo: null,
    });
    const required = [(v) => !!v || "This field is required"];

    const gelocation = reactive({
      latitude: null,
      longitude: null,
    });
    const error = ref(null);

    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            gelocation.latitude = position.coords.latitude;
            gelocation.longitude = position.coords.longitude;
          },
          (err) => {
            error.value = err.message;
          }
        );
      } else {
        error.value = "Geolocation is not supported by this browser.";
      }
    };
    onMounted(getGeolocation);

    return {
      data,
      required,
      error,
      getGeolocation,
      gelocation,
    };
  },
};
</script>