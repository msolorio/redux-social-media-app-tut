import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const getTimeAgoStr = (timestamp: string) => {
  if (!timestamp) return '';

  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  return `${timePeriod} ago`
}

export const TimeAgo = ({ timestamp }: any) => {
  return (
    <span title={timestamp}>
      &nbsp; <i>{getTimeAgoStr(timestamp)}</i>
    </span>
  )
}
