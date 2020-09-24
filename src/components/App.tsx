import * as React from "react";
import { HackerNews } from "./HackerNews";
import { Router } from "./Router";

export default function App() {
  return (
    <HackerNews>
      <Router />
    </HackerNews>
  );
}
