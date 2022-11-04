<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="value"
        label="Date of birth"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="requiredRules"
        required
        isIntersecting:true
        isBooted:true
        errorBucket: errors
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="value"
      :active-picker.sync="activePicker"
      max="2000-01-01"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  prop: ["value"],
  data() {
    return {
      requiredRules: [(v) => !!v || "This field is required"],
      value: this.value,
      menu: false,
      activePicker: null,
      errors: ["This field is required"]
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(value) {
      this.$refs.menu.save(value);
      this.$emit("input", this.value);
    },
  },
};
</script>

<style></style>
