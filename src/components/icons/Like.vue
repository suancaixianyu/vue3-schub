<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    class="glyphicon"
    fill="none"
  >
    <path
      d="M24.926 16.496a2.389 2.389 0 00-2.27-3.137l-4.61.002.1-.754c.275-2.09.178-3.497-.292-4.17-.417-.596-1.085-1-1.642-1.047-.767-.065-1.282.248-1.454.908-.077.297-.57 1.56-1.002 2.47-.797 1.68-1.45 2.59-2.313 2.59-.56 0-1.446 0-2.66.003a.744.744 0 00-.744.743v9.534c0 .41.333.744.744.744h11.985c.94 0 1.772-.61 2.057-1.515l2.1-6.37z"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linejoin="round"
    />
    <path d="M11.553 24.618V13.503" stroke="currentColor" stroke-width="1.7" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'LikeIcon',
  props: {
    size: { type: Number, default: 32 },
  },
}
</script>
