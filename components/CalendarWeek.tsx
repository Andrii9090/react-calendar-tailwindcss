import { FC, useMemo } from 'react'
import { EmptyCeil } from './EmptyCeil'
import { CalendarCeil } from './CalendarCeil'

type WeekProps = {
    week: DayInfo[]
    onClick?: (day: DayInfo) => void
}

export const CalendarWeek: FC<WeekProps> = ({ week, onClick }) => {
    const missingDay = useMemo(() => 7 - week.length, [week])

    const emptyCeil = []
    for (let index = 0; index < missingDay; index++) {
        emptyCeil.push(<EmptyCeil key={index} />)
    }

    return (
        <div className="flex w-full">
            {week[0].day == 1 && [...emptyCeil]}
            {week.map((item) => (
                <CalendarCeil onClick={onClick} key={item.day} day={item} />
            ))}
            {[28, 29, 30, 31].includes(week[week.length - 1].day) && [
                ...emptyCeil,
            ]}
        </div>
    )
}
