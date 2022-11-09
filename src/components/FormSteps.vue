<template>
  <v-card class="mx-auto" max-width="800" flat>
    <v-card-text>
      <v-stepper alt-labels v-model="e1">
        <v-stepper-header>
          <template v-for="n in stages">
            <v-stepper-step
              :key="n.id"
              :complete="e1 > n.id"
              :step="n.id"
              class="px-2"
            >
              {{ n.title }}
            </v-stepper-step>
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <template v-for="n in stages">
            <v-stepper-content :key="`${n.id}-content`" :step="n.id">
              <v-card class="mb-12" flat>
                <v-card-actions>
                  <v-btn
                    color="secondary"
                    icon
                    @click="back(n.id)"
                    v-if="n.id > 1"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  {{ n.title }}
                  <v-spacer></v-spacer>
                  <v-btn
                    color="secondary"
                    icon
                    v-if="n.id < stages.length"
                    @click="nextStep(n.id)"
                  >
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-card-text>
                  <v-form :ref="n.id" v-model="valid" lazy-validation>
                    <component
                      v-bind:is="n.component"
                      v-model="$data[n.model]"
                      @print="print"
                    ></component>
                  </v-form>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="primary"
                    @click="nextStep(n.id)"
                    v-if="n.id < stages.length"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </template>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import BusinessForm from "./forms/steps/BusinessForm.vue";
import ContactForm from "./forms/steps/ContactForm.vue";
import ProgramForm from "./forms/steps/ProgramForm.vue";
import LegalForm from "./forms/steps/LegalForm.vue";
import FamilyForm from "./forms/steps/FamilyForm.vue";
import BankForm from "./forms/steps/BankForm.vue";
import BeneficiaryForm from "./forms/steps/BeneficiaryForm.vue";
import ConsentForm from "./forms/steps/ConsentForm.vue";
import PrintForm from "./forms/steps/PrintForm.vue";

export default {
  components: {
    ContactForm,
    BusinessForm,
    ProgramForm,
    LegalForm,
    FamilyForm,
    BankForm,
    BeneficiaryForm,
    ConsentForm,
    PrintForm,
  },
  data() {
    return {
      valid: false,
      e1: 1,

      stages: [
        { id: 1, title: "Contact", component: "contactForm", model: "contact" },
        {
          id: 2,
          title: "Business",
          component: "BusinessForm",
          model: "business",
        },
        { id: 3, title: "Program", component: "ProgramForm", model: "program" },
        { id: 4, title: "Legal", component: "LegalForm", model: "legal" },
        { id: 5, title: "Family", component: "FamilyForm", model: "family" },
        { id: 6, title: "Banking", component: "BankForm", model: "bank" },
        {
          id: 7,
          title: "Beneficiary",
          component: "BeneficiaryForm",
          model: "beneficiary",
        },
        { id: 8, title: "Consent", component: "ConsentForm", model: "consent" },
        { id: 9, title: "Print", component: "PrintForm", model: null },
      ],
      contact: {},
      business: {},
      program: {},
      legal: {},
      family: {},
      bank: {},
      beneficiary: {},
      consent: {},
    };
  },

  computed: {
    form() {
      const data = {
        ...this.contact,
        ...this.business,
        ...this.program,
        ...this.legal,
        ...this.family,
        ...this.bank,
        ...this.beneficiary,
        ...this.consent,
      };
      return data;
    },
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },

  methods: {
    nextStep(n) {
      const valid = this.$refs[n][0].validate();
      console.log(this.$refs[n][0]);
      if (valid) {
        this.e1 = n + 1;
        this.valid = false;
      }
    },
    back(n) {
      if (n === 1) {
        this.e1 = 1;
      } else {
        this.e1 = n - 1;
      }
    },
    print() {
      this.$emit("print", this.form);
    },
  },
};
</script>

<style scoped>
::v-deep .v-stepper--alt-labels .v-stepper__step {
  flex-basis: 25px;
}
</style>
