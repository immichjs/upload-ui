<template>
  <div v-if="files.length">
    <ul class="flex flex-col gap-2 mt-2">
      <li class="flex items-center w-full gap-2" v-for="(file, index) in files">
        <div
          class="flex justify-center items-center w-10 h-10 border rounded-lg"
        >
          <Icon name="i-vscode-icons:file-type-excel" class="text-xl" />
        </div>

        <div class="text-sm flex-1 truncate">
          <p class="text-zinc-800 text-sm leading-4 truncate w-48">
            {{ file.name }}
          </p>
          <p class="text-xs font-light text-zinc-500 leading-4">
            {{ formatFileSize(file.size) }}
          </p>
        </div>

        <div class="flex items-center">
          <div class="flex justify-end items-center gap-1">
            <Icon
              name="material-symbols:check-circle-rounded"
              class="text-violet-500"
            />

            <Icon
              name="i-solar:trash-bin-trash-outline"
              class="text-zinc-500 cursor-pointer duration-300 hover:text-red-400 text-lg"
              @click="deleteFile(index)"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["files"]);

function formatFileSize(bytes: number) {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (bytes < kilobyte) {
    return bytes + " B";
  } else if (bytes < megabyte) {
    return (bytes / kilobyte).toFixed(2) + " KB";
  } else if (bytes < gigabyte) {
    return (bytes / megabyte).toFixed(2) + " MB";
  } else {
    return (bytes / gigabyte).toFixed(2) + " GB";
  }
}

function deleteFile(index: number) {
  const confirm = window.confirm("Deseja apagar permanentemente esse arquivo?");

  if (!confirm) {
    return;
  }

  props.files.splice(index, 1);
}
</script>
