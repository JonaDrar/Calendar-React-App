import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { store } from "./store";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </Provider>
  );
};
