"use client";

import { FC } from "react";
import { Typography } from "./base/typography";

export const WIPBanner: FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "40px",
        backgroundColor: "black",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography component="h3">⚠️ WIP - Work in Progress ⚠️</Typography>
    </div>
  );
};
