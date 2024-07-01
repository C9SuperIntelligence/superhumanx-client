function isOlderThanDay(timestamp: number): boolean {
  return Date.now() - timestamp > 24 * 60 * 60 * 1000
}

export { isOlderThanDay }
