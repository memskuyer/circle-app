export interface FormField {
  field: FormFieldList[];
}

export interface FormFieldList {
  name: string;
  values: 'email' | 'password';
  type: string;
  placeholder: string;
}
