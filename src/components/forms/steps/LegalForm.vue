<template>
  <div>
    <v-radio-group
      v-model="form.pep"
      label="Are you a Politically Exposed Person (“PEP”)?"
      hint="A PEP is a current or former (during the past
          ten years) senior official in the executive, legislative,
          administrative, military, or judicial branch of the state (elected or
          not), a senior official of a major political party, a senior executive
          of a government owned commercial enterprise, and/or being a
          corporation, business or other entity formed by or for the benefit of
          any such individual; an immediate family member of such individual,
          meaning spouse, parents, siblings, children, and spouse’s parents or
          siblings, or any individual publicly known (or actually known by the
          relevant financial institution) to be a close personal or professional
          associate."
      persistent-hint
      :rules="requiredRulesRadio"
      required
      row
      @change="input"
    >
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Yes" :value="true"></v-radio>
    </v-radio-group>

    <v-radio-group
      v-model="form.association"
      label="Do you have any association with a previous applicant or an individual with an ongoing application for the program of interest (i.e. family members, associates, business partners, etc.)?"
      :rules="requiredRulesRadio"
      required
      row
      @change="input"
    >
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Yes" :value="true"></v-radio>
    </v-radio-group>

    <v-textarea
      v-if="form.association"
      v-model="form.associationDesc"
      label="Please enter name of individual(s) and describe relationship"
      :rules="requiredRules"
      required
      @input="input"
    ></v-textarea>

    <v-radio-group
      v-model="form.rejected"
      label="Have you or has one of your dependents ever been rejected by a government authority for a visa, residence or citizenship application?"
      :rules="requiredRulesRadio"
      required
      row
      @change="input"
    >
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Yes" :value="true"></v-radio>
    </v-radio-group>

    <v-textarea
      v-if="form.rejected"
      v-model="form.rejectedDesc"
      label="Please enter name of country and type of application"
      :rules="requiredRules"
      required
      @input="input"
    ></v-textarea>

    <v-radio-group
      v-model="form.rejectedByHenley"
      label="Have you or has one of your dependents ever been rejected
by a Henley & Partners office to become a client?"
      :rules="requiredRulesRadio"
      required
      row
      @change="input"
    >
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Yes" :value="true"></v-radio>
    </v-radio-group>

    <v-textarea
      v-if="form.rejectedByHenley"
      v-model="form.rejectedByHenleyDesc"
      label="Please enter the name of the Henley & Partners office"
      :rules="requiredRules"
      required
      @input="input"
    ></v-textarea>

    <v-radio-group
      v-model="form.clientOfHenley"
      label="Have you or has one of your dependents been a client of
Henley & Partners before?"
      :rules="requiredRulesRadio"
      required
      @change="input"
      row
    >
      <v-radio label="No" :value="false"></v-radio>
      <v-radio label="Yes" :value="true"></v-radio>
    </v-radio-group>

    <v-textarea
      v-if="form.clientOfHenley"
      v-model="form.clientOfHenleyDesc"
      label="Please enter the name of the Henley &
Partners office and program of interest:"
      :rules="requiredRules"
      required
      @input="input"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: "LegalForm",

  props: {
    modelValue: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        pep: "",
        association: "",
        associationDesc: "",
        rejected: "",
        rejectedDesc: "",
        rejectedByHenley: "",
        rejectedByHenleyDesc: "",
        clientOfHenley: "",
        clientOfHenleyDesc: "",
      },
      requiredRules: [(v) => (!!v && !!v.trim()) || "This field is required"],
      requiredRulesRadio: [
        (v) => typeof v === "boolean" || "This field is required",
      ],
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
