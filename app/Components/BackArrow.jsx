"use client";

import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackArrow() {
  const router = useRouter();
  return (
    <Link href="/">
      <ArrowBackIcon className="rounded-full bg-btn-primary text-white w-8 h-8" />
    </Link>
  );
}
