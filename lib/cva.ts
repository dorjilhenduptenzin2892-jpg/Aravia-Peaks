// Simple CVA (Class Variance Authority) mock for components that use it
// This replaces the external library that isn't loading in v0 preview

export function cva(base?: string | string[], config?: any) {
  return (props?: any) => {
    let classes = base ? (Array.isArray(base) ? base.join(" ") : base) : ""

    if (config?.variants && props) {
      Object.entries(config.variants).forEach(([key, variants]: [string, any]) => {
        const variant = props[key]
        if (variant && variants[variant]) {
          classes += " " + variants[variant]
        }
      })
    }

    if (config?.compoundVariants && props) {
      config.compoundVariants.forEach((compound: any) => {
        const matches = Object.entries(compound).every(([key, value]) => {
          if (key === "class") return true
          return props[key] === value
        })
        if (matches) {
          classes += " " + compound.class
        }
      })
    }

    if (config?.defaultVariants) {
      Object.entries(config.defaultVariants).forEach(([key, value]: [string, any]) => {
        if (!props || !(key in props)) {
          const variants = config.variants[key]
          if (variants && variants[value]) {
            classes += " " + variants[value]
          }
        }
      })
    }

    return classes.trim()
  }
}

export type VariantProps<T> = T extends (props?: infer P) => any ? P : never
