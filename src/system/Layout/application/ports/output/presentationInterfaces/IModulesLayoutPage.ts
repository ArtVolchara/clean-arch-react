import { ITranslateMessageUseCase } from '../../../../../Internalization/application/ports/input/ITranslateMessageUseCase';
import { TViewElement, TViewElements, TViewElementProps } from '../../../../../_shared/domain/entities/Presentation/ViewElement/TViewElement';

export interface IModulesLayoutPageProps<Children extends TViewElements = TViewElements> {
  translateMessageUseCase: ITranslateMessageUseCase,
  primaryControls?: TViewElements,
  endControls?: TViewElements,
  children?: Children | Readonly<Children>,
}
export type TModulesLayoutPageDeps<Children extends TViewElements = TViewElements> = [IModulesLayoutPageProps<Children>];

export const ModulesLayoutPageToken = 'modulesLayoutPage' as const;
export type TModulesLayoutPage<Props extends IModulesLayoutPageProps<TViewElements> = IModulesLayoutPageProps> = TViewElement<Props>;
