<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
  .loader {
    margin: auto;
    border: 5px solid #ffffffaa; /* Light grey */
    border-top: 5px solid #c08bff; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>