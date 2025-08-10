export const useTranslation = () => {
    const TRANSLATE_URL = 'http://localhost:3000/translate';
    const TARGET_LANGUAGE = 'en';
    const TRANSLATION_CACHE_TTL = 24 * 60 * 60 * 1000; 

    const translationCache = ref({});
    const loadingTranslations = ref(new Set());
    
    const isCached = (messageId, originalText) => {
        const cacheKey = `${messageId}_${originalText}`;
        const cached = translationCache.value[cacheKey];

        if (!cached) return false;

        const now = Date.now();
        return (now - cached.timestamp) < TRANSLATION_CACHE_TTL;
    };

    const getCachedTranslation = (messageId, originalText) => {
        const cacheKey = `${messageId}_${originalText}`;
        const cached = translationCache.value[cacheKey];
        return cached ? cached.translation : null;
    };

    const setCachedTranslation = (messageId, originalText, translation) => {
        const cacheKey = `${messageId}_${originalText}`;
        translationCache.value[cacheKey] = {
            translation,
            timestamp: Date.now()
        };
    };
    
    const isLikelyEnglish = (text) => {
        const englishPattern = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
        const commonEnglishWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can'];

        if (!englishPattern.test(text)) return false;

        const words = text.toLowerCase().split(/\s+/);
        const englishWordCount = words.filter(word =>
            commonEnglishWords.includes(word.replace(/[.,!?'"()-]/g, ''))
        ).length;

        return englishWordCount / words.length > 0.3; 
    };

    const translateText = async (messageId, originalText) => {
        if (isCached(messageId, originalText)) {
            return getCachedTranslation(messageId, originalText);
        }
        
        if (isLikelyEnglish(originalText)) {
            const translation = originalText;
            setCachedTranslation(messageId, originalText, translation);
            return translation;
        }

      
        const loadingKey = `${messageId}_${originalText}`;
        if (loadingTranslations.value.has(loadingKey)) {
            return new Promise((resolve) => {
                const checkCache = () => {
                    if (isCached(messageId, originalText)) {
                        resolve(getCachedTranslation(messageId, originalText));
                    } else {
                        setTimeout(checkCache, 100);
                    }
                };
                checkCache();
            });
        }
        
        loadingTranslations.value.add(loadingKey);

        try {
            const response = await $fetch(TRANSLATE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: originalText,
                    source: 'auto',
                    target: TARGET_LANGUAGE,
                })
            });

            if (response && response.translatedText) {
                const translation = response.translatedText;
                setCachedTranslation(messageId, originalText, translation);
                return translation;
            } else {
                throw new Error('Invalid response format');
            }

        } catch (error) {
            console.error('Translation failed:', error);
            setCachedTranslation(messageId, originalText, originalText);
            return originalText;

        } finally {
            loadingTranslations.value.delete(loadingKey);
        }
    };
    
    const isTranslating = (messageId, originalText) => {
        const loadingKey = `${messageId}_${originalText}`;
        return loadingTranslations.value.has(loadingKey);
    };

    const clearTranslationCache = () => {
        translationCache.value = {};
        console.log('Translation cache cleared');
    };

    const cleanupTranslationCache = () => {
        const now = Date.now();
        const cacheKeys = Object.keys(translationCache.value);
        let removedCount = 0;

        cacheKeys.forEach(key => {
            const entry = translationCache.value[key];
            if ((now - entry.timestamp) > TRANSLATION_CACHE_TTL) {
                delete translationCache.value[key];
                removedCount++;
            }
        });

        if (removedCount > 0) {
            console.log(`Cleaned up ${removedCount} expired translation cache entries`);
        }
    };
    
    const startCacheCleanup = () => {
        setInterval(cleanupTranslationCache, 60 * 60 * 1000);
    };

    return {
        translationCache: readonly(translationCache),
        loadingTranslations: readonly(loadingTranslations),
        translateText,
        isTranslating,
        isCached,
        getCachedTranslation,
        clearTranslationCache,
        cleanupTranslationCache,
        startCacheCleanup
    };
};