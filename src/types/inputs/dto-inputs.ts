type OpenAPISchema = {
  type: string;
  properties?: Record<string, any>;
  required?: string[];
};

type FormInput = {
  type: string;
  name: string;
  label: string;
  value: any;
  required?: boolean;
};

export function mapSchemaToFormInputs(schema: OpenAPISchema): FormInput[] {
  const fields: FormInput[] = [];
  const properties = schema.properties || {};
  const requiredFields = schema.required || [];

  for (const [key, prop] of Object.entries(properties)) {
    let inputType = 'text';
    let defaultValue: any = '';

    switch (prop.type) {
      case 'string':
        if (prop.format === 'binary') {
          inputType = 'file';
          defaultValue = null;
        } else {
          inputType = 'text';
        }
        break;

      case 'boolean':
        inputType = 'switch';
        defaultValue = false;
        break;

      case 'number':
      case 'integer':
        inputType = 'number';
        defaultValue = 0;
        break;

      case 'array':
        inputType = 'tags';
        defaultValue = [];
        break;

      case 'object':
        inputType = 'group';
        defaultValue = {};
        break;

      default:
        inputType = 'text';
    }

    fields.push({
      type: inputType,
      name: key,
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()), // "bankName" => "Bank Name"
      value: defaultValue,
      required: requiredFields.includes(key)
    });
  }

  return fields;
}
