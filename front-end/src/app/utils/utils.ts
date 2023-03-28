export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}
