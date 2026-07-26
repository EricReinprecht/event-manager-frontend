import {
    createBrowserRouter
} from "react-router-dom";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>
    },
    {
        path: "/parties",
        element: <div>Parties</div>
    },
    {
        path: "/dashboard",
        element: <div>Dashboard</div>
    }
]);