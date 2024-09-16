<!-- PdfViewer.vue -->
<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <div v-if="pdfData">
      <canvas ref="pdfCanvas"></canvas>
      <button @click="downloadPdf">Download PDF</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

export default {
  setup() {
    const pdfData = ref(null);
    const canvas = ref(null);

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const typedArray = new Uint8Array(fileReader.result);
          pdfData.value = typedArray;
          await renderPdf(typedArray);
        };
        fileReader.readAsArrayBuffer(file);
      }
    };

    const renderPdf = async (typedArray) => {
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.value.getContext('2d');
      canvas.value.height = viewport.height;
      canvas.value.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
    };

    const downloadPdf = () => {
      if (pdfData.value) {
        const blob = new Blob([pdfData.value], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };

    return {
      pdfData,
      canvas,
      handleFileUpload,
      downloadPdf,
    };
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #000;
}
</style>
