<template>
  <div ref="form">
    <p class="text-subtitle-1">{{ label }}:</p>
    <v-text-field
      v-model="form.street"
      label="Street"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.city"
      label="City"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>
    <v-text-field
      v-model="form.country"
      label="Country"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.zip"
      label="ZIP code"
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "AddressInput",
  props: {
    label: {
      type: String,
      default: "Address",
    },
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      form: { street: null, city: null, country: null, zip: null },
      requiredRules: [(v) => (!!v && !!v.trim()) || "This field is required"],
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
