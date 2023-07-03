"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const Modalprovider = () => {
  const [isMountend, setIsMountend] = useState(false);

  useEffect(() => {
    setIsMountend(true);
  }, []);

  if (!isMountend) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
};
