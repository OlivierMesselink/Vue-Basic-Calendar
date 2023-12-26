<template lang="eng">
    <div class="cal_wrapper">
        <div class="cal_cell" v-for="day in renderMonthGrid" :key="day" :class="day.classes">
            <p>{{day.date}}</p>
        </div>
    </div>
</template>
<script>
import { getDate, setDate, previousMonday, previousSunday, addDays, isPast, isToday, isFuture, isThisMonth } from "date-fns"

export default {
    data() {
        return {
            date_selector: new Date,
            config: {
                week_start: 'monday',
            }

        }
    },
    computed: {
        getToday() {
            return getDate(this.date_selector)
        },
        renderMonthGrid() {
            let current_date = this.date_selector;
            let first_month_day = setDate(current_date, 1);
            let grid_start_day = null;
            let month_grid = [];

            if (this.config.week_start === 'monday') {
                grid_start_day = previousMonday(first_month_day);
            } else if (this.config.week_start === 'sunday') {
                grid_start_day = previousSunday(first_month_day);
            } else {
                return "unknow argument: " + this.config.week_start + " , expected : 'monday'/'sunday' "
            }

            for (let i = 0; i < 35; i++) {
                let incr_date = addDays(grid_start_day, i);
                let day = {};

                day.full_date = incr_date;
                day.date = getDate(incr_date);
                day.classes = [];

                if (isPast(incr_date) && !isToday(incr_date)) { day.classes.push('past') }
                if (isToday(incr_date)) { day.classes.push('today') }
                if (isFuture(incr_date)) { day.classes.push('future') }
                if (!isThisMonth(incr_date)) { day.classes.push('other_month') }


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
    gap: 2px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(5, 1fr);
    font-family: sans-serif;
}

.cal_cell {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(231, 231, 231);
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
}

.cal_cell:hover {
    transition: ease-in-out 150ms;
    color: blue;
    border-color: blue;
    opacity: 1;
}

.today {
    border: blue 2px solid;
    background-color: rgba(0, 0, 255, 0.08);
    box-sizing: border-box;
    opacity: 1;
}

.past {
    opacity: .25;
}

.other_month {
    background-color: rgb(231, 231, 231);

}
</style>