export const useChat = () => {
    const { $socket } = useNuxtApp();
    const {
        addMessageToCache,
        getMessagesFromCache,
        fetchUserMessages,
        getLastMessageTime,
        fetchAllLastMessages
    } = useMessageCache();

    // Reactive state
    const selectedUser = ref(null);
    const replyText = ref('');
    const allUsers = ref(new Set());
    const unreadCounts = ref({});
    const loadingLastMessages = ref(false);

    // Computed last message times from cache
    const lastMessageTime = computed(() => {
        const times = {};
        Array.from(allUsers.value).forEach(userId => {
            const time = getLastMessageTime(userId);
            if (time) {
                times[userId] = time;
            }
        });
        return times;
    });

    const uniqueUserIds = computed(() => {
        return Array.from(allUsers.value);
    });

    const sortedUserIds = computed(() => {
        return uniqueUserIds.value.sort((a, b) => {
            const timeA = lastMessageTime.value[a] || 0;
            const timeB = lastMessageTime.value[b] || 0;
            return timeB - timeA; // Most recent first
        });
    });

    const currentUserMessages = computed(() => {
        return selectedUser.value ? getMessagesFromCache(selectedUser.value) : [];
    });

    const setupSocketListeners = () => {
        $socket.on('newMessage', (msg) => {
            allUsers.value.add(msg.userId);
            addMessageToCache(msg.userId, msg);
            if (selectedUser.value !== msg.userId) {
                unreadCounts.value[msg.userId] = (unreadCounts.value[msg.userId] || 0) + 1;
            }
        });
    };

    const selectUser = async (uid) => {
        selectedUser.value = uid;
        unreadCounts.value[uid] = 0;
        await fetchUserMessages(uid);
    };

    const sendReply = () => {
        if (!replyText.value || !selectedUser.value) return;
        const msg = {
            id: Date.now(),
            userId: selectedUser.value,
            source: 'Reply',
            content: replyText.value,
            language: 'en',
            timestamp: new Date(),
        };

        $socket.emit('replyMessage', msg);
        addMessageToCache(selectedUser.value, msg);
        replyText.value = '';
    };


    const addUsersToList = async (users) => {
        users.forEach(user => {
            const userId = user.id || user.userId;
            allUsers.value.add(userId);
        });

        await fetchAllLastMessages();
    };

    const fetchLastMessagesForUsers = async () => {
        loadingLastMessages.value = true;
        try {
            await fetchAllLastMessages();
            console.log('Fetched all last message times');
        } catch (error) {
            console.error('Failed to fetch last message times:', error);
        } finally {
            loadingLastMessages.value = false;
        }
    };

    const addSingleUser = async (userId) => {
        allUsers.value.add(userId);
        await fetchLastMessagesForUsers([userId]);
    };

    return {
        // State
        selectedUser: readonly(selectedUser),
        replyText,
        allUsers: readonly(allUsers),
        unreadCounts: readonly(unreadCounts),
        lastMessageTime: readonly(lastMessageTime),
        loadingLastMessages: readonly(loadingLastMessages),

        // Computed
        uniqueUserIds,
        sortedUserIds,
        currentUserMessages,

        // Actions
        setupSocketListeners,
        selectUser,
        sendReply,
        addUsersToList,
        fetchLastMessagesForUsers,
        addSingleUser
    };
};