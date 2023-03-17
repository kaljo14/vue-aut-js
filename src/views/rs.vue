<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <input v-model="data.client_number" type="number" class="form-control" placeholder="Абонаментен Номер" required>

        <input v-model="data.egn_hash" type="password" class="form-control" placeholder="ЕГН" required>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router";

export default {
    name: "LoginView",
    setup() {
        const data = reactive({
            client_number: '',
            egn_hash: ''
        });
        const router = useRouter();
      
        const submit = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            const token = result.access_token;

            // Store the token in local storage
            localStorage.setItem('access_token', token);

            await router.push('/user');
        }
        return {
            data,
            submit
        }
    }
}
</script>