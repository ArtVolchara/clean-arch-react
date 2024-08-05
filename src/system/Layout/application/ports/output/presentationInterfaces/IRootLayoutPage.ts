import { TViewElement, TViewElements } from '../../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';


export interface IRootLayoutPageProps<Children extends TViewElements = TViewElements> {
  children?: Children | Readonly<Children>
}
export type TRootLayoutPageDeps<Children extends TViewElements = TViewElements> = [props: IRootLayoutPageProps<Children>];


export const RootLayoutPageToken = 'rootLayoutPage' as const;
export type TRootLayoutPage<Props extends IRootLayoutPageProps<TViewElements> = IRootLayoutPageProps>  = TViewElement<Props>;
