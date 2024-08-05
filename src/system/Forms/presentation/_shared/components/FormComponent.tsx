import React from 'react';

import { Form, Formik } from 'formik';
import { FormikProps } from 'formik/dist/types';
import { IFormikFormConfig } from '../types/IFormikFormConfig';
import FormStyle from "../styles/FormStyle";

function FormComponent<Values>(props:IFormikFormConfig<Values>) {
  const { children } = props;
  const formProps = { ...props };
  const styles = FormStyle;
  return (
    <Formik {...formProps} enableReinitialize>
      {(formikProps) => (
        <Form style={styles.form}>
          {typeof children === 'function' ? children(formikProps as FormikProps<Values>) : children}
        </Form>
      )}
    </Formik>
  );
}
export default FormComponent;
