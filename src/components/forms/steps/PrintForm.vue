<template>
  <div class="d-flex justify-center">
    <v-btn color="primary" @click="print">Download Form A PDF</v-btn>
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
