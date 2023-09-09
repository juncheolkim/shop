import {
    createBrowserRouter,
    RouterProvider,
    LoaderFunction,
    ActionFunction,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { getClient } from "./queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface RouteCommon {
    loader?: LoaderFunction;
    action?: ActionFunction;
    ErrorBoundary?: React.ComponentType<any>;
}

interface IRoute extends RouteCommon {
    path: string;
    Element: React.ComponentType<any>;
}

interface Pages {
    [key: string]: {
        default: React.ComponentType<any>;
    } & RouteCommon;
}

const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
const routes: IRoute[] = [];
for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
    if (!fileName) {
        continue;
    }

    const normalizedPathName = /\[(.*?)\]/.test(fileName)
        ? fileName.replace(/\[(.*?)\]/, ":$1")
        : fileName.replace(/\/index/, "");

    routes.push({
        path:
            fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
        Element: pages[path].default,
        loader: pages[path]?.loader as LoaderFunction | undefined,
        action: pages[path]?.action as ActionFunction | undefined,
        ErrorBoundary: pages[path]?.ErrorBoundary,
    });
}

const router = createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, ...rest }) => ({
        ...rest,
        element: <Element />,
        ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    }))
);

const client = getClient();

const App = () => {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
