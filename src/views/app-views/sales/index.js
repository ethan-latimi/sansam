import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const sales = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${match.url}/default`} component={lazy(() => import(`./default`))} />
        <Route path={`${match.url}/create`} component={lazy(() => import(`./create`))} />
        <Route path={`${match.url}/select`} component={lazy(() => import(`./create/selectProduct`))} />
        <Route path={`${match.url}/edit`} component={lazy(() => import(`./create/editOrder`))} />
        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  );
};

export default sales;
