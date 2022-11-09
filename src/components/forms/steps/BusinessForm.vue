<template>
  <div ref="form">
    <v-text-field
      v-model="form.occupation"
      label="Occupation"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.activities"
      label="Business activities"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.businessName"
      label="Business name"
      hint="Name of the company"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <address-input
      v-model="form.businessAddress"
      label="Business address"
      :rules="requiredRules"
      required
      @input="input"
    />
  </div>
</template>

<script>
import AddressInput from "../elements/AddressInput.vue";
import { requiredRules } from "@/formData.js";
export default {
  name: "BusinessForm",
  components: { AddressInput },
  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        occupation: "",
        activities: "",
        businessName: "",
        businessAddress: "",
      },

      requiredRules: requiredRules,
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
