<template>
  <div>
    <p>Beneficial owner declaration</p>
    <p>I the undersigned herewith declare:</p>
    <v-radio-group
      v-model="form.beneficiary"
      :rules="requiredRulesRadio"
      required
      row
      @change="input"
    >
      <v-radio
        label="I am the ultimate beneficial owner of all funds remitted to Henley"
        :value="false"
      ></v-radio>
      <v-radio label="I am not the beneficial owner" :value="true"></v-radio>
    </v-radio-group>
    <div v-if="form.beneficiary">
      <p>
        The ultimate beneficial owner(s) of all funds remitted to Henley is
        (are):
      </p>
      <div v-for="(beneficiary, index) in form.beneficiaries" :key="index">
        <v-btn
          style="float: right"
          icon
          color="error"
          v-if="index > 0"
          @click="removeBeneficiary(index)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
        <v-text-field
          v-model="beneficiary.firstname"
          :rules="requiredRules"
          label="First name(s)"
          required
          @input="input"
        ></v-text-field>

        <v-text-field
          v-model="beneficiary.othername"
          label="Other name(s)"
          @input="input"
        ></v-text-field>

        <v-text-field
          v-model="beneficiary.lastname"
          :rules="requiredRules"
          label="Last name"
          required
          @input="input"
        ></v-text-field>
        <v-text-field
          v-model="beneficiary.nationality"
          label="Nationality"
          :rules="requiredRules"
          required
          @input="input"
        ></v-text-field>

        <v-text-field
          v-model="beneficiary.placeOfBirth"
          label="Place of birth"
          :rules="requiredRules"
          required
          @input="input"
        ></v-text-field>

        <calendar-input
          v-model="beneficiary.date"
          :valid="beneficiary.date ? true : false"
          @input="input"
        />

        <address-input
          v-model="beneficiary.address"
          label="Permanent residential address"
          :rules="requiredRules"
          required
          @input="input"
        />

        <v-text-field
          v-model="beneficiary.businessName"
          label="Business name"
          :rules="requiredRules"
          required
          @input="input"
        ></v-text-field>
        <address-input
          v-model="beneficiary.businessAddress"
          label="Business address"
          :rules="requiredRules"
          required
          @input="input"
        />

        <v-select
          v-model="beneficiary.relationship"
          label="Relationship"
          :items="relationships"
          :rules="requiredRules"
          required
          @change="input"
        >
        </v-select>
      </div>
      <v-btn @click="addBeneficiaries" color="secondary" class="my-4">
        Add beneficial owner
      </v-btn>
    </div>
  </div>
</template>

<script>
import AddressInput from "../elements/AddressInput.vue";
export default {
  name: "BeneficiaryForm",
  components: { AddressInput },
  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        beneficiary: "",
        beneficiaries: [
          {
            firstname: "",
            lastname: "",
            othername: "",
            nationality: "",
            placeOfBirth: "",
            date: null,
            address: "",
            businessName: "",
            businessAddress: "",
            relationship: "",
            menu: false,
          },
        ],
      },
      requiredRules: [(v) => (!!v && !!v.trim()) || "This field is required"],
      requiredRulesRadio: [
        (v) => typeof v === "boolean" || "This field is required",
      ],
      relationships: ["Mother", "Father", "Child"],
    };
  },

  methods: {
    input() {
      this.$emit("input", this.form);
    },
    addBeneficiaries() {
      this.form.beneficiaries.push({
        firstname: "",
        lastname: "",
        othername: "",
        nationality: "",
        placeOfBirth: "",
        date: null,
        address: "",
        businessName: "",
        businessAddress: "",
        relationship: "",
      });
    },
    removeBeneficiary(index) {
      this.form.beneficiaries.splice(index, 1);
    },
  },
};
</script>

<style></style>
