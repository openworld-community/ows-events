// создает дату, используя компоненты в местной временной зоне

export const dateTime = (date: string, time: string, timezone: string) => {
  return new Date(`${date} ${time} ${timezone}`)
}

export const timestampParse = (
  timestamp: number,
  timezone: { timezoneName: string; timezoneOffset: string } | undefined
) => {
  const date = new Date(timestamp)
    .toLocaleString('ru-RU', {
      timeZone: timezone?.timezoneName,
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
    .split('.')
    .reverse()
    .join('-')

  const time = new Date(timestamp).toLocaleString('ru-RU', {
    timeZone: timezone?.timezoneName,
    hour: '2-digit',
    minute: '2-digit'
  })

  return [date, time]
}
