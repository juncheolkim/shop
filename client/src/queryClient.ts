import { QueryClient } from "@tanstack/react-query";

export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client) client = new QueryClient();
        return client;
    };
})();

// Fake Shop API
const BASE_URL = "https://fakestoreapi.com";

type AnyOBJ = { [key: string]: any };

export const fetcher = async ({
    method,
    path,
    body,
    params,
}: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    path: string;
    body?: AnyOBJ;
    params?: AnyOBJ;
}) => {
    try {
        const url = `${BASE_URL}${path}`;
        const fetchOptions: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": BASE_URL,
            },
        };
        const res = await fetch(url, fetchOptions);
        const json = await res.json();
        return json;
    } catch (err) {
        console.log(err);
    }
};

export const QueryKeys = {
    PRODUCTS: ["PRODUCTS"],
};
