<template>
  <div>
    <v-text-field
      v-model="beneficiary.firstname"
      :rules="requiredRules"
      label="First name(s)"
      required
    ></v-text-field>

    <v-text-field
      v-model="beneficiary.othername"
      :rules="requiredRules"
      label="Other name(s)"
      required
    ></v-text-field>

    <v-text-field
      v-model="beneficiary.lastname"
      :rules="requiredRules"
      label="Last name"
      required
    ></v-text-field>
    <v-text-field
      v-model="beneficiary.nationality"
      label="Nationality"
      :rules="requiredRules"
      required
    ></v-text-field>

    <v-text-field
      v-model="beneficiary.placeOfBirth"
      label="Place of birth"
      :rules="requiredRules"
      required
    ></v-text-field>
    <!-- FIX! Make each beneficiary form a separate component v-mod to benefic-->
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
          v-model="beneficiary.date"
          label="Date of birth"
          readonly
          v-bind="attrs"
          v-on="on"
          :rules="requiredRules"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="beneficiary.date"
        :active-picker.sync="activePicker"
        max="2000-01-01"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>

    <v-text-field
      v-model="beneficiary.businessName"
      label="Business name"
      hint="Name of the company"
      :rules="requiredRules"
      required
    ></v-text-field>
    <!-- Add County ZIP Stree etc -->
    <v-text-field
      v-model="beneficiary.businessAddress"
      label="Business address"
      hint="Company's address"
      :rules="requiredRules"
      required
    ></v-text-field>
    <v-text-field
      v-model="beneficiary.address"
      label="Permanent residential address:"
      :rules="requiredRules"
      required
    ></v-text-field>

    <v-select
      v-model="beneficiary.relationship"
      label="Relationship"
      :items="relationships"
      :rules="requiredRules"
      required
    >
    </v-select>
  </div>
</template>

<script>
export default {
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style></style>
