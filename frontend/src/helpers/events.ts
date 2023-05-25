export const localUserEventsKey = 'USER_POSTS'
export function getUserEvents() {
  return parseJSON<string[]>(localStorage.getItem(localUserEventsKey) ?? '[]', [])
}

export function addUserEvent(id: string) {
  const oldUsersPosts = getUserEvents()
  oldUsersPosts.push(id)
  localStorage.setItem(localUserEventsKey, JSON.stringify(oldUsersPosts))
}

/**
 * Необходимо указать дженерик для возвращаемого типа.
 * @param string значение, которое нужно пропарсить
 * @param fallback значение на случай, если парсинг выдаст ошибку
 * @returns пропаршенный json того типа, который указан в дженерике
 */
function parseJSON<T>(string: string, fallback?: T) {
  try {
    return JSON.parse(string) as T
  } catch (e) {
    if (fallback !== undefined) {
      console.error('Error while parsing JSON\n' + e)
      return fallback
    }
    console.log('Error while parsing JSON')
    throw e
  }
}
