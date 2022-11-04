<template>
  <!-- add steps!!  -->
  <v-app>
    <v-main>
      <div id="app" data-app>
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="Form A printout"
          :pdf-quality="2"
          :manual-pagination="true"
          pdf-format="a4"
          pdf-orientation="portrait"
          @progress="onProgress($event)"
          @hasStartedGeneration="hasStartedGeneration()"
          @hasDownloaded="hasGenerated($event)"
          ref="html2Pdf"
        >
          <pdf-content
            @domRendered="domRendered()"
            slot="pdf-content"
            :form="form"
          />
        </vue-html2pdf>

        <form-steps />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PdfContent from "@/components/PdfContent";
import VueHtml2pdf from "vue-html2pdf";

import FormSteps from "./components/FormSteps.vue";
import { activities } from "./activityData.js";

export default {
  name: "app",

  data() {
    return {
      valid: false,
      form: {
        firstname: "",
        lastname: "",
        othername: "",
        nationality: "",
        placeOfBirth: "",
        date: null,
        address: "",
        email: "",
        occupation: "",
        activities: "",
        businessName: "",
        businessAddress: "",
        purpose: "",
        program: "",
        pep: "",
        association: "",
        associationDesc: "",
        rejected: "",
        rejectedDesc: "",
        rejectedByHenley: "",
        rejectedByHenleyDesc: "",
        clientOfHenley: "",
        clientOfHenleyDesc: "",
        dependents: [],
        bankName: "",
        iban: "",
        swift: "",
        bank: "",
        bankAddress: "",
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
        processing: "",
        data: "",
      },
      activities: activities,
      purposes: ["Business", "Travel", "Education"],
      relationships: ["Mother", "Father", "Child"],
      activePicker: null,
      menu: false,
      menuBeneficiary: false,
      requiredRules: [(v) => !!v || "This field is required"],
      requiredRulesRadio: [
        (v) => typeof v === "boolean" || "This field is required",
      ],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      contentRendered: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },

    addDependent() {
      this.form.dependents.push({
        firstname: "",
        lastname: "",
        relationship: "",
      });
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
    async downloadPdf() {
      await this.$refs.html2Pdf.generatePdf();
      // const valid = this.$refs.form.validate();
      // if (valid) {
      //   await this.$refs.html2Pdf.generatePdf();
      // }
    },

    onProgress(progress) {
      this.progress = progress;
      console.log(`PDF generation progress: ${progress}%`);
    },

    startPagination() {
      console.log(`PDF has started pagination`);
    },

    hasPaginated() {
      console.log(`PDF has been paginated`);
    },

    // async beforeDownload({ html2pdf, options, pdfContent }) {
    //   console.log(`On Before PDF Generation`);
    //   // await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
    //   // 	const totalPages = pdf.internal.getNumberOfPages()
    //   // 	for (let i = 1; i <= totalPages; i++) {
    //   // 		pdf.setPage(i)
    //   // 		pdf.setFontSize(10)
    //   // 		pdf.setTextColor(150)
    //   // 		pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
    //   // 	}
    //   // }).save()
    // },

    hasDownloaded(blobPdf) {
      console.log(`PDF has downloaded`);
      this.pdfDownloaded = true;
      console.log(blobPdf);
    },

    domRendered() {
      console.log("Dom Has Rendered");
      this.contentRendered = true;
    },

    onBlobGenerate(blob) {
      console.log(blob);
    },

    hasGenerated(blob) {
      console.log(blob);
      const fileURL = URL.createObjectURL(blob);
      const pdfWindow = window.open();
      pdfWindow.location.href = fileURL;
    },
  },

  components: {
    VueHtml2pdf,
    PdfContent,

    FormSteps,
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
