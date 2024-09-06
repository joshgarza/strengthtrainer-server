export const xorValidation = (field1: string, field2: string) => {
  return function (value: any) {
    const fieldValue1 = value[field1];
    const fieldValue2 = value[field2];

    if (fieldValue1 !== null) {
      return fieldValue2 === false;
    } else {
      return fieldValue2 !== false;
    }
  };
};

export const oneOfValidation = (fields: string[]) => {
  return function (value: any) {
    const count = fields.filter((field) => value[field] != null).length;
    return count === 1;
  };
};

export const minSuppliedValues = (minVal: number, fields: string[]) => {
  return function (value: any) {
    const count = fields.filter((field) => value[field] != null).length;
    return count >= minVal;
  };
};
