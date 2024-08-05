import React, { FunctionComponent, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import IViewRendererAdapter, { TViewRendererAdapterFactoryDeps } from "system/Rendering/application/ports/output/adaptersInterfaces/IViewRendererAdapter";
import { TViewElementProps } from "system/_shared/domain/entities/Presentation/ViewElement/TViewElement";


class ViewRendererAdapterConstructor implements IViewRendererAdapter<ReactElement<TViewElementProps, FunctionComponent<TViewElementProps>>> {
    constructor(...deps:TViewRendererAdapterFactoryDeps) {

  }
  createViewElement = <
    const Factory extends FunctionComponent<Props>,
    const Props extends TViewElementProps,
  >(
    factory: Factory,
    props: Props,
) => React.createElement<Props>(factory, { ...props, key: factory.name }) as ReturnType<Factory>


  render = (container, views) => {
    const root = createRoot(container);
    root.render(views);
  }
}

export default ViewRendererAdapterConstructor;
