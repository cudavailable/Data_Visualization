<!-- src/components/PageLayout.vue -->
<template>
    <div class="page-layout">
      <div class="nav-padding"></div>
      <div class="page-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <style scoped>
  .page-layout {
    min-height: 100vh;
    width: 100%;
  }
  
  .nav-padding {
    height: 10vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .page-content {
    height: 90vh;
    width: 100%;
  }
  </style>