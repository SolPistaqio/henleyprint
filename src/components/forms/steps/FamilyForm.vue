<template>
  <div>
    <p>
      In order for us to proceed with the due diligence process, we also require
      personal information about any family member who may be included in your
      Personal Application.
    </p>

    <v-btn @click="addDependent" color="secondary" class="mb-4">
      Add family member
    </v-btn>

    <div v-for="(dependent, index) in form.dependents" :key="index">
      <v-btn
        style="float: right"
        icon
        color="error"
        @click="removeDependent(index)"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
      <v-text-field
        v-model="dependent.firstname"
        :rules="requiredRules"
        label="First name(s)"
        required
        @input="input"
      ></v-text-field>

      <v-text-field
        v-model="dependent.lastname"
        :rules="requiredRules"
        label="Last name"
        required
        @input="input"
      ></v-text-field>

      <v-select
        v-model="dependent.relationship"
        label="Relationship"
        :items="relationships"
        :rules="requiredRules"
        required
        @change="input"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "FamilyForm",

  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      valid: false,
      form: {
        dependents: [],
      },
      requiredRules: [(v) => !!v || "This field is required"],
      relationships: ["Mother", "Father", "Child"],
    };
  },

  methods: {
    input() {
      this.$emit("input", this.form);
    },
    addDependent() {
      this.form.dependents.push({
        firstname: "",
        lastname: "",
        relationship: "",
      });
    },
    removeDependent(index) {
      this.form.dependents.splice(index, 1);
    },
  },
};
</script>

<style></style>
