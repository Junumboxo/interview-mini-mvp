<template>
  <div class="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
    <div v-if="!selectedUser" class="text-gray-500">
      Select a user to view messages
    </div>
    <div v-else-if="loading" class="text-gray-500">
      Loading messages...
    </div>
    <div v-else-if="messages.length === 0" class="text-gray-500">
      No messages with this user
    </div>

    <div
        v-for="msg in messages"
        :key="msg.id"
        class="max-w-[70%] p-3 rounded-lg shadow text-sm"
        :class="isReplyMessage(msg) ? 'bg-green-200 self-end ml-auto' : 'bg-white self-start mr-auto'"
    >
      <div class="text-xs text-gray-600 mb-1">
        {{ msg.source }} · {{ msg.language }} {{ flag(msg.language) }}
      </div>

      <MessageContent :message="msg" />

      <div class="text-[10px] text-gray-400 mt-1 text-right">
        {{ formatMessageTime(msg.timestamp) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { flag, formatMessageTime, isReplyMessage } from '~/utils/messageHelpers';
import MessageContent from './MessageContent.vue';

defineProps({
  messages: {
    type: Array,
    required: true
  },
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