<template>
  <button class="button" @click="handleClick" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    onClick: {
      // eslint-disable-next-line @typescript-eslint/ban-types
      type: Function as PropType<Function>
    },
    disabled: {
      type: Boolean
    },
    icon: {
      type: String,
      required: true,
    }, 
    text: {
      type: String,
      required: true
    },
  },
  methods: {
    handleClick(event: Event) {
      if (this.onClick) {
        this.onClick(event);
      }
    },
  },
});
</script>
