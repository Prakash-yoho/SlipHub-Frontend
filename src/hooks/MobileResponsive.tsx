import { useEffect, useState } from "react";

export const MobileResponsive = () => {
  const [MobileView, setMobileView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width:430px)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width:430px)");

    const handleSizeChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMobileView(event.matches);
    };

    // Add listener with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSizeChange);
    } else {
      // Fallback
      mediaQuery.addListener(handleSizeChange);
    }

    // Set initial
    setMobileView(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSizeChange);
      } else {
        mediaQuery.removeListener(handleSizeChange);
      }
    };
  }, []);

  return { MobileView };
};
