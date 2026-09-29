import type {Example} from "../../types.ts";
import BasicCalendar from "./BasicCalendar.example.tsx";
import basicCalendarSource from "./BasicCalendar.example.tsx?raw";
import basicCalendarComponentSource from "./BasicCalendar.tsx?raw";
import DatePicker from "./DatePicker.example.tsx";
import datePickerSource from "./DatePicker.example.tsx?raw";
import datePickerComponentSource from "./DatePicker.tsx?raw";
import DateRangePicker from "./DateRangePicker.example.tsx";
import dateRangePickerSource from "./DateRangePicker.example.tsx?raw";
import dateRangePickerComponentSource from "./DateRangePicker.tsx?raw";
import EventCalendar from "./EventCalendar.example.tsx";
import eventCalendarSource from "./EventCalendar.example.tsx?raw";
import eventCalendarComponentSource from "./EventCalendar.tsx?raw";
import FromToDatePicker from "./FromToDatePicker.example.tsx";
import fromToDatePickerSource from "./FromToDatePicker.example.tsx?raw";
import fromToDatePickerComponentSource from "./FromToDatePicker.tsx?raw";

const examples: Example[] = [
    {
        id: "basic_calendar",
        title: "Basic calendar",
        description: "A month view with previous and next buttons. The current day is highlighted.",
        component: BasicCalendar,
        source: basicCalendarSource,
        files: [{name: "BasicCalendar.tsx", source: basicCalendarComponentSource}],
        minHeight: 420,
    },
    {
        id: "date_picker",
        title: "Date picker",
        description: "Click a date to select it. The selected date is highlighted and written out under the calendar.",
        component: DatePicker,
        source: datePickerSource,
        files: [{name: "DatePicker.tsx", source: datePickerComponentSource}],
        minHeight: 460,
    },
    {
        id: "date_range_picker",
        title: "Date range picker",
        description: "Click a start date and then an end date. Hovering previews the range before the second click.",
        component: DateRangePicker,
        source: dateRangePickerSource,
        files: [{name: "DateRangePicker.tsx", source: dateRangePickerComponentSource}],
        minHeight: 460,
    },
    {
        id: "calendar_with_events",
        title: "Calendar with events",
        description: "Event days get colored dots and a legend lists the month's events. Click a date to see its event label.",
        component: EventCalendar,
        source: eventCalendarSource,
        files: [{name: "EventCalendar.tsx", source: eventCalendarComponentSource}],
        minHeight: 480,
    },
    {
        id: "hotel_booking_picker",
        title: "From and to date picker",
        description: "Pick a start and end date from popup calendars with day, month and year views. The end date cannot fall before the start date.",
        component: FromToDatePicker,
        source: fromToDatePickerSource,
        files: [{name: "FromToDatePicker.tsx", source: fromToDatePickerComponentSource}],
        minHeight: 640,
    },
];

export default examples;
