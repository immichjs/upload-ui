<template>
  <div class="flex flex-col gap-1 mt-2">
    <div class="flex items-center w-full gap-2">
      <div class="flex justify-center items-center w-8 h-8 border rounded-lg">
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
        <span class="text-xs text-zinc-500" v-if="file.loading < 100">{{
          file.estimated
        }}</span>

        <div class="flex justify-end items-center gap-1" v-else>
          <Icon
            name="material-symbols:check-circle-rounded"
            class="text-teal-500"
          />

          <Icon
            name="i-solar:trash-bin-trash-outline"
            class="text-zinc-500 cursor-pointer duration-300 hover:text-red-400 text-lg"
          />
        </div>
      </div>
    </div>

    <div class="flex gap-2.5 w-full items-center mt-1">
      <div class="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
        <div
          class="h-full bg-teal-500 rounded-full"
          :style="{ width: file.loading + '%' }"
        ></div>
      </div>
      <span class="text-xs text-zinc-600">{{ file.loading }}%</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(["file"]);

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
</script>
