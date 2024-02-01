import CalendarComp from "./components/CalendarComp.vue";

export default {
  install: (app, options) => {
    app.component("VueBasicCal", CalendarComp);
  },
};
