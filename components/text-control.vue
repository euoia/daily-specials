<template>
  <ds-box color="green">
    <ds-css-control
      :model-value="text"
      :label="label"
      :text="text"
      :type="isTextArea ? 'textarea' : undefined"
      is-grouped
      @input="$emit('update:text', $event.target.value)"
    />

    <ds-css-control
      :label="`${label} size`"
      :model-value="size"
      type="range"
      min="32"
      max="164"
      is-grouped
      @input="$emit('update:size', $event.target.valueAsNumber)"
    />

    <ds-css-control
      :label="`${label} line height`"
      :model-value="lineHeight"
      type="range"
      min="0.6"
      max="1.8"
      step="0.01"
      is-grouped
      @input="$emit('update:line-height', $event.target.valueAsNumber)"
    />
  </ds-box>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    lineHeight: {
      type: Number,
      required: true,
    },
    isTextArea: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:text", "update:size", "update:line-height"],
};
</script>
