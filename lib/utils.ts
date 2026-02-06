type ClassValue = string | number | boolean | undefined | null | ClassValue[]

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input))
    } else if (Array.isArray(input)) {
      const result = clsx(...input)
      if (result) classes.push(result)
    } else if (typeof input === "object") {
      for (const key in input) {
        if ((input as any)[key]) classes.push(key)
      }
    }
  }

  return classes.join(" ")
}

function twMerge(...classLists: string[]): string {
  const classes = classLists.join(" ").split(" ").filter(Boolean)
  const classMap = new Map<string, string>()

  for (const cls of classes) {
    const prefix = cls.split("-")[0]
    classMap.set(prefix, cls)
  }

  return Array.from(classMap.values()).join(" ")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
