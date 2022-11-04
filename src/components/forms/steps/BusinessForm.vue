<template>
  <div ref="form">
    <v-text-field
      v-model="form.occupation"
      label="Occupation"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-autocomplete
      chips
      deletable-chips
      multiple
      v-model="form.activities"
      label="Business activities"
      :items="activities"
      :rules="requiredRules"
      required
      @change="input"
    ></v-autocomplete>

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
import { activities } from "@/activityData.js";
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
      valid: false,
      form: {
        occupation: "",
        activities: "",
        businessName: "",
        businessAddress: "",
      },
      activities: activities,
      requiredRules: [(v) => !!v || "This field is required"],
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
