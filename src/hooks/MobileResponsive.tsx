import { useEffect, useState } from "react"

export const MobileResponsive = () => {

  const [MobileView, setMobileView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width:430px)").matches
    }
    return false
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:430px)")

    const handlersize = (event: MediaQueryListEvent) => {
      setMobileView(event.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handlersize)
    } else {
      mediaQuery.addListener(handlersize)
    }

    setMobileView(mediaQuery.matches)
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handlersize)
      } else {
        mediaQuery.removeListener(handlersize)
      }
    };
  }, []);

  return { MobileView }
}