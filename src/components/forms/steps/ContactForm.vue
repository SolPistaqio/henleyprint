<template>
  <div>
    <v-text-field
      v-model="form.firstname"
      :rules="requiredRules"
      label="First name(s)"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.lastname"
      :rules="requiredRules"
      label="Last name"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.othername"
      label="Other name(s) you are known by"
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.nationality"
      label="Nationality"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.placeOfBirth"
      label="Place of birth"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <calendar-input v-model="form.date" :valid="form.date ? true : false" />

    <address-input
      v-model="form.address"
      label="Permanent residential address"
      :rules="requiredRules"
      required
      @input="input"
    />

    <v-text-field
      v-model="form.email"
      :rules="emailRules"
      label="E-mail"
      required
      @input="input"
    ></v-text-field>
  </div>
</template>

<script>
import CalendarInput from "../elements/CalendarInput.vue";
import AddressInput from "../elements/AddressInput.vue";
export default {
  name: "ContactForm",
  components: { CalendarInput, AddressInput },
  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        othername: "",
        nationality: "",
        placeOfBirth: "",
        date: null,
        address: "",
        email: "",
      },
      requiredRules: [(v) => (!!v && !!v.trim()) || "This field is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
    };
  },

  methods: {
    input() {
      this.$emit("input", this.form);
    },
  },
};
</script>

<style></style>
