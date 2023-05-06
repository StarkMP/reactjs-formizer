import {
  FieldError,
  FieldInitParams,
  FieldResetHandler,
  FieldRules,
  FieldValue,
  FormFields,
} from '../types';

enum ActionTypes {
  UpdateValue = 0,
  UpdateErrors,
  Initialize,
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
    rules: FieldRules;
    reset: FieldResetHandler;
  };
};

type Action = UpdateValueAction | UpdateErrorsAction | InitializeAction;

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
  { rules, reset }: FieldInitParams
): InitializeAction => ({
  type: ActionTypes.Initialize,
  payload: { name, rules, reset },
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

    case ActionTypes.Initialize: {
      const { name, rules, reset } = action.payload;
      const field = state[name] || {};
      const newField = { ...field };

      // TODO: refactor
      // hack for 'radio' input type
      if (field.reset) {
        const fn = field.reset.bind({});

        newField.reset = (): void => {
          fn();
          reset();
        };
      } else {
        newField.reset = reset;
      }

      if (!field.rules) {
        newField.rules = rules;
      } else {
        newField.rules = field.rules;
      }

      return { ...state, [name]: newField };

      // return { ...state, [name]: { ...field, rules, reset } };
    }

    default:
      return state;
  }
};
