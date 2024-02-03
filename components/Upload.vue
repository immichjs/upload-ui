<template>
  <section>
    <div
      class="flex justify-center items-center border-2 rounded-xl border-dashed h-20 cursor-pointer hover:border-violet-500 duration-200 group"
      @click="fileInput?.click()"
    >
      <input
        type="file"
        ref="fileInput"
        multiple="false"
        class="hidden"
        accept=".xlsx"
        @change="uploadFile($event)"
      />
      <Icon
        name="i-solar:cloud-upload-linear"
        class="text-3xl duration-200 text-slate-300 group-hover:text-violet-500"
      />
    </div>

    <File v-for="file in files" :file="file" />
    <UploadedFiles :files="uploadFiles" />
  </section>
</template>

<script lang="ts" setup>
import { v4 as uuid } from "uuid";

const { $axios } = useNuxtApp();
const fileInput = ref<HTMLInputElement>();

const files = ref<any>([]);
const uploadFiles = ref<any>([]);
const showProgress = ref(true);

function uploadFile(event: any) {
  const file = event.target.files[0];

  if (!file) return;

  const extensionFile = file.name.split(".")[1];
  const fileName = `${uuid()}.${extensionFile}`;
  const formData = new FormData();

  formData.append("file", file);

  files.value.push({
    name: fileName,
    type: file.type,
    size: file.size,
    extension: extensionFile,
    loading: 0,
  });

  $axios
    .post("/upload", formData, {
      onUploadProgress({ loaded, total }: any) {
        if (!files.value) return;

        files.value[files.value.length - 1].loading = Math.floor(
          (loaded / total) * 100
        );

        if (loaded == total) {
          uploadFiles.value?.push({
            name: fileName,
            size: file.size,
            type: file.type,
            extension: extensionFile,
          });

          files.value = [];
          showProgress.value = false;
        }
      },
    })
    .catch((error) => console.log(error));
}
</script>
