import {useAuth} from "~/composables/useAuth.js";

export const useMessageCache = () => {
    // Cache configuration
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
    const MAX_CACHED_USERS = 5;

    // Reactive state
    const userMessageCache = ref({});
    const lastMessageCache = ref({});
    const loading = ref(false);

    const { getAuthHeaders } = useAuth();

    const isCacheValid = (userId) => {
        const cacheEntry = userMessageCache.value[userId];
        if (!cacheEntry) return false;

        const now = Date.now();
        return (now - cacheEntry.lastFetched) < CACHE_TTL;
    };

    const isLastMessageCacheValid = (userId) => {
        const cacheEntry = lastMessageCache.value[userId];
        if (!cacheEntry) return false;

        const now = Date.now();
        return (now - cacheEntry.lastFetched) < CACHE_TTL;
    };


    const cleanupCache = () => {
        const now = Date.now();
        const cacheKeys = Object.keys(userMessageCache.value);

        cacheKeys.forEach(userId => {
            const entry = userMessageCache.value[userId];
            if ((now - entry.lastFetched) > CACHE_TTL) {
                delete userMessageCache.value[userId];
            }
        });

        const remainingKeys = Object.keys(userMessageCache.value);
        if (remainingKeys.length > MAX_CACHED_USERS) {
            const sortedByAge = remainingKeys
                .map(userId => ({
                    userId,
                    lastFetched: userMessageCache.value[userId].lastFetched
                }))
                .sort((a, b) => a.lastFetched - b.lastFetched);

            const toRemove = sortedByAge.slice(0, remainingKeys.length - MAX_CACHED_USERS);
            toRemove.forEach(({ userId }) => {
                delete userMessageCache.value[userId];
            });
        }
    };

    const cleanupLastMessageCache = () => {
        const now = Date.now();
        const cacheKeys = Object.keys(lastMessageCache.value);

        cacheKeys.forEach(userId => {
            const entry = lastMessageCache.value[userId];
            if ((now - entry.lastFetched) > CACHE_TTL) {
                delete lastMessageCache.value[userId];
            }
        });
    };

    const addMessageToCache = (userId, message) => {
        cleanupCache();

        const cacheEntry = userMessageCache.value[userId];
        if (cacheEntry) {
            cacheEntry.data.push(message);
        } else {
            if (Object.keys(userMessageCache.value).length >= MAX_CACHED_USERS) {
                cleanupCache();
            }

            userMessageCache.value[userId] = {
                data: [message],
                lastFetched: Date.now()
            };
        }
        updateLastMessageInCache(userId, message);
    };

    const updateLastMessageInCache = (userId, message) => {
        lastMessageCache.value[userId] = {
            data: {
                userId,
                content: message.content,
                timestamp: message.timestamp
            },
            lastFetched: Date.now()
        };
    };

    const getMessagesFromCache = (userId) => {
        const cacheEntry = userMessageCache.value[userId];
        return cacheEntry ? cacheEntry.data : [];
    };

    const getLastMessageTime = (userId) => {
        const lastMessageEntry = lastMessageCache.value[userId];
        if (lastMessageEntry && lastMessageEntry.data) {
            return new Date(lastMessageEntry.data.timestamp).getTime();
        }

        const messages = getMessagesFromCache(userId);
        if (messages && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            return new Date(lastMessage.timestamp).getTime();
        }

        return null;
    };

    const fetchAllLastMessages = async () => {
        const now = Date.now();
        const allCacheKeys = Object.keys(lastMessageCache.value);

        if (allCacheKeys.length > 0) {
            const allRecent = allCacheKeys.every(userId => {
                const entry = lastMessageCache.value[userId];
                return entry && (now - entry.lastFetched) < CACHE_TTL;
            });

            if (allRecent) {
                console.log('All last message times are cached and valid');
                return lastMessageCache.value;
            }
        }

        cleanupLastMessageCache();

        try {
            const response = await $fetch('http://localhost:3000/messages/last', {headers: getAuthHeaders()});
            const now = Date.now();

            if (Array.isArray(response)) {
                lastMessageCache.value = {};
                response.forEach(lastMessage => {
                    if (lastMessage && lastMessage.userId) {
                        lastMessageCache.value[lastMessage.userId] = {
                            data: lastMessage,
                            lastFetched: now
                        };
                    }
                });

                console.log(`Fetched last messages for ${response.length} users`);
                return lastMessageCache.value;
            }
        } catch (error) {
            console.error('Failed to fetch all last messages:', error);
        }

        return {};
    };

    const fetchLastMessage = async (userId) => {
        if (isLastMessageCacheValid(userId)) {
            return lastMessageCache.value[userId].data;
        }

        await fetchAllLastMessages();

        const entry = lastMessageCache.value[userId];
        return entry ? entry.data : null;
    };

    const fetchLastMessages = async () => {
        await fetchAllLastMessages();
    };

    const fetchUserMessages = async (userId) => {
        if (isCacheValid(userId)) {
            return getMessagesFromCache(userId);
        }

        cleanupCache();

        loading.value = true;
        try {
            const response = await $fetch(`http://localhost:3000/messages/${userId}`, {headers: getAuthHeaders()});

            if (Object.keys(userMessageCache.value).length >= MAX_CACHED_USERS) {
                cleanupCache();
            }

            userMessageCache.value[userId] = {
                data: Array.isArray(response) ? response : [],
                lastFetched: Date.now()
            };

            if (userMessageCache.value[userId].data.length > 0) {
                const lastMessage = userMessageCache.value[userId].data[userMessageCache.value[userId].data.length - 1];
                updateLastMessageInCache(userId, lastMessage);
            }

            console.log(`Fetched ${userMessageCache.value[userId].data.length} messages for user ${userId}`);
            return userMessageCache.value[userId].data;

        } catch (error) {
            console.error('Failed to fetch messages for user:', userId, error);

            userMessageCache.value[userId] = {
                data: [],
                lastFetched: Date.now()
            };
            return [];
        } finally {
            loading.value = false;
        }
    };

    const clearAllCache = () => {
        userMessageCache.value = {};
        lastMessageCache.value = {};
        console.log('All message cache cleared');
    };

    return {
        userMessageCache: readonly(userMessageCache),
        lastMessageCache: readonly(lastMessageCache),
        loading: readonly(loading),
        isCacheValid,
        cleanupCache,
        addMessageToCache,
        getMessagesFromCache,
        getLastMessageTime,
        fetchLastMessage,
        fetchLastMessages,
        fetchAllLastMessages,
        fetchUserMessages,
        clearAllCache
    };
};