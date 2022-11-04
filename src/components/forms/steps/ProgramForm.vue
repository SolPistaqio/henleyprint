<template>
  <div>
    <v-select
      v-model="form.purpose"
      label="Purpose of seeking alternative citizenship / residence"
      :items="purposes"
      :rules="requiredRules"
      required
      @change="input"
    >
    </v-select>

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
      requiredRules: [(v) => (!!v && !!v.trim()) || "This field is required"],
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
