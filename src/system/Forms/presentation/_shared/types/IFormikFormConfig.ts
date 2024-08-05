import * as React from 'react';

import {
  FormikConfig,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikTouched
} from 'formik/dist/types';

export interface IFormikFormConfig<Values extends Record<string, any>> extends FormikConfig<Values> {
  children?: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
  initialValues: Values;
  initialStatus?: any;
  /** Initial object map of field names to specific error for that field */
  initialErrors?: FormikErrors<Values>;
  /** Initial object map of field names to whether the field has been touched */
  initialTouched?: FormikTouched<Values>;
  validate?: (values: Values) => Record<keyof Values, string>
  onReset?: (values: Values, formikHelpers: FormikHelpers<Values>) => void;
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;
  innerRef?: React.Ref<FormikProps<Values>>;
}
