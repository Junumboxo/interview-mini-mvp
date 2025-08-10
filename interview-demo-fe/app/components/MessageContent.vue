<template>
  <div>
    <div class="mb-2">{{ displayText }}</div>

    <button
        @click="toggleTranslation"
        :disabled="isTranslating(message.id, message.content)"
        class="text-xs text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all disabled:opacity-50"
    >
      <span v-if="isTranslating(message.id, message.content)" class="flex items-center">
        <svg class="animate-spin -ml-1 mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Translating...
      </span>
      <span v-else>
        {{ showTranslation ? 'Show original text' : 'Show translation' }}
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTranslation } from '~/composables/useTranslation.js';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

const { translateText, isTranslating } = useTranslation();
const showTranslation = ref(false);
const translatedText = ref('');

const displayText = computed(() => {
  return showTranslation.value && translatedText.value
      ? translatedText.value
      : props.message.content;
});

const toggleTranslation = async () => {
  if (showTranslation.value) {
    showTranslation.value = false;
  } else {
    if (!translatedText.value) {
      try {
        translatedText.value = await translateText(props.message.id, props.message.content);
      } catch (error) {
        console.error('Failed to translate message:', error);
        return;
      }
    }
    showTranslation.value = true;
  }
};
</script>