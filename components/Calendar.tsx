import { FC, useCallback, useState } from 'react'
import {
    getMonthInfo,
    getMonthNameFromDate,
    groupForWeeksDay,
} from '../helpers/calendar'
import { CalendarWeek } from './CalendarWeek'

const initDayNamesArr = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

export const Calendar: FC<CalendarProps> = ({
    dateInit,
    startWeekDay,
    locale,
    onClick,
    dayNames = initDayNamesArr,
}) => {
    const [date, setDate] = useState<Date>(dateInit ?? new Date())
    const month = getMonthInfo({ date, startWeekDay, locale })
    const groupedForWeeks = groupForWeeksDay(month)

    const setNewDate = useCallback(
        (step: number) => {
            setDate(new Date(date.getFullYear(), date.getMonth() + step, 1))
        },
        [date]
    )

    return (
        <div className="flex flex-col w-full">
            <div className="flex">
                <button
                    className="border"
                    onClick={() => {
                        setNewDate(-1)
                    }}
                >
                    &#x276E;
                </button>
                <span className="text-gray-800">
                    {getMonthNameFromDate(date, locale)}, {date.getFullYear()}
                </span>
                <button className="border" onClick={() => setNewDate(1)}>
                    &#x276F;
                </button>
            </div>
            <div className="flex justify-around items-center bg-gray-200 text-orange-500">
                {dayNames.map((dayName) => (
                    <span key={dayName} className="text-xs font-bold">
                        {dayName}
                    </span>
                ))}
            </div>
            <div className="flex flex-col">
                {Object.keys(groupedForWeeks).map((weekNumber) => (
                    <div className="flex" key={weekNumber}>
                        <CalendarWeek
                            key={weekNumber}
                            onClick={onClick}
                            week={groupedForWeeks[weekNumber]}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
