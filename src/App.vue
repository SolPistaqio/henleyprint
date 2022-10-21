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
          filename="print.pdf"
          :pdf-quality="2"
          :manual-pagination="false"
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
        <v-card class="mx-auto" max-width="800">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="form.firstname"
                :rules="requiredRules"
                label="First name(s)"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.lastname"
                :rules="requiredRules"
                label="Last name"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.othername"
                label="Other name(s) you are known by"
              ></v-text-field>

              <v-text-field
                v-model="form.nationality"
                label="Nationality"
                :rules="requiredRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.placeOfBirth"
                label="Place of birth"
                :rules="requiredRules"
                required
              ></v-text-field>

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.date"
                    label="Date of birth"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="requiredRules"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.date"
                  :active-picker.sync="activePicker"
                  max="2000-01-01"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="form.address"
                label="Permanent residential address:"
                :rules="requiredRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.occupation"
                label="Occupation"
                :rules="requiredRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.activities"
                label="Business activities"
                :rules="requiredRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.nameAndAddress"
                label="Business name and address"
                hint="Name of the company and its address"
                persistent-hint
                :rules="requiredRules"
                required
              ></v-text-field>

              <v-select
                v-model="form.purpose"
                label="Purpose of seeking alternative citizenship / residence"
                :items="purposes"
                :rules="requiredRules"
                required
              >
              </v-select>

              <v-text-field
                v-model="form.program"
                label="Program of interest"
                hint="Country of application"
                persistent-hint
                :rules="requiredRules"
                required
              ></v-text-field>

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
              ></v-textarea>

              <v-radio-group
                v-model="form.rejected"
                label="Have you or has one of your dependents ever been rejected by a government authority for a visa, residence or citizenship application?"
                :rules="requiredRulesRadio"
                required
                row
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
              ></v-textarea>
            </v-form>
          </v-card-text>

          <v-card-actions
            ><v-btn color="primary" @click="downloadPdf()"
              >Print PDF</v-btn
            ></v-card-actions
          >
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PdfContent from "@/components/PdfContent";
import VueHtml2pdf from "vue-html2pdf";

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
        occupation: "",
        activities: "",
        nameAndAddress: "",
        purpose: "",
        program: "",
        pep: "",
        association: "",
        associationDesc: "",
        rejected: "",
        rejectedDesc: "",
        email: "",
      },
      purposes: ["Business", "Travel", "Education"],
      activePicker: null,
      menu: false,
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
    downloadPdf() {
      this.$refs.form.validate();
      const valid = this.$refs.form.validate();
      if (valid) {
        this.$refs.html2Pdf.generatePdf();
      }
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
