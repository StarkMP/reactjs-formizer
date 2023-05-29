import { FieldError, FieldInitData, FieldValue, FormFields } from '../types';
import { getValidationErrors } from '../utils/validation';

enum ActionTypes {
  UpdateValue = 0,
  UpdateErrors,
  Initialize,
  Reset,
}

type UpdateValueAction = {
  type: ActionTypes.UpdateValue;
  payload: {
    name: string;
    value: FieldValue;
  };
};

type UpdateErrorsAction = {
  type: ActionTypes.UpdateErrors;
  payload: {
    name: string;
    errors: FieldError[];
  };
};

type InitializeAction = {
  type: ActionTypes.Initialize;
  payload: {
    name: string;
  } & FieldInitData;
};

type ResetAction = {
  type: ActionTypes.Reset;
};

type Action =
  | UpdateValueAction
  | UpdateErrorsAction
  | InitializeAction
  | ResetAction;

export const updateValue = (
  name: string,
  value: FieldValue
): UpdateValueAction => ({
  type: ActionTypes.UpdateValue,
  payload: { name, value },
});

export const updateErrors = (
  name: string,
  errors: FieldError[]
): UpdateErrorsAction => ({
  type: ActionTypes.UpdateErrors,
  payload: { name, errors },
});

export const initialize = (
  name: string,
  { type, defaultValue, errors, rules, onReset }: FieldInitData
): InitializeAction => ({
  type: ActionTypes.Initialize,
  payload: { type, defaultValue, errors, name, rules, onReset },
});

export const reset = (): ResetAction => ({
  type: ActionTypes.Reset,
});

export const fieldsReducer = (
  state: FormFields,
  action: Action
): FormFields => {
  switch (action.type) {
    case ActionTypes.UpdateValue: {
      const { name, value } = action.payload;
      const field = state[name] || {};

      return {
        ...state,
        [name]: {
          ...field,
          value,
          errors: getValidationErrors(value, field.rules),
        },
      };
    }

    case ActionTypes.UpdateErrors: {
      const { name, errors } = action.payload;
      const field = state[name] || {};

      return { ...state, [name]: { ...field, errors } };
    }

    case ActionTypes.Reset: {
      return Object.keys(state).reduce((memo: FormFields, current) => {
        const field = state[current];

        if (field.onReset) {
          field.onReset();
        }

        memo[current] = { ...field, value: field.defaultValue, errors: [] };

        return memo;
      }, {});
    }

    case ActionTypes.Initialize: {
      const { name, type, errors = [], onReset } = action.payload;
      let { rules = {}, defaultValue } = action.payload;

      // this part is important because
      // radio field has few input elements
      // then we need to handle some params of these inputs
      if (type === 'radio') {
        const radioField = state[name];

        if (radioField) {
          if (radioField.rules && Object.keys(radioField.rules).length > 0) {
            rules = radioField.rules;
          }

          if (radioField.defaultValue) {
            defaultValue = radioField.defaultValue;
          }
        }
      }

      return {
        ...state,
        [name]: {
          type,
          errors,
          value: defaultValue,
          rules,
          defaultValue,
          onReset,
        },
      };
    }

    default:
      return state;
  }
};
