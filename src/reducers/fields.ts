import { FieldError, FieldRules, FieldValue, FormFields } from '../types';

enum ActionTypes {
  UpdateValue = 0,
  UpdateErrors,
  InitRules,
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

type InitRulesAction = {
  type: ActionTypes.InitRules;
  payload: {
    name: string;
    rules: FieldRules;
  };
};

type Action = UpdateValueAction | UpdateErrorsAction | InitRulesAction;

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

export const initRules = (
  name: string,
  rules: FieldRules
): InitRulesAction => ({
  type: ActionTypes.InitRules,
  payload: { name, rules },
});

export const fieldsReducer = (
  state: FormFields,
  action: Action
): FormFields => {
  switch (action.type) {
    case ActionTypes.UpdateValue: {
      const { name, value } = action.payload;
      const field = state[name] || {};

      return { ...state, [name]: { ...field, value } };
    }

    case ActionTypes.UpdateErrors: {
      const { name, errors } = action.payload;
      const field = state[name] || {};

      return { ...state, [name]: { ...field, errors } };
    }

    case ActionTypes.InitRules: {
      const { name, rules } = action.payload;
      const field = state[name] || {};

      return { ...state, [name]: { ...field, rules } };
    }

    default:
      return state;
  }
};
