<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-7xl h-[90vh] bg-white shadow-xl rounded-xl border border-gray-100 flex overflow-hidden">
      <!-- Sidebar -->
      <div class="w-1/3 bg-gray-50 border-r border-gray-200">
        <ChatSidebar
            :sorted-user-ids="sortedUserIds"
            :selected-user="selectedUser"
            :unread-counts="unreadCounts"
            :last-message-time="lastMessageTime"
            :loading-last-messages="loadingLastMessages"
            @select-user="selectUser"
        />
      </div>

      <!-- Main chat area -->
      <div class="flex-1 flex flex-col">
        <ChatHeader
            :selected-user="selectedUser"
            :loading="loading"
            class="border-b border-gray-200 px-4 py-3"
        />

        <div class="flex-1 overflow-y-auto bg-white">
          <MessageList
              :messages="currentUserMessages"
              :selected-user="selectedUser"
              :loading="loading"
          />
        </div>

        <div class="border-t border-gray-200 bg-gray-50 px-4 py-3">
          <MessageInput
              v-model="replyText"
              :selected-user="selectedUser"
              @send="sendReply"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
const { getAuthHeaders } = useAuth();

const { data: initialUsers, pending: usersPending, error: usersError } = await useFetch(
    'http://localhost:3000/senders',
    {
      headers: getAuthHeaders(),
      watch: [],
      server: false,
      default: () => [],
    }
);


const {
  selectedUser,
  replyText,
  unreadCounts,
  sortedUserIds,
  lastMessageTime,
  currentUserMessages,
  loadingLastMessages,
  setupSocketListeners,
  selectUser,
  sendReply,
  addUsersToList
} = useChat();

const { loading } = useMessageCache();

watch(initialUsers, async (users) => {
  if (users && Array.isArray(users)) {
    await addUsersToList(users);
  }
}, { immediate: true });

watch(usersPending, (pending) => {
  if (!pending && usersError.value) {
    console.error('Failed to fetch users:', usersError.value);
  }
});

onMounted(() => {
  setupSocketListeners();
});
</script>
