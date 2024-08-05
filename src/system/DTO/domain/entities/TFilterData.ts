export type TFiltrationCriteriaValue = string | number | Array<any>;
export type TFilterData<Schema extends object> = { [Key in keyof Schema]?: Schema[Key] extends object ? TFilterData<Schema[Key]> : TFiltrationCriteriaValue };
