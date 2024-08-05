export enum ENotificationVariants {
  default = 'default',
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}
export interface IMessageOptions { variant?: ENotificationVariants}
export interface INotificationMessage { message: string, options?: IMessageOptions }
