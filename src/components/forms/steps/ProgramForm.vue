<template>
  <div>
    <v-text-field
      v-model="form.purpose"
      label="Purpose of seeking alternative citizenship / residence"
      hint="Country of application"
      persistent-hint
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>

    <v-text-field
      v-model="form.program"
      label="Program of interest"
      hint="Country of application"
      persistent-hint
      :rules="requiredRules"
      required
      @input="input"
    ></v-text-field>
  </div>
</template>

<script>
import { requiredRules } from "@/formData";
export default {
  name: "ProgramForm",

  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        purpose: "",
        program: "",
      },
      requiredRules: requiredRules,
      purposes: ["Business", "Travel", "Education"],
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
