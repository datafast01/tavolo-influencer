<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon
        icon="mdi-heart-outline"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href="https://tavolo.ai"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Tavolo</a>
    </span>
  </div>
</template>
