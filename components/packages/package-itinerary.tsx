import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PackageItineraryItem } from "@/lib/data/packages"

export function PackageItinerary({ itinerary }: { itinerary: PackageItineraryItem[] }) {
  return (
    <div className="relative space-y-6 md:space-y-8 before:absolute before:inset-0 before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-primary/20 sm:before:ml-8 md:before:ml-10 lg:before:ml-12">
      {itinerary.map((item) => {
        const stay = item.stay
        return (
          <div key={`${item.day}-${item.title}`} className="relative flex gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg">
              <div className="text-center">
                <div className="text-[10px] sm:text-xs font-semibold text-primary-foreground opacity-80 md:text-sm">Day</div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-foreground">
                  {item.day}
                </div>
              </div>
            </div>

            <div className="flex-1 pb-4 md:pb-8">
              <Card className="border-2 border-primary/10 bg-background/80 backdrop-blur shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/30">
                <CardHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4">
                  <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                  <CardDescription className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </CardDescription>

                  {(item.meals || stay) && (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 pt-3 border-t border-border/50">
                      {item.meals && (
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:px-4">
                          <span className="text-lg sm:text-2xl">🍽️</span>
                          <div>
                            <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Meals
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-foreground">{item.meals}</div>
                          </div>
                        </div>
                      )}
                      {stay && (
                        <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 sm:px-4">
                          <span className="text-lg sm:text-2xl">🏨</span>
                          <div>
                            <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Stay
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-foreground">{stay}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )
      })}
    </div>
  )
}
