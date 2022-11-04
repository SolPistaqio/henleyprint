<template>
  <div>
    <p>
      Please note that funds must generally be remitted from your personal bank
      account. Funds will be wired to Henley from the following bank account:
    </p>
    <v-text-field
      v-model="form.bankName"
      :rules="requiredRules"
      label="Account in name of (should be in your personal name)"
      required
      @input="input"
    ></v-text-field>
    <v-text-field
      v-model="form.iban"
      :rules="requiredRules"
      label="Account Number or IBAN"
      required
      @input="input"
    ></v-text-field>
    <v-text-field
      v-model="form.swift"
      :rules="requiredRules"
      label="SWIFT code"
      required
      @input="input"
    ></v-text-field>
    <v-text-field
      v-model="form.bank"
      :rules="requiredRules"
      label="Bank name"
      required
      @input="input"
    ></v-text-field>

    <address-input
      v-model="form.bankAddress"
      label="Bank location"
      :rules="requiredRules"
      required
      @input="input"
    />
  </div>
</template>

<script>
import AddressInput from "../elements/AddressInput.vue";
export default {
  name: "BankForm",
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
        bankName: "",
        iban: "",
        swift: "",
        bank: "",
        bankAddress: "",
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
