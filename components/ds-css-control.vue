<template>
  <component :is="isGrouped ? 'div' : 'ds-box'" color="green">
    <div class="field">
      <label class="label">{{ label }}</label>
      <input
        v-if="type === 'text'"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <textarea
        v-if="type === 'textarea'"
        :value="modelValue"
        :rows="3"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <div v-if="type === 'range'" class="range">
        <input
          :value="modelValue"
          type="range"
          v-bind="$attrs"
          @input="$emit('update:modelValue', $event.target.valueAsNumber)"
        />
        {{ modelValue }}
      </div>
    </div>
  </component>
</template>

<script>
import DSBox from "./ds-box.vue";
export default {
  components: {
    DSBox,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: "text",
      validator: (value) => ["text", "textarea", "range"].includes(value),
    },
    isGrouped: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25em;

  &:has(.ds-box) {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0.5rem;
  }

  input,
  textarea {
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    width: 100%;
  }

  input[type="range"] {
    width: 90%;
  }

  .range {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
