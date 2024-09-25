const getWeekNumber = (date: Date, startWeekDay: StartWeekDay = 'monday') => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const start = startWeekDay == 'monday' ? 1 : 2
    return Math.ceil(
        ((date.getTime() - firstDayOfYear.getTime()) / 86400000 + start) / 7
    )
}

const getDateInfo = (params?: CalendarParams): DayInfo => {
    const date = params?.date ?? new Date()
    const day = date.getDate()
    const dayOfWeek = date.getDay()
    const dayNameShort = date.toLocaleDateString(params?.locale, {
        weekday: 'short',
    })
    const dateToStr = `${date.getFullYear()}-${date.toLocaleDateString(
        params?.locale,
        { month: '2-digit' }
    )}-${date.toLocaleDateString(params?.locale, { day: '2-digit' })}`
    const dayName = date.toLocaleDateString(params?.locale, { weekday: 'long' })
    const monthNumber = date.getMonth() + 1
    const monthNameShort = date.toLocaleDateString(params?.locale, {
        month: 'short',
    })
    const monthNameLong = date.toLocaleDateString(params?.locale, {
        month: 'long',
    })
    const yearShort = date.toLocaleDateString(params?.locale, {
        year: '2-digit',
    })
    const yearFull = date.getFullYear()
    const weekNumber = getWeekNumber(date, params?.startWeekDay)

    return {
        date,
        dateToStr,
        day,
        dayOfWeek,
        dayNameShort,
        dayName,
        weekNumber,
        monthNumber,
        monthNameShort,
        monthNameLong,
        yearShort,
        yearFull,
    }
}

const getLastDayOfMonth = (date?: Date) => {
    const d = date ?? new Date()
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date?: Date) => {
    const d = date ?? new Date()
    return getDateInfo({ date: new Date(d.getFullYear(), d.getMonth(), 1) })
}

const getMonthInfo = (params?: CalendarParams) => {
    const d = params?.date ?? new Date()
    const dateInfo = getDateInfo({ date: d, ...params })
    const calendarMonth = []
    const lastDay = getLastDayOfMonth(dateInfo.date)

    for (let index = 1; index <= lastDay; index++) {
        calendarMonth.push(
            getDateInfo({
                ...params,
                date: new Date(
                    dateInfo.yearFull,
                    dateInfo.monthNumber - 1,
                    index
                ),
            })
        )
    }
    return calendarMonth
}

const groupForWeeksDay = (
    monthInfo: DayInfo[]
): { [key: string]: DayInfo[] } => {
    const groupByWeek: { [key: string]: DayInfo[] } = {}
    monthInfo.map((day) => {
        if (!(day.weekNumber in groupByWeek)) {
            groupByWeek[day.weekNumber] = []
        }
        groupByWeek[day.weekNumber].push(day)
    })
    return groupByWeek
}

const getDayNames = (dayNamesArr: string[], startDay: StartWeekDay) => {
    const dayNames: string[] = []
    if (startDay == 'sunday') {
        const lastDay = dayNamesArr.pop()
        dayNames.push(lastDay!)
        for (let index = 0; index < dayNamesArr.length; index++) {
            dayNames.push(dayNamesArr[index])
        }
    }

    return dayNames
}

const ucFirst = (str: string) => {
    return str[0].toUpperCase() + str.slice(1)
}

const getMonthNameFromDate = (date: Date, locale?: string) => {
    return ucFirst(date.toLocaleDateString(locale, { month: 'long' }))
}

export {
    getDateInfo,
    getLastDayOfMonth,
    getMonthInfo,
    getFirstDayOfMonth,
    groupForWeeksDay,
    getDayNames,
    getMonthNameFromDate,
}
