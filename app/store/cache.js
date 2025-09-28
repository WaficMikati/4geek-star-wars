const CACHE_KEY = 'swapi_cache'

function getCache() {
  if (typeof window === 'undefined') {
    return {}
  }
  
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    return cached ? JSON.parse(cached) : {}
  } catch (error) {
    console.warn('Failed to read from cache:', error)
    return {}
  }
}

function setCache(cache) {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch (error) {
    console.warn('Failed to save to cache:', error)
  }
}

export async function cachedFetch(url) {
  const cache = getCache()
  
  if (cache[url]) {
    return cache[url]
  }
  
  const response = await fetch(url)
  const data = await response.json()
  
  cache[url] = data
  setCache(cache)
  
  return data
}