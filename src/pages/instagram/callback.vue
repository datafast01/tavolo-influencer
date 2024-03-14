<template>
  <div></div>
</template>

<script>
import axios from "@axios";

export default {
  mounted() {
    if (this.$route.query.code) {
      const codeValue = this.$route.query.code;

      // Now 'codeValue' contains the value of the 'code' parameter
      console.log("Code Value:", codeValue);
      axios
        .post(`instagram/token`, { code: codeValue })
        .then((response) => {
          if (response.status == 200) {
            this.$router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style></style>
