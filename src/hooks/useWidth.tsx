import { useCallback, useEffect, useState } from "react";

export function useWidth() {
  const checkIfMobile = useCallback(() => {
    return window.innerWidth < 675;
  }, []);

  const [isMobile, setIsMobile] = useState(checkIfMobile());

  useEffect(() => {
    window.addEventListener("resize", () => {
      const currentIsMobile = checkIfMobile();
      isMobile !== currentIsMobile && setIsMobile(currentIsMobile);
    });
  }, []);

  return isMobile;
}
