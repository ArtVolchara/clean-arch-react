import { TFunction } from 'system/_shared/domain/types/utils';
import IUseCase from '../../Application/UseCase/IUseCase';

export interface TViewElementProps { 
  [key: string]: IUseCase | TViewElement<TViewElementProps> | TViewElements | Readonly<TViewElements>
  children?: TViewElements | Readonly<TViewElements>
}

export type TViewElementFactory<
  Props extends TViewElementProps,
  ReturnType extends TViewElement<Props, TViewElementFactory<Props, ReturnType>
 >
> = { (props: Props): TViewElement<Props, TViewElementFactory<Props,ReturnType>> }

export type TViewElement<
  Props extends TViewElementProps = TViewElementProps,
  Factory extends TFunction<[Props], TViewElement> = TFunction<[Props]>
> = any;

export type TViewElements = Array<TViewElement<TViewElementProps>>;
 