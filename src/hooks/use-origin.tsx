import React, { useEffect, useState } from "react";

export const UseOrigin = () => {
  const [munted, setMunted] = useState(false);
  const origin =
    typeof window != "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMunted(true);
  }, []);

  if (!munted) {
    return "";
  }
  return origin;
};
