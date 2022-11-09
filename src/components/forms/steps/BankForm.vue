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
      :rules="bankRules.first"
      label="Account Number or IBAN"
      @input="input"
      ref="bank"
    ></v-text-field>
    <v-text-field
      v-model="form.swift"
      :rules="bankRules.second"
      label="SWIFT code"
      @input="input"
      ref="bank"
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
import { requiredRules } from "@/formData.js";
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
      form: {
        bankName: "",
        iban: "",
        swift: "",
        bank: "",
        bankAddress: "",
      },
      requiredRules: requiredRules,
    };
  },

  computed: {
    validator() {
      return (
        !this.form.swift &&
        !this.form.swift.trim() &&
        !this.form.iban &&
        !this.form.iban.trim()
      );
    },
    bankRules() {
      const valid =
        !this.form.swift &&
        !this.form.swift.trim() &&
        !this.form.iban &&
        !this.form.iban.trim();

      return {
        first: [() => !valid || "Swift or Account number is required"],
        second: [() => !valid || "Swift or Account number is required"],
      };
    },
    bankInputs() {
      return this.form.swift && this.form.iban;
    },
  },
  methods: {
    input() {
      this.$emit("input", this.form);
    },
  },
  watch: {
    bankInputs: {
      async handler() {
        await this.$nextTick();
        this.$refs.bank.validate();
      },
    },
  },
};
</script>

<style></style>
