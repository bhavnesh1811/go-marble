import { ErrorComponent, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import routerBindings from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider("https://dil-foods.onrender.com")}
          routerProvider={routerBindings}
          resources={[
            {
              name: "dashboard",
              list: "/dashboard",
              meta: {
                icon: <HomeIcon className="h-4 w-4" />,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route path="/">
              <Route index element={<Dashboard />} />
            </Route>

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
