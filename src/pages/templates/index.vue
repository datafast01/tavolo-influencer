<template>
  <h1>Tavolo Email Editor</h1>
  <div class="my-3">
    <VBtn v-on:click="saveDesign" class="mx-4">Save Design</VBtn>
    <VBtn v-on:click="exportHtml" text>Export HTML</VBtn>
  </div>

  <EmailEditor
    style="height: 100vh"
    :project-id="projectId"
    :locale="locale"
    :tools="tools"
    :options="options"
    ref="emailEditor"
    v-on:load="editorLoaded"
    v-on:editor="handleImageUpload"
    :config="congif"
  />
</template>

<script>
import { EmailEditor } from "vue-email-editor";
import Sample from "./Sample.json";

export default {
  name: "app",
  components: {
    EmailEditor,
  },
  data() {
    return {
      minHeight: "2000px",
      locale: "en",
      projectId: 0, // replace with your project id
      options: {},
      tools: {
        // image: {
        // },
      },
      config: {
        endpoints: {
          byFile: "http://localhost:8008/uploadFile",
          byUrl: "http://localhost:8008/uploadFile",
        },
      },
      appearance: {
        theme: "dark",
        panels: {
          tools: {
            dock: "right",
          },
        },
      },
    };
  },
  methods: {
    handleImageUpload() {
      console.log("working");
    },
    editorLoaded() {
      // Pass your template JSON here
      this.$refs.emailEditor.editor.loadDesign(Sample);
      // this.$refs.emailEditor.editor.registerCallback(
      //   "image",
      //   function (file, done) {
      //     // Your code
      //   }
      // );
    },
    saveDesign() {
      console.log(this.$refs.emailEditor);
      this.$refs.emailEditor.editor.saveDesign((design) => {
        console.log("saveDesign", design);
      });
    },
    exportHtml() {
      this.$refs.emailEditor.editor.exportHtml((data) => {
        console.log("exportHtml", data);
      });
    },
  },
};
</script>
