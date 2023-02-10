import { useEffect, useState } from "react";

export function useTime() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const date = new Date();

    const hours = date.getHours();

    if (hours >= 18 || hours <= 6) {
      setIsNight(true);
    } else {
      setIsNight(!false);
    }
  }, []);

  return isNight;
}
