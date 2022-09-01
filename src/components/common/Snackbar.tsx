import { Alert, Snackbar } from '@mui/material';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';

enum SnackbarSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface SnackbarState {
  isOpen: boolean;
  message: string;
  severity: SnackbarSeverity | undefined;
  displaySnackbar: (input: DisplaySnackbarInput) => void;
}

enum SnackbarActionType {
  CLOSE,
  OPEN,
}

interface DisplaySnackbarInput {
  message: string;
  severity: SnackbarSeverity;
}

type SnackbarAction =
  | {
      actionType: SnackbarActionType.CLOSE;
    }
  | ({
      actionType: SnackbarActionType.OPEN;
    } & DisplaySnackbarInput);

const initialState: SnackbarState = {
  isOpen: false,
  message: '',
  severity: undefined,
  displaySnackbar: () => {
    // Intentionally empty; perform no-op
  },
};

const SnackbarContext = createContext<SnackbarState>(initialState);

const snackbarReducer = (
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.actionType) {
    case SnackbarActionType.OPEN: {
      return {
        ...state,
        isOpen: true,
        message: action.message,
        severity: action.severity,
      };
    }
    case SnackbarActionType.CLOSE: {
      return {
        ...state,
        isOpen: false,
        message: '',
        severity: undefined,
      };
    }
  }
  return state;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = (props: SnackbarProviderProps) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const onClose = useCallback(() => {
    dispatch({ actionType: SnackbarActionType.CLOSE });
  }, [dispatch]);

  const displaySnackbar = useCallback(
    (input: DisplaySnackbarInput) => {
      dispatch({ actionType: SnackbarActionType.OPEN, ...input });
    },
    [dispatch]
  );

  return (
    <SnackbarContext.Provider value={{ ...state, displaySnackbar }}>
      {props.children}
      <Snackbar open={state.isOpen} onClose={onClose} autoHideDuration={6000}>
        <Alert onClose={onClose} severity={state.severity}>
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  return context;
};

export { SnackbarProvider, useSnackbar, SnackbarSeverity };
