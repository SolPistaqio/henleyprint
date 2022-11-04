<template>
  <section slot="pdf-content">
    <section class="pdf-content">
      <div class="wrapper">
        <v-row>
          <v-col>
            <div style="border-bottom: 1px solid #75767a; margin: 0px">
              <v-img
                style="margin-bottom: 17px"
                contain
                height="35px"
                src="../assets/logo.png"
                lazy-src="../assets/logo.png"
              ></v-img>
            </div>
          </v-col>
        </v-row>
        <div class="page">
          <h1 style="margin-top: -5px">DUE DILIGENCE FORM A</h1>
          <h1>1. CLIENT (CONTRACTING PARTY)</h1>
          <p>
            In order for us to conduct proper due diligence on you, we require
            certain personal information from you. You are kindly requested to
            enclose a copy of your passport with this Form A.
          </p>

          <p>Surname:</p>
          <div class="field">
            <span>
              {{ form.lastname }}
            </span>
          </div>
          <p>First name(s):</p>
          <div class="field">
            <span>
              {{ form.firstname }}
            </span>
          </div>
          <p>Other name(s) you are known by:</p>
          <div class="field">
            <span>
              {{ form.othername ? form.othername : " N/A" }}
            </span>
          </div>
          <p>Nationality:</p>
          <div class="field">
            <span>
              {{ form.nationality }}
            </span>
          </div>
          <p>Place of birth/date of birth:</p>
          <div class="field">
            <span>
              {{ form.placeOfBirth + " " + form.date }}
            </span>
          </div>
          <p>Permanent residential address:</p>
          <div class="field">
            <span>
              {{
                form.address.street +
                " " +
                form.address.city +
                " " +
                form.address.country +
                " " +
                form.address.zip
              }}
            </span>
          </div>
          <p>Email address:</p>
          <div class="field">
            <span>
              {{ form.email }}
            </span>
          </div>
          <p>Occupation:</p>
          <div class="field">
            <span>
              {{ form.occupation }}
            </span>
          </div>
          <p>Business activities:</p>
          <div class="field">
            <span>
              {{ form.activities.toString() }}
            </span>
          </div>
          <p>Business name and address:</p>
          <div class="field">
            <span>
              {{ form.businessName }} <br />
              {{
                form.businessAddress.street +
                " " +
                form.businessAddress.city +
                " " +
                form.businessAddress.country +
                " " +
                form.businessAddress.zip
              }}
            </span>
          </div>
          <p>Purpose of seeking alternative citizenship / residence:</p>
          <div class="field">
            <span>
              {{ form.purpose }}
            </span>
          </div>
          <p>Program of interest:</p>
          <div class="field">
            <span>
              {{ form.program }}
            </span>
          </div>
          <p>Are you a Politically Exposed Person (“PEP”)?</p>
          <div class="boolfield">
            <span v-if="form.pep">
              <v-icon> mdi-checkbox-blank-outline</v-icon>No
              <v-icon> mdi-checkbox-marked </v-icon> Yes
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-marked </v-icon> No
              <v-icon> mdi-checkbox-blank-outline</v-icon> Yes
            </span>
          </div>

          <p>
            While there is no global definition of a PEP, the Financial Action
            Task Force has issued guidelines (www.fatf-gafi.org), which
            generally refer to the following: A PEP is a current or former
            (during the past ten years) senior official in the executive,
            legislative, administrative, military, or judicial branch of the
            state (elected or not), a senior official of a major political
            party, a senior executive of a government owned commercial
            enterprise, and/or being a corporation, business or other entity
            formed by or for the benefit of any such individual; an immediate
            family member of such individual, meaning spouse, parents, siblings,
            children, and spouse’s parents or siblings, or any individual
            publicly known (or actually known by the relevant financial
            institution) to be a close personal or professional associate. If
            you are in doubt whether you qualify as PEP or not, please tick Yes
            above.
          </p>
          <p>
            Do you have any association with a previous applicant or an
            individual with an ongoing application for the program of interest
            (i.e. family members, associates, business partners, etc.)?
          </p>
          <div class="boolfield">
            <span v-if="form.association">
              <v-icon> mdi-checkbox-blank-outline</v-icon>No
              <v-icon> mdi-checkbox-marked </v-icon> Yes
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-marked </v-icon> No
              <v-icon> mdi-checkbox-blank-outline</v-icon> Yes
            </span>
          </div>
        </div>
        <v-row style="margin-bottom: 0px, padding-bottom: 0px">
          <v-col>
            <div class="bottom">
              <p>
                HP Due Diligence Form A V211017

                <br />
                Copyright © 2021 by Henley &amp; Partners Group Holdings Ltd.
                All rights reserved.
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <div class="html2pdf__page-break"></div>
    <section class="pdf-content">
      <div class="wrapper">
        <v-row>
          <v-col>
            <div style="border-bottom: 1px solid #75767a; margin: 0px">
              <v-img
                style="margin-bottom: 17px"
                contain
                height="35px"
                src="../assets/logo.png"
                lazy-src="../assets/logo.png"
              ></v-img>
            </div>
          </v-col>
        </v-row>

        <div class="page">
          <p>
            If you ticked yes, please enter name of individual(s) and describe
            relationship:
          </p>
          <div class="field">
            <span>
              {{ form.associationDesc ? form.associationDesc : " N/A" }}
            </span>
          </div>
          <p>
            Have you or has one of your dependents ever been rejected by a
            government authority for a visa, residence or citizenship
            application?
          </p>
          <div class="boolfield">
            <span v-if="form.rejected">
              <v-icon> mdi-checkbox-blank-outline</v-icon>No
              <v-icon> mdi-checkbox-marked </v-icon> Yes
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-marked </v-icon> No
              <v-icon> mdi-checkbox-blank-outline</v-icon> Yes
            </span>
          </div>
          <p>
            If you ticked yes, please enter name of country and type of
            application:
          </p>
          <div class="field">
            <span>
              {{ form.rejectedDesc ? form.rejectedDesc : " N/A" }}
            </span>
          </div>
          <p>
            Have you or has one of your dependents ever been rejected by a
            Henley &amp; Partners office to become a client?
          </p>
          <div class="boolfield">
            <span v-if="form.rejectedByHenley">
              <v-icon> mdi-checkbox-blank-outline</v-icon>No
              <v-icon> mdi-checkbox-marked </v-icon> Yes
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-marked </v-icon> No
              <v-icon> mdi-checkbox-blank-outline</v-icon> Yes
            </span>
          </div>
          <p>
            If you ticked yes, please enter the name of the Henley &amp;
            Partners office:
          </p>
          <div class="field">
            <span>
              {{
                form.rejectedByHenleyDesc ? form.rejectedByHenleyDesc : " N/A"
              }}
            </span>
          </div>
          <p>
            Have you or has one of your dependents been a client of Henley &amp;
            Partners before?
          </p>
          <div class="boolfield">
            <span v-if="form.clientOfHenley">
              <v-icon> mdi-checkbox-blank-outline</v-icon>No
              <v-icon> mdi-checkbox-marked </v-icon> Yes
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-marked </v-icon> No
              <v-icon> mdi-checkbox-blank-outline</v-icon> Yes
            </span>
          </div>
          <p>
            If you ticked yes, please enter the name of the Henley &amp;
            Partners office:
          </p>
          <div class="field">
            <span>
              {{ form.clientOfHenleyDesc ? form.clientOfHenleyDesc : " N/A" }}
            </span>
          </div>
          <h1>2. FAMILY MEMBERS</h1>
          <p>
            In order for us to proceed with the due diligence process, we also
            require personal information about any family member who may be
            included in your Personal Application. You are kindly requested to
            enclose a copy of the passports of such family members with this
            Form A.
          </p>
          <p>Full name(s) of family members / relationship to Client:</p>
          <div class="field">
            <span v-if="form.dependents.length > 1">
              <span v-for="(dependent, index) in form.dependents" :key="index">
                {{ dependent.firstname }} {{ dependent.lastname }} -
                {{ dependent.relationship }} <br />
              </span>
            </span>
            <span v-else>N/A</span>
          </div>
          <h1>3. BANKING REFERENCE</h1>
          <p>
            Please note that funds must generally be remitted from your personal
            bank account. In the exceptional event that Henley agrees to accept
            funds from a third party on your behalf, then the relevant account
            from which funds are actually transferred must be named below, and
            additional due diligence information and documentation will be
            required from that third party (as applicable Due Diligence Form B
            will be provided for completion by that third party). Funds will in
            any case only be accepted by Henley if this Form A (and as
            applicable Due Diligence Form B) is duly completed, executed and
            passport copies are enclosed.
          </p>

          <p>
            Funds will be wired to Henley from the following bank account:
            <br />
            Account in name of (should be in your personal name):
          </p>
          <div class="field">
            <span>{{ form.bankName }}</span>
          </div>
          <p>Account Number or IBAN and SWIFT code:</p>
          <div class="field">
            <span
              >{{ form.iban }} <br />
              {{ form.swift }}</span
            >
          </div>
          <p>Bank name and location</p>
          <div class="field">
            <span
              >{{ form.bank }} <br />
              {{
                form.bankAddress.street +
                " " +
                form.bankAddress.city +
                " " +
                form.bankAddress.country +
                " " +
                form.bankAddress.zip
              }}</span
            >
          </div>
          <h1>4. BENEFICIAL OWNER DECLARATION</h1>
          <p>I the undersigned herewith declare:</p>
          <div class="boolfield">
            <span v-if="!form.beneficiary">
              <v-icon> mdi-checkbox-blank-outline</v-icon>that I am the ultimate
              beneficial owner of all funds remitted to Henley. Please continue
              to clause 5. <br />
              <v-icon> mdi-checkbox-marked </v-icon> that the ultimate
              beneficial owner(s) of all funds remitted to Henley is (are):
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-marked </v-icon> that I am the ultimate
              beneficial owner of all funds remitted to Henley. Please continue
              to clause 5. <br /><v-icon> mdi-checkbox-blank-outline</v-icon>
              that the ultimate beneficial owner(s) of all funds remitted to
              Henley is (are):
            </span>
          </div>
          <p>Surname:</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].lastname
                ? form.beneficiaries[0].lastname
                : "N/A"
            }}</span>
          </div>

          <p>First name(s):</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].firstname
                ? form.beneficiaries[0].firstname
                : "N/A"
            }}</span>
          </div>
          <p>Other name(s) you are known by:</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].othername
                ? form.beneficiaries[0].othername
                : "N/A"
            }}</span>
          </div>
          <p>Nationality:</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].nationality
                ? form.beneficiaries[0].nationality
                : "N/A"
            }}</span>
          </div>
        </div>
        <v-row style=" margin-bottom: 0px, padding-bottom: 0px">
          <v-col>
            <div class="bottom">
              <p>
                HP Due Diligence Form A V211017

                <br />
                Copyright © 2021 by Henley &amp; Partners Group Holdings Ltd.
                All rights reserved.
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <div class="html2pdf__page-break"></div>
    <section class="pdf-content">
      <div class="wrapper">
        <v-row>
          <v-col>
            <div style="border-bottom: 1px solid #75767a; margin: 0px">
              <v-img
                style="margin-bottom: 17px"
                contain
                height="35px"
                src="../assets/logo.png"
                lazy-src="../assets/logo.png"
              ></v-img>
            </div>
          </v-col>
        </v-row>

        <div class="page">
          <p>Place of birth:</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].placeOfBirth
                ? form.beneficiaries[0].placeOfBirth
                : "N/A"
            }}</span>
          </div>
          <p>Date of birth:</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].date ? form.beneficiaries[0].date : "N/A"
            }}</span>
          </div>
          <p>Permanent residential address:</p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].address
                ? form.beneficiaries[0].address.street +
                  " " +
                  form.beneficiaries[0].address.city +
                  " " +
                  form.beneficiaries[0].address.country +
                  " " +
                  form.beneficiaries[0].address.zip
                : "N/A"
            }}</span>
          </div>
          <p>Business name and address:</p>
          <div class="field">
            <span>
              {{
                form.beneficiaries[0].businessName
                  ? form.beneficiaries[0].businessName +
                    " " +
                    form.beneficiaries[0].businessAddress.street +
                    " " +
                    form.beneficiaries[0].businessAddress.city +
                    " " +
                    form.beneficiaries[0].businessAddress.country +
                    " " +
                    form.beneficiaries[0].businessAddress.zip
                  : "N/A"
              }}
            </span>
          </div>
          <p>
            What is the connection between you and the beneficial owner of the
            funds?:
          </p>
          <div class="field">
            <span>{{
              form.beneficiaries[0].relationship
                ? form.beneficiaries[0].relationship
                : "N/A"
            }}</span>
          </div>
          <p>
            <span v-if="form.beneficiaries.length >= 2">
              <v-icon> mdi-checkbox-marked </v-icon> Tick here if there are
              additional beneficial owners, in which case an additional Form A
              should be attached with the details of these additional beneficial
              owners.
            </span>
            <span v-else>
              <v-icon> mdi-checkbox-blank-outline </v-icon> Tick here if there
              are additional beneficial owners, in which case an additional Form
              A should be attached with the details of these additional
              beneficial owners.
            </span>
          </p>
          <h1>5. ACKNOWLEDGEMENT AND AUTHORIZATION</h1>
          <p>
            I acknowledge and agree that completion and submission of this Form
            A with applicable documentation authorizes and directs Henley to
            enquire and conduct due diligence and background verification checks
            on the persons named herein.
          </p>
          <p>
            I hereby authorize Henley for the procurement of a Background
            Verification Report from a third party service provider. In that
            regard, I consent for Henley to disclose the personal data,
            including this Form A and the provided passport copies, and the
            nature of my relationship with Henley, to such third party service
            provider to be able to request such a report. I understand and
            consent to the use and processing of such personal information by
            the third party provider in the ordinary and normal course of its
            business and function.
          </p>
          <p>
            I hereby confirm that I am fully authorized by all family members
            named herein to provide Henley with their personal data and their
            passport copies for the purposes set out in this Form A.
          </p>
          <h1>6. CONSENT</h1>
          <p>
            Where Henley has to enhance due diligence, Henley may need to
            process certain sensitive personal data of the persons named herein
            which may fall within the special category of personal data
            revealing racial or ethnic origin, political opinions, religious or
            philosophical beliefs, or trade union membership, generic data,
            biometric data for the purpose of uniquely identifying a natural
            person, data concerning health or data concerning a natural person’s
            sex life or sexual orientation and data relating to criminal
            convictions and offenses (“<strong>Sensitive Data</strong>”).
          </p>
          <p>
            In particular, Henley may need to process records of criminal
            conviction for the purposes of our enhanced due diligence. Henley
            shall not require other Sensitive Data. However, the records of
            criminal convictions or other documents you may provide Henley with
            may happen to reveal further Sensitive Data.
          </p>
          <p>
            To be able to process such Sensitive Data, Henley requires consent.
            <strong
              >Only the Sensitive Data which is strictly necessary for Henley to
              be able to perform due diligence on you, shall be collected or
              otherwise processed</strong
            >. You may withdraw consent at any time. Please contact your Henley
            representative or send an email to DPO@henleyglobal.com in order to
            withdraw the consent. This shall not affect the lawfulness of any
            processing carried out prior to you notifying us that you are
            withdrawing the consent. Should you decide to withdraw the consent
            to us processing all or some of the Sensitive Data listed in this
            Form A, Henley may be unable to conduct enhanced due diligence and
            may not be able to enter into a Client Agreement.
          </p>
          <p>
            <v-icon> mdi-checkbox-marked </v-icon> I hereby give consent to
            Henley processing the Sensitive Data required by or provided to
            Henley.
          </p>
          <p>
            <v-icon> mdi-checkbox-marked </v-icon> I hereby confirm that I am
            fully authorized by all persons named herein to give such consent on
            their behalf to Henley processing their Sensitive Data. I agree to
            provide Henley with a written confirmation of such person’s consent
            upon Henley’s request.
          </p>
        </div>
        <v-row style=" margin-bottom: 0px, padding-bottom: 0px">
          <v-col>
            <div class="bottom">
              <p>
                HP Due Diligence Form A V211017

                <br />
                Copyright © 2021 by Henley &amp; Partners Group Holdings Ltd.
                All rights reserved.
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <div class="html2pdf__page-break"></div>
    <section class="pdf-content">
      <div class="wrapper">
        <v-row>
          <v-col>
            <div style="border-bottom: 1px solid #75767a; margin: 0px">
              <v-img
                style="margin-bottom: 17px"
                contain
                height="35px"
                src="../assets/logo.png"
                lazy-src="../assets/logo.png"
              ></v-img>
            </div>
          </v-col>
        </v-row>
        <div class="page last">
          <h1>7. DECLARATION</h1>
          <p>
            I hereby confirm that the information provided in this Form A, is
            correct, complete and not misleading in any way. I hereby
            acknowledge my obligation to inform Henley immediately of any
            changes to the information I have provided and know that if I
            intentionally provide wrong or incorrect information or falsify this
            Form A this may be prosecuted as a criminal offence under applicable
            laws. I agree that in case I intentionally provide wrong or
            incorrect information or falsify this Form A, I will indemnify
            Henley against all losses, liabilities, actions, proceedings,
            claims, costs and expenses incurred or threatened against Henley
            caused by my actions.
          </p>
          <p>Signature:</p>
          <div class="sigfield field"></div>
          <p>Date:</p>
          <div class="field">
            <span>{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
        <v-row style=" margin-bottom: 0px, padding-bottom: 0px">
          <v-col>
            <div class="bottom">
              <p>
                HP Due Diligence Form A V211017

                <br />
                Copyright © 2021 by Henley &amp; Partners Group Holdings Ltd.
                All rights reserved.
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  props: {
    form: Object,
  },
  data() {
    return {};
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit("domRendered");
      }, 1000);
    });
  },
};
</script>

<style lang="scss" scoped>
@page {
  size: A4 portrait;
  margin: 16mm;
}

.pdf-content {
  width: 100%;
  //height: 1400px;
  background: #fff;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 1000px;
  padding: 17px 47px 17px 47px;
  font-family: "Times New Roman", Times, serif;
  font-weight: 200;
  line-height: 1.3;
  font-size: 15px;
}

.page {
  column-count: 2;
  margin-top: 20px;
  height: 100%;
}
.last {
  column-fill: auto;
}

p,
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}

div .field {
  border: 1px solid #75767a;
  padding: 2px;
  margin-top: -15px;
  margin-bottom: -15px;
}

.field > span {
  min-height: 14px;
}

.sigfield {
  height: 50px;
}

div .boolfield {
  margin-top: -15px;
  margin-bottom: -15px;
}

.bottom p {
  line-height: 1;
  font-size: small;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
</style>
