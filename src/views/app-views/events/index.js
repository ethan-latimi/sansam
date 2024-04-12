import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const farms = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${match.url}/farms`} component={lazy(() => import(`./farm`))} />
        <Route path={`${match.url}/farm/create`} component={lazy(() => import(`./create`))} />
        <Route path={`${match.url}/farm/:id`} component={lazy(() => import(`./diary`))} />
        <Route path={`${match.url}/invoice`} component={lazy(() => import(`./invoice`))} />
        <Redirect from={`${match.url}`} to={`${match.url}/farms`} />
      </Switch>
    </Suspense>
  );
};

export default farms;
