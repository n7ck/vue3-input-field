<template>
  <label :for="id" :class="['unis-field', classList]">
    <fieldset
      :class="`unis-input-${style}-${size}`"
      :data-state="inputState"
      :disabled="inputState === 'disabled' || inputState === 'readonly'"
    >
      <slot name="leading"></slot>
      <input
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :type="type"
        :class="{ 'unis-placeholder-label': placeholderAsLabel }"
        @blur="handleBlur"
        @input="handleInput"
      />
      <slot name="trailing"></slot>
    </fieldset>
    <label v-if="label" :for="id">{{ label }}</label>
    <span v-if="errors.length">{{ errors[0] }}</span>
  </label>
</template>

<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  validate: {
    type: Function as PropType<() => Promise<void>>,
    required: true
  },
  errors: {
    type: Array as PropType<string[]>,
    required: true
  },
  label: {
    type: String
  },
  modelValue: {
    type: String,
    required: true
  },
  classList: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => ['text', 'email', 'password', 'tel'].includes(value)
  },
  specialState: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'disabled', 'readonly'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  placeholderAsLabel: {
    type: Boolean,
    default: false
  },
  style: {
    type: String,
    default: 'filled',
    validator: (value: string) => ['filled', 'outlined', 'underlined'].includes(value)
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  }
})

const inputState = computed(() => {
  if (props.specialState === 'disabled' || props.specialState === 'readonly') {
    return props.specialState
  } else if (props.errors.length > 0) {
    return 'error'
  } else {
    return ''
  }
})
const isValidationInProgress = ref(false)

const validateField = async () => {
  isValidationInProgress.value = true
  try {
    await props.validate()
  } catch (error) {
    // Handle validation error
  } finally {
    isValidationInProgress.value = false
  }
}

const handleBlur = () => {
  validateField()
}

let debounceTimeout = null
const handleInput = (event) => {
  // 2 way data binding
  emit('update:modelValue', event.target.value)

  // Validate on input if the field is currently in error state
  if (props.errors.length) {
    validateField()
  }

  // Debounce implementation
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    validateField()
  }, 1000) // 1 second debounce
}

// Define the emit function for updating the value
const emit = defineEmits(['update:modelValue'])

// Cleanup the timeout when component is unmounted
onUnmounted(() => {
  clearTimeout(debounceTimeout)
})
</script>
