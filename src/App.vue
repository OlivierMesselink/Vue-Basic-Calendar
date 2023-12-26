<template>
  <div class="div_wrapper">
    <calendar-vue></calendar-vue>
  </div>
</template>

<script>
import CalendarVue from './components/CalendarComp.vue';
export default {
  components: {
    CalendarVue
  }
}
</script>

<style>
.div_wrapper {
  height: 600px;
  width: 450px;
}
</style>
