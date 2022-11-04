<template>
  <div>
    <v-checkbox
      v-model="form.processing"
      :rules="requiredRules"
      required
      @change="input"
      label="I hereby give consent to Henley processing the Sensitive Data required by or provided to Henley."
    ></v-checkbox>
    <v-checkbox
      v-model="form.data"
      :rules="requiredRules"
      required
      @change="input"
      label="I hereby confirm that I am fully authorized by all persons named herein to give such consent on their behalf to Henley processing their Sensitive Data. I agree to provide Henley with a written confirmation of such person’s consent upon Henley’s request."
    ></v-checkbox>
  </div>
</template>

<script>
export default {
  name: "ConsentForm",

  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      valid: false,
      form: {
        processing: "",
        data: "",
      },

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
