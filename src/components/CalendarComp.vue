<template>
    <div class="cal_wrapper">
        <div class="cal_cell" v-for="day in generateMonthGrid" :key="day" :class="day.classes"
            @click="createEvent(day.full_date)">
            <p>{{ day.date }}</p>
            <div v-for="event in day.events" :key="event" class="event" :class="event.classes">{{ event.description }}</div>
        </div>
    </div>
</template>

<script>
import { getDate, setDate, previousMonday, previousSunday, addDays, isPast, isToday, isFuture, isThisMonth, isSameDay, isMonday, isSunday } from "date-fns"


export default {
    props: {
        date_selector: {
            required: true
        },
        config: {
            type: Object,
            required: true,
        },
        events: {
            type: Array,
            required: false
        }
    },
    methods: {

    },
    computed: {
        // Generates an array of 35 day-cells starting at the last monday/sunday relative to the 1st of the month
        generateMonthGrid() {
            let current_date = this.date_selector;
            let first_month_day = setDate(current_date, 1);
            let grid_start_day = null;
            let month_grid = [];

            // Getting first day of week from config and then getting the previous monday/sunday to start the grid
            if (this.config.week_start === 'monday') {
                if (!isMonday(first_month_day)) {
                    grid_start_day = previousMonday(first_month_day);
                } else {
                    grid_start_day = first_month_day
                }
            } else if (this.config.week_start === 'sunday') {
                if (!isSunday(first_month_day)) {
                    grid_start_day = previousSunday(first_month_day);
                } else {
                    grid_start_day = first_month_day
                }
            } else {
                console.log("unknow argument: " + this.config.week_start + " , expected : 'monday' or 'sunday' ")
            }

            // Looping trough the cells and incrementing the date
            for (let i = 0; i < 35; i++) {
                let incr_date = addDays(grid_start_day, i);
                let day = {};

                day.full_date = incr_date;
                day.date = getDate(incr_date);
                day.events = [];

                // Adds classes to the cells, to differentiate between past, present, last month etc..
                day.classes = [];

                if (isPast(incr_date) && !isToday(incr_date)) { day.classes.push('past') }
                if (isToday(incr_date)) { day.classes.push('today') }
                if (isFuture(incr_date)) { day.classes.push('future') }
                if (!isThisMonth(incr_date)) { day.classes.push('other_month') }


                if (this.events) {
                    this.events.forEach(event => {
                        if (isSameDay(event.date, day.full_date)) { day.events.push(event) }
                    })

                }

                month_grid.push(day);
            }

            return month_grid;
        }
    },

}
</script>

<style scoped lang="css">
.cal_wrapper {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    font-family: sans-serif;
    border: 1px solid rgb(231, 231, 231);
    border-width: 0 0 1px 1px;
}

.cal_cell {
    width: 100%;
    height: 100%;
    border-top: 1px solid rgb(231, 231, 231);
    border-right: 1px solid rgb(231, 231, 231);
    padding: 12px 4px;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
}

.cal_cell:hover {
    transition: ease-in-out 150ms;
    background-color: rgba(0, 0, 255, 0.08);
    opacity: 1;
}

.today {
    border: blue 1px solid;
    background-color: rgba(0, 0, 255, 0.08);
    box-sizing: border-box;
    opacity: 1;
}

.today p {
    font-weight: bold;
}

.past {
    opacity: .4;
}

.event {
    font-size: 12px;
    background-color: blue;
    padding: 4px 1px;
    color: white;
    margin-top: 8px;
}
</style>