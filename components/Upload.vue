<template>
  <section>
    <div
      class="flex justify-center items-center border-2 rounded-xl border-dashed h-20 duration-200 group"
      :class="{
        'border-red-400 cursor-not-allowed': disableNewUpload,
        'cursor-pointer hover:border-violet-500': !disableNewUpload,
      }"
      @click="fileInput?.click()"
    >
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        :multiple="false"
        accept=".xlsx"
        @change="uploadFile($event)"
        :disabled="disableNewUpload"
      />
      <Icon
        name="i-solar:cloud-upload-linear"
        class="text-3xl duration-200"
        :class="{
          'text-red-400': disableNewUpload,
          'group-hover:text-violet-500 text-slate-300': !disableNewUpload,
        }"
      />
    </div>

    <File v-for="file in files" :file="file" />
    <UploadedFiles :files="uploadFiles" />
  </section>
</template>

<script lang="ts" setup>
const { $axios } = useNuxtApp();
const fileInput = ref<HTMLInputElement>();

const files = ref<any>([]);
const uploadFiles = ref<any>([]);
const disableNewUpload = ref<boolean>(false);

async function uploadFile(event: any) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (
    file.type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    event.target.files = null;
    alert("Tipo de arquivo não suportado");

    return;
  }

  disableNewUpload.value = true;

  const extensionFile = file.name.split(".")[1];
  const formData = new FormData();

  formData.append("file", file);

  files.value.push({
    name: file.name,
    type: file.type,
    size: file.size,
    extension: extensionFile,
    estimated: 0,
    loading: 0,
  });

  $axios
    .post("/upload", formData, {
      onUploadProgress(response: any) {
        if (!files.value) return;

        files.value[files.value.length - 1].loading = Math.floor(
          response.progress * 100
        );

        files.value[files.value.length - 1].estimated = !response.estimated
          ? "Estimando..."
          : response.estimated.toFixed(1) + "s";

        if (response.loaded == response.total) {
          uploadFiles.value?.push({
            name: file.name,
            size: file.size,
            type: file.type,
            extension: extensionFile,
          });

          files.value = [];
          disableNewUpload.value = false;

          input.value = "";
          const newInput = document.createElement("input");
          newInput.type = "file";
          newInput.style.display = "none";
          newInput.multiple = false;
          newInput.disabled = disableNewUpload.value;
          newInput.accept = ".xlsx";
          newInput.addEventListener("change", uploadFile);
          input.parentNode?.replaceChild(newInput, input);
        }
      },
    })
    .catch((error) => console.log(error));
}
</script>
