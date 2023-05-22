// создает дату, используя компоненты в местной временной зоне

export const dateTime = (date: string, time: string) => {
  return new Date(`${date}T${time}`)
  // const b = a.getTimezoneOffset() * 60 * 1000 // смещение на таймзону
  // console.log(a.getTime() + b) // таймстемп со смещением но надо проверять
}

export const timestampParse = (timestamp: number) => {
  const dateTime = new Date(timestamp).toISOString().split('T')
  const date = dateTime[0]
  const time = dateTime[1].slice(0, 5)

  return [date, time]
}
