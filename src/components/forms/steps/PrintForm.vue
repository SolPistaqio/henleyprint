<template>
  <div>
    <div class="d-flex justify-center">
      <v-btn color="primary" @click="print">Download Form A PDF</v-btn>
    </div>
    <p class="mt-5">
      Remember this form needs to be printed and signed in wet ink before
      sending with the remaining of required documents.
    </p>
  </div>
</template>

<script>
export default {
  name: "PrintForm",
  methods: {
    print() {
      this.$emit("print");
    },
  },
};
</script>
