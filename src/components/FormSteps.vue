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
              :rules="requiredRules"
              editable
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
import contactForm from "./forms/steps/ContactForm.vue";
export default {
  components: { contactForm, BusinessForm },
  data() {
    return {
      valid: false,
      e1: 1,
      requiredRules: [() => true || "This field is required"],
      stages: [
        { id: 1, title: "Contact", component: "contactForm", model: "contact" },
        {
          id: 2,
          title: "Business",
          component: "BusinessForm",
          model: "business",
        },
        { id: 3, title: "Program" },
        { id: 4, title: "Details" },
        { id: 5, title: "Family" },
        { id: 6, title: "Banking" },
        { id: 7, title: "Beneficiary" },
        { id: 8, title: "Consent" },
        { id: 9, title: "Print" },
      ],
      contact: {},
      business: {},

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
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
  },
};
</script>

<style scoped>
::v-deep .v-stepper--alt-labels .v-stepper__step {
  flex-basis: 25px;
}
</style>
