import { FieldInitData, FieldValue, FormFields } from '../types';
import { getValidationErrors } from '../utils/validation';

enum ActionTypes {
  UpdateValue = 0,
  UpdateFieldErrors,
  Initialize,
  UpdateErrors,
  Reset,
}

type UpdateValueAction = {
  type: ActionTypes.UpdateValue;
  payload: {
    name: string;
    value: FieldValue;
  };
};

type UpdateFieldErrorsAction = {
  type: ActionTypes.UpdateFieldErrors;
  payload: string;
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

type UpdateErrorsAction = {
  type: ActionTypes.UpdateErrors;
};

type Action =
  | UpdateValueAction
  | UpdateFieldErrorsAction
  | InitializeAction
  | ResetAction
  | UpdateErrorsAction;

export const updateValue = (
  name: string,
  value: FieldValue
): UpdateValueAction => ({
  type: ActionTypes.UpdateValue,
  payload: { name, value },
});

export const updateFieldErrors = (name: string): UpdateFieldErrorsAction => ({
  type: ActionTypes.UpdateFieldErrors,
  payload: name,
});

export const initialize = (
  name: string,
  { type, defaultValue, errors, rules, onReset }: FieldInitData
): InitializeAction => ({
  type: ActionTypes.Initialize,
  payload: { type, defaultValue, errors, name, rules, onReset },
});

export const updateErrors = (): UpdateErrorsAction => ({
  type: ActionTypes.UpdateErrors,
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

    case ActionTypes.UpdateFieldErrors: {
      const name = action.payload;
      const field = state[name] || {};

      return {
        ...state,
        [name]: {
          ...field,
          errors: getValidationErrors(field.value, field.rules),
        },
      };
    }

    case ActionTypes.UpdateErrors: {
      return Object.keys(state).reduce((memo: FormFields, current) => {
        const field = state[current];

        memo[current] = {
          ...field,
          errors: getValidationErrors(field.value, field.rules),
        };

        return memo;
      }, {});
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
