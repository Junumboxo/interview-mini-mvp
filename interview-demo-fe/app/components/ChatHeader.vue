<template>
  <div class="p-4 bg-green-500 text-white font-bold flex justify-between items-center">
    <span>Chat with {{ selectedUser || '...' }}</span>
    <div class="flex items-center gap-2">
      <span v-if="loading" class="text-sm">Loading...</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedUser: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>