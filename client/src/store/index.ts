import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) //Me permite usar las redux dev tools, y el thunk es para poder realizar acciones asincrónicas
);

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
