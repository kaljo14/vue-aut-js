<template>
  <v-card class="mx-auto px-6 py-8" max-width="344">
    <v-card-title class="text-center"> Report Alert</v-card-title>
    <v-form v-model="form" @submit.prevent="reportAlert(data)">
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
        clearable
        label="Location"
      ></v-text-field>

      <!-- <p>here: {{ data.latitude }} {{ data.photo }}</p> -->
      <!-- <CameraComponent></CameraComponent> -->
      <v-file-input
        readonly
        v-model="data.photo"
        accept="image/*"
        label="Take a photo"
        class="mb-2"
        prepend-icon="mdi-camera"
        capture="camera"
      ></v-file-input>
      <v-card-actions>
        <v-btn
          block
          color="error"
          size="large"
          type="submit"
          variant="elevated"
        >
          Send Alert
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
  <v-alert v-if="alertSent" type="success" class="mb-4">
    Alert sent successfully!
  </v-alert>
  <v-alert v-if="errorMsg" type="error" class="mb-4">
    Please enter a description as the field is required !
  </v-alert>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
// import CameraComponent from "@/components/CameraComponent.vue";
export default {
  name: "AlertReport",
  // components: { CameraComponent },
  setup() {
    var errorMsg = ref(false);
    var alertSent = ref(false);
    const data = reactive({
      alert_description: "",
      alert_location_description: "",
      photo: null,
      latitude: null,
      longitude: null,
    });
    const required = [(v) => !!v || "This field is required"];

    const error = ref(null);
    const resetData = () => {
      data.alert_description = "";
      data.alert_location_description = "";
      data.photo = null;
      data.latitude = null;
      data.longitude = null;
    };

    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            data.latitude = position.coords.latitude;
            data.longitude = position.coords.longitude;
          },
          (err) => {
            error.value = err.message;
          }
        );
      } else {
        error.value = "Geolocation is not supported by this browser.";
      }
    };

    const reportAlert = (data) => {
      const formData = new FormData();
      formData.append("alert_description", data.alert_description);
      formData.append(
        "alert_location_description",
        data.alert_location_description
      );
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      console.log(data.latitude);
      if (data.photo) {
        const file = new File([data.photo[0]], data.photo[0].name);
        formData.append("photo", file);
      }

      fetch("http://localhost:8080/http://127.0.0.1:5000/api/report-alert", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            errorMsg.value = true;
            setTimeout(() => {
              errorMsg.value = false;
            }, 1000);
            throw new Error("Failed to create alert.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Alert created:", data);
          resetData();
          alertSent.value = true;
          setTimeout(() => {
            alertSent.value = false;
          }, 10000);

          // do something with the response data, like showing a success message
        })
        .catch((error) => {
          console.error("Error creating alert:", error);
          // show an error message to the user
        });
    };
    onMounted(getGeolocation);

    return {
      data,
      required,
      error,
      getGeolocation,
      alertSent,
      reportAlert,
      errorMsg,
    };
  },
};
</script>
<style  scoped>
/* #app
  > main
  > div
  > form
  > div.v-input.v-input--horizontal.v-input--density-default.v-file-input.mb-2
  > div.v-input__control {
  display: none;
} */
</style>