type CalendarParams = {
    locale?: string
    date?: Date
    startWeekDay?: StartWeekDay
}

type CalendarProps = {
    dateInit?: Date
    locale?: string
    startWeekDay?: StartWeekDay
    dayNames?: string[]
    onClick?: (day: DayInfo) => void
}

type StartWeekDay = 'monday' | 'sunday'

type DayTitle = { [key: string]: string }

type CalendarParams = {
    locale?: string
    date?: Date
    startWeekDay?: StartWeekDay
}
type DayInfo = {
    date: Date
    day: number
    dateToStr: string
    dayOfWeek: number
    dayNameShort: string
    dayName: string
    monthNumber: number
    weekNumber: number
    monthNameShort: string
    monthNameLong: string
    yearShort: string
    yearFull: number
}