<template>
  <div class="flex flex-col mt-2">
    <div class="flex items-center w-full gap-2">
      <div class="flex justify-center items-center w-10 h-10 border rounded-lg">
        <Icon name="i-vscode-icons:file-type-excel" class="text-xl" />
      </div>

      <div class="text-sm flex-1 truncate">
        <div class="flex flex-1 justify-between">
          <p class="text-zinc-800 text-sm leading-4 truncate w-52">
            {{ file.name }}
          </p>
          <p class="text-xs font-light text-zinc-500 leading-4">
            {{ formatFileSize(file.size) }}
          </p>
        </div>

        <div class="flex gap-2 w-full items-center mt-2">
          <div class="w-full h-1 rounded-full bg-zinc-100 overflow-hidden">
            <div
              class="h-full bg-violet-500 rounded-full"
              :style="{ width: file.loading + '%' }"
            ></div>
          </div>
          <div class="flex gap-1 items-center text-zinc-500 text-xs leading-3">
            <span class="text-violet-500">{{ file.loading }}%</span> /
            {{ file.estimated }}
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <div
          class="flex justify-end items-center gap-1"
          v-if="file.loading === 100"
        >
          <Icon
            name="material-symbols:check-circle-rounded"
            class="text-violet-500"
          />

          <Icon
            name="i-solar:trash-bin-trash-outline"
            class="text-zinc-500 cursor-pointer duration-300 hover:text-red-400 text-lg"
          />
        </div>
      </div>
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
