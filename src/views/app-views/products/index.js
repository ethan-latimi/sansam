import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const products = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${match.url}/default`} component={lazy(() => import(`./default`))} />
        <Route path={`${match.url}/category`} component={lazy(() => import(`./category`))} />
        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  );
};

export default products;
