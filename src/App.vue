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
              <h2>CLIENT (CONTRACTING PARTY)</h2>
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
                v-model="form.businessName"
                label="Business name"
                hint="Name of the company"
                :rules="requiredRules"
                required
              ></v-text-field>
              <!-- Add County ZIP Stree etc -->
              <v-text-field
                v-model="form.businessAddress"
                label="Business address"
                hint="Company's address"
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

              <v-radio-group
                v-model="form.rejectedByHenley"
                label="Have you or has one of your dependents ever been rejected
by a Henley & Partners office to become a client?"
                :rules="requiredRulesRadio"
                required
                row
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
              ></v-textarea>

              <v-radio-group
                v-model="form.clientOfHenley"
                label="Have you or has one of your dependents been a client of
Henley & Partners before?"
                :rules="requiredRulesRadio"
                required
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
              ></v-textarea>
              <v-row>
                <v-col> <h2>FAMILY MEMBERS</h2></v-col>
                <v-col>
                  <v-btn @click="addDependent" color="secondary">
                    Add family member
                  </v-btn></v-col
                >
              </v-row>

              <div v-for="(dependent, index) in form.dependents" :key="index">
                <v-text-field
                  v-model="form.dependent.firstname"
                  :rules="requiredRules"
                  label="First name(s)"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="form.dependent.lastname"
                  :rules="requiredRules"
                  label="Last name"
                  required
                ></v-text-field>

                <v-select
                  v-model="form.dependent.relationship"
                  label="Relationship"
                  :items="relationships"
                  :rules="requiredRules"
                  required
                >
                </v-select>
              </div>
              <h2>BANKING REFERENCE</h2>

              <v-text-field
                v-model="form.bankName"
                :rules="requiredRules"
                label="Account in name of (should be in your personal name)"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.iban"
                :rules="requiredRules"
                label="Account Number or IBAN)"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.swift"
                :rules="requiredRules"
                label="SWIFT code"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.bank"
                :rules="requiredRules"
                label="Bank name"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.bankAddress"
                :rules="requiredRules"
                label="Bank location"
                required
              ></v-text-field>
              <h2>BENEFICIAL OWNER DECLARATION</h2>
              <p class="mt-3">I the undersigned herewith declare:</p>
              <v-radio-group
                v-model="form.beneficiary"
                :rules="requiredRulesRadio"
                required
                row
              >
                <v-radio
                  label="I am the ultimate beneficial owner of all funds remitted to Henley"
                  :value="false"
                ></v-radio>
                <v-radio
                  label="I am not the beneficial owner"
                  :value="true"
                ></v-radio>
              </v-radio-group>
              <div v-if="form.beneficiary">
                <p>
                  The ultimate beneficial owner(s) of all funds remitted to
                  Henley is (are):
                </p>
                <div
                  v-for="(beneficiary, index) in form.beneficiaries"
                  :key="index"
                >
                  <v-text-field
                    v-model="form.beneficiary.firstname"
                    :rules="requiredRules"
                    label="First name(s)"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="form.beneficiary.othername"
                    :rules="requiredRules"
                    label="Other name(s)"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="form.beneficiary.lastname"
                    :rules="requiredRules"
                    label="Last name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.beneficiary.nationality"
                    label="Nationality"
                    :rules="requiredRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="form.beneficiary.placeOfBirth"
                    label="Place of birth"
                    :rules="requiredRules"
                    required
                  ></v-text-field>
                  <!-- FIX! -->
                  <v-menu
                    ref="menu"
                    v-model="form.beneficiary.menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.beneficiary.date"
                        label="Date of birth"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="requiredRules"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.beneficiary.date"
                      :active-picker.sync="activePicker"
                      max="2000-01-01"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>

                    <v-text-field
                      v-model="form.beneficiary.businessName"
                      label="Business name"
                      hint="Name of the company"
                      :rules="requiredRules"
                      required
                    ></v-text-field>
                    <!-- Add County ZIP Stree etc -->
                    <v-text-field
                      v-model="form.beneficiary.businessAddress"
                      label="Business address"
                      hint="Company's address"
                      :rules="requiredRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.beneficiary.address"
                      label="Permanent residential address:"
                      :rules="requiredRules"
                      required
                    ></v-text-field>
                  </v-menu>

                  <v-select
                    v-model="form.beneficiary.relationship"
                    label="Relationship"
                    :items="relationships"
                    :rules="requiredRules"
                    required
                  >
                  </v-select>
                </div>
                <v-btn @click="addBeneficiaries" color="secondary">
                  Add beneficial owner
                </v-btn>
              </div>
              <h2>CONSENT</h2>
              <v-checkbox
                v-model="processing"
                :rules="requiredRules"
                required
                label="I hereby give consent to Henley processing the Sensitive Data required by or provided to Henley."
              ></v-checkbox>
              <v-checkbox
                v-model="data"
                :rules="requiredRules"
                required
                label="I hereby confirm that I am fully authorized by all persons named herein to give such consent on their behalf to Henley processing their Sensitive Data. I agree to provide Henley with a written confirmation of such person’s consent upon Henley’s request."
              ></v-checkbox>
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
      purposes: ["Business", "Travel", "Education"],
      relationships: ["Mother", "Father", "Child"],
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
      this.$refs.form.validate();
      const valid = this.$refs.form.validate();
      if (valid) {
        await this.$refs.html2Pdf.generatePdf();
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
