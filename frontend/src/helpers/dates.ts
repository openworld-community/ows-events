// создает дату, используя компоненты в местной временной зоне
export const dateTime = (date: string, time: string) => {
    return new Date(`${date}T${time}`)
}