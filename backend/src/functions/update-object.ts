export function updateObject<T>(config: T, defaultData: T): T {
  const updatedConfig = config;
  for (const key in defaultData) {
    if (typeof defaultData[key] === "object" && defaultData[key] !== null) {
      if (!config[key]) {
        updatedConfig[key] = {} as T[Extract<keyof T, string>];
      }
      updateObject(config[key], defaultData[key]);
    } else {
      if (!config[key]) {
        updatedConfig[key] = defaultData[key];
      }
    }
  }

  return updatedConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToArray<T extends Record<string, any>>(
  obj: T
): Record<string, unknown> {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  return Object.entries(obj).reduce(
    (acc: Record<string, unknown>, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.map(objectToArray);
      } else if (typeof value === "object" && value !== null) {
        acc[key] = [objectToArray(value)];
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {}
  );
}