<!-- <template>
    <div class="number-code">
        <div>
            <input v-for="(value, index) in code" :key="index" type="text" :maxlength="1" :value="value" ref="codeInput"
                @input="onInput(index, $event.target.value)" @keydown.delete="onDelete(index)" />
        </div>
    </div>
</template>

<script>
export default {
    name: "MeterReadingInput",
    props: {
        length: {
            type: Number,
            default: 6,
        },
    },
    data() {
        return {
            code: Array(this.length).fill(""), // initialize the array with empty strings
        };
    },
    methods: {
        onInput(index, value) {
            if (index < this.length - 1 && value !== "") {
                this.$refs.codeInput[index + 1].focus();
            }
            this.code[index] = value;
            this.$emit("input", this.code.join(""));
        },
        onDelete(index) {
            if (index > 0 && this.code[index] === "") {
                this.$refs.codeInput[index - 1].focus();
            }
            this.code[index] = "";
            this.$emit("input", this.code.join(""));
        },
    },
};
</script>

<style scoped>
.number-code {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.number-code>div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05),
        0 4px 8px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.05),
        0 16px 32px rgba(0, 0, 0, 0.05), 0 32px 64px rgba(0, 0, 0, 0.05);
}

.number-code input[type="text"] {
    font-size: 2rem;
    text-align: center;
    border: none;
    width: 40px;
    height: 40px;
    background-color: transparent;
    outline: none;
    -webkit-appearance: none;
}
</style> -->
