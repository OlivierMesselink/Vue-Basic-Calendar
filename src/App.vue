<template>
  <div class="div_wrapper">
    <calendar-vue :date_selector="date" :config="cal_config"></calendar-vue>
  </div>
</template>

<script>
import CalendarVue from './components/CalendarComp.vue';
export default {
  data() {
    return {
      date: new Date,
      cal_config: {
        week_start: 'monday'
      }
    }
  },
  components: {
    CalendarVue
  }
}
</script>

<style>
.div_wrapper {
  height: 80vh;
  width: 100%;
}
</style>
