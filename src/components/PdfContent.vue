<template>
  <section slot="pdf-content" class="pdf-content">
    <v-row style=" margin-bottom: 0px, padding-bottom: 0px">
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
    <v-row style="margin-top: 0px, padding-top: 0px; ">
      <v-col style="margin-top: -20px, padding-top: 0px; ">
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
            {{ form.address }}
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
            {{ form.activities }}
          </span>
        </div>
        <p>Business name and address:</p>
        <div class="field">
          <span>
            {{ form.nameAndAddress }}
          </span>
        </div>
        <p>Purpose of seeking alternative citizenship / residence:</p>
        <div class="field">
          <span>
            {{ form.purpose }}
          </span>
        </div>
      </v-col>
      <v-col style="margin-top: -20px, padding-top: 0px; ">
        <p style="margin-top: -5px">Program of interest:</p>
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
          Task Force has issued guidelines (www.fatf-gafi.org), which generally
          refer to the following: A PEP is a current or former (during the past
          ten years) senior official in the executive, legislative,
          administrative, military, or judicial branch of the state (elected or
          not), a senior official of a major political party, a senior executive
          of a government owned commercial enterprise, and/or being a
          corporation, business or other entity formed by or for the benefit of
          any such individual; an immediate family member of such individual,
          meaning spouse, parents, siblings, children, and spouse’s parents or
          siblings, or any individual publicly known (or actually known by the
          relevant financial institution) to be a close personal or professional
          associate. If you are in doubt whether you qualify as PEP or not,
          please tick Yes above.
        </p>

        <p>
          Do you have any association with a previous applicant or an individual
          with an ongoing application for the program of interest (i.e. family
          members, associates, business partners, etc.)?
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
          government authority for a visa, residence or citizenship application?
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
      </v-col>
    </v-row>
    <v-row style=" margin-bottom: 0px, padding-bottom: 0px">
      <v-col>
        <div class="bottom">
          <p>
            HP Due Diligence Form A V211017

            <br />
            Copyright © 2021 by Henley &amp; Partners Group Holdings Ltd. All
            rights reserved.
          </p>
        </div>
      </v-col>
    </v-row>
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
.pdf-content {
  width: 100%;
  height: 1100px;
  background: #fff;
  padding: 17px 47px 17px 47px;
  font-family: "Times New Roman", Times, serif;
  font-weight: 200;
  line-height: 1.3;
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

.bottom {
  position: absolute;
  left: 47px;
  top: 1050px;
}
</style>
