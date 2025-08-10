export const flag = (lang) => {
    return {
        en: '🇬🇧',
        es: '🇪🇸',
        de: '🇩🇪',
        fr: '🇫🇷',
        it: '🇮🇹',
    }[lang] || '🏳️';
};

export const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
};

export const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMs = now - messageTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
        return 'Just now';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    } else {
        return messageTime.toLocaleDateString();
    }
};

export const isReplyMessage = (message) => {
    return message.source === 'Reply';
};