<template>
  <div class="ds-box" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
      validator: (value) => ["red", "green", "blue"].includes(value),
    },
  },
  computed: {
    style() {
      return {
        backgroundColor: `var(--${this.color})`,
      };
    },
  },
};
</script>

<style>
.ds-box {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background-color: #f9fff7;
}
</style>
