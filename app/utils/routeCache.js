const cache = new Map()

export function setRouteData(key, data) {
  cache.set(key, data)
}

export function getRouteData(key) {
  return cache.get(key)
}

export function hasRouteData(key) {
  return cache.has(key)
}