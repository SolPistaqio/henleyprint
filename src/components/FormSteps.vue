<template>
  <div>
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
            <v-card class="mb-12">
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
                <v-btn
                  color="secondary"
                  icon
                  v-if="n.id < stages.length"
                  @click="nextStep(n.id)"
                >
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-title>{{ n.title }}</v-card-title>
            </v-card>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="nextStep(n.id)"
                v-if="n.id < stages.length"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-stepper-content>
        </template>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
      requiredRules: [() => true || "This field is required"],
      stages: [
        { id: 1, title: "Contact" },
        { id: 2, title: "Business" },
        { id: 3, title: "Program" },
        { id: 4, title: "Details" },
        { id: 5, title: "FAMILY " },
        { id: 6, title: "BANKING " },
        { id: 7, title: "BENEFICIARY" },
        { id: 8, title: "CONSENT" },
        { id: 9, title: "PRINT" },
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
      this.e1 = n + 1;
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
