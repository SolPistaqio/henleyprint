<template>
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
            v-if="form"
            @domRendered="domRendered()"
            slot="pdf-content"
            :form="form"
          />
        </vue-html2pdf>
        <form-steps @print="downloadPdf" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PdfContent from "@/components/PdfContent";
import VueHtml2pdf from "vue-html2pdf";
import FormSteps from "./components/FormSteps.vue";

export default {
  name: "app",

  data() {
    return {
      contentRendered: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
      form: null,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  methods: {
    async downloadPdf(form) {
      this.form = form;
      await this.$refs.html2Pdf.generatePdf();
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
