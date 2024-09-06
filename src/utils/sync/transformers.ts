export const castNullToZero = (value: any, originalValue: any) => (originalValue === null ? 0 : value);

export const castValueToNull = (value: any, originalValue: any) => (originalValue !== null ? null : value);
