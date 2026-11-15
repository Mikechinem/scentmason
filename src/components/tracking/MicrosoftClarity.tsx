"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityTracking() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    if (projectId) {
      Clarity.init(projectId);
    }
  }, []);

  return null;
}
