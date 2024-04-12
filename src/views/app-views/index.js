import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboards`} component={lazy(() => import(`./dashboards`))} />
        <Route path={`${APP_PREFIX_PATH}/sales`} component={lazy(() => import(`./sales`))} />
        <Route path={`${APP_PREFIX_PATH}/customers`} component={lazy(() => import(`./customers`))} />
        <Route path={`${APP_PREFIX_PATH}/products`} component={lazy(() => import(`./products`))} />
        <Route path={`${APP_PREFIX_PATH}/events`} component={lazy(() => import(`./events`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboards`} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
