import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import * as React from "react";
import { TopStories } from "./TopStories";
import { Story } from "./Story";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/top">
        <TopStories />
      </Route>
      <Route path="/item/:id">
        <Story />
      </Route>
    </Switch>
  </BrowserRouter>
);
