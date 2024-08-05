import { observer } from 'mobx-react';
import { RouterProvider } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { TRoutesRendererDeps } from '../../../application/ports/output/presentationInterfaces/IRoutesRenderer';

const RoutesRendererView = observer((...[props]: TRoutesRendererDeps): ReactElement<typeof props, typeof RoutesRendererView> => {
  const { getNavigationServiceUseCase: getNavigationService } = props;
  const router = getNavigationService();
  const [appRouter, setAppRouter] = useState(router);
  useEffect(() => {
    setAppRouter(router);
  }, [router]);
  return appRouter && <RouterProvider router={router as RemixRouter} />;
});

export default RoutesRendererView;
