import { FC } from 'react'

type Props = {
    onClick?: (dayInfo: DayInfo) => void
    day: DayInfo
}

export const CalendarCeil: FC<Props> = ({ onClick, day }) => {
    return (
        <div
            className={`relative flex flex-col flex-1 h-16 border justify-center items-center p-1 transition-colors hover:cursor-pointer hover:bg-gray-100 ${
                day.dayOfWeek == 6 ? 'text-orange-500' : ''
            } ${day.dayOfWeek == 0 ? 'text-red-500' : ''}`}
            onClick={() => {
                if (onClick) onClick(day)
            }}
        >
            <span className="text-md font-bold">{day.day}</span>
        </div>
    )
}
