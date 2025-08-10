<template>
  <div class="p-4 border-t bg-white flex items-center gap-2">
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="!selectedUser"
        class="flex-1 border rounded px-3 py-2"
        placeholder="Type a reply..."
        @keydown.enter="$emit('send')"
    />
    <button
        @click="$emit('send')"
        class="bg-green-500 text-white px-4 py-2 rounded"
        :disabled="!selectedUser || !modelValue"
    >
      Send
    </button>
  </div>
</template>

<script setup>
defineEmits(['send', 'update:modelValue']);

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  selectedUser: {
    type: String,
    default: null
  }
});
</script>