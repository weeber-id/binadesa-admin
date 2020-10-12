import * as React from 'react';
type Action = { type: 'SET_USER'; state: State } | { type: 'DELETE_USER' };
type Dispatch = (action: Action) => void;
type State = { id: string; level: string; name: string };
type UserProviderProps = { children: React.ReactNode };
const UserStateContext = React.createContext<State | undefined>(undefined);
const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);
function userReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_USER': {
      return { ...action.state };
    }
    case 'DELETE_USER': {
      return { id: '', level: '', name: '' };
    }
    default: {
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(userReducer, {
    id: '',
    level: '',
    name: '',
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}
function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}
function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}
export { UserProvider, useUserState, useUserDispatch };
