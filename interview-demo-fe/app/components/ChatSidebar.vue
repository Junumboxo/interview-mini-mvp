<template>
  <div class="h-full flex flex-col bg-white border-r">
    <!-- Header -->
    <div class="p-4 border-b flex-shrink-0">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">Inbox</h2>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div v-if="sortedUserIds.length === 0" class="p-4 text-gray-500 text-center">
        No users found
      </div>

      <div
          v-for="uid in sortedUserIds"
          :key="uid"
          @click="$emit('selectUser', uid)"
          :class="[
          'cursor-pointer px-4 py-3 border-b hover:bg-gray-100 transition-colors',
          selectedUser === uid ? 'bg-green-100 font-semibold' : ''
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="mr-2">👤</span>
            <div>
              <div class="font-medium">{{ uid }}</div>
              <div v-if="lastMessageTime[uid]" class="text-xs text-gray-500">
                {{ formatRelativeTime(new Date(lastMessageTime[uid])) }}
              </div>
              <div v-else class="text-xs text-gray-400">
                <span v-if="loadingLastMessages">Loading...</span>
                <span v-else>No recent messages</span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span
                v-if="unreadCounts[uid] > 0"
                class="bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            >
              {{ unreadCounts[uid] }}
            </span>
            <div
                v-if="loadingLastMessages"
                class="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { formatRelativeTime } from '~/utils/messageHelpers';

defineEmits(['selectUser']);

defineProps({
  sortedUserIds: {
    type: Array,
    required: true
  },
  selectedUser: {
    type: String,
    default: null
  },
  unreadCounts: {
    type: Object,
    required: true
  },
  lastMessageTime: {
    type: Object,
    required: true
  },
  loadingLastMessages: {
    type: Boolean,
    default: false
  }
});
</script>

