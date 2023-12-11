import { ReactNode } from "react";
import { Route } from "react-router-dom";
import appRoutes from "./AppRoutes";
// import { RouteType } from "./config";
import React from "react";

const generateRoute = (routes): ReactNode => {
  return routes.map((route, index: number) => (
    route.index ? (
      <Route
        index
        path={route.path}
        element={route.element}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={route.element}
        key={index}
      >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )
  ));
};

export const routes: ReactNode = generateRoute(appRoutes);