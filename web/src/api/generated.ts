export interface paths {
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_refreshToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_getUsers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/self": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UserController_getSelf"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grocery": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["GroceryController_filterGroceries"];
        put?: never;
        post: operations["GroceryController_createGrocery"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grocery/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["GroceryController_findGroceryItem"];
        put: operations["GroceryController_updateGrocery"];
        post?: never;
        delete: operations["GroceryController_deleteGrocery"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grocery/{id}/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["GroceryController_findGroceryItemHistory"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grocery/{id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["GroceryController_updateGroceryStatus"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grocery/bulk": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations["GroceryController_deleteGroceryBulk"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        LoginDto: {
            email: string;
            password: string;
        };
        TokensDto: {
            accessToken: string;
            refreshToken: string;
        };
        TokensResposeDto: {
            data: components["schemas"]["TokensDto"];
        };
        RefreshTokenDto: {
            token: string;
        };
        UserDto: {
            id: string;
            email: string;
        };
        UserResposeDto: {
            data: components["schemas"]["UserDto"];
        };
        /** @enum {string} */
        GroceryItemStatus: GroceryItemStatus;
        GroceryDto: {
            id: string;
            name: string;
            priority: number;
            quantity: number;
            status: components["schemas"]["GroceryItemStatus"];
            /** Format: date-time */
            statusUpdatedAt?: string;
        };
        GroceryPaginatedDto: {
            data: components["schemas"]["GroceryDto"][];
            total: number;
        };
        GroceryResposeDto: {
            data: components["schemas"]["GroceryDto"];
        };
        GroceryHistoryDto: {
            id: string;
            status: components["schemas"]["GroceryItemStatus"];
            /** Format: date-time */
            createdAt: string;
        };
        GroceryHistoryPaginatedDto: {
            data: components["schemas"]["GroceryHistoryDto"][];
            total: number;
        };
        CreateGroceryDto: {
            name?: string;
            priority?: number;
            quantity?: number;
            status?: components["schemas"]["GroceryItemStatus"];
        };
        IdDto: {
            id: string;
        };
        IdResposeDto: {
            data: components["schemas"]["IdDto"];
        };
        UpdateGroceryDto: {
            name?: string;
            priority?: number;
            quantity?: number;
            status?: components["schemas"]["GroceryItemStatus"];
        };
        UpdateGroceryStatusDto: {
            status: components["schemas"]["GroceryItemStatus"];
        };
        DeleteGroceryBulkDto: {
            ids: string[];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokensResposeDto"];
                };
            };
        };
    };
    AuthController_refreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RefreshTokenDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokensResposeDto"];
                };
            };
        };
    };
    UserController_getUsers: {
        parameters: {
            query?: {
                email?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResposeDto"][];
                };
            };
        };
    };
    UserController_getSelf: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserResposeDto"];
                };
            };
        };
    };
    GroceryController_filterGroceries: {
        parameters: {
            query?: {
                take?: number;
                skip?: number;
                priority?: number;
                status?: components["schemas"]["GroceryItemStatus"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroceryPaginatedDto"];
                };
            };
        };
    };
    GroceryController_createGrocery: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateGroceryDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdResposeDto"];
                };
            };
        };
    };
    GroceryController_findGroceryItem: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroceryResposeDto"];
                };
            };
        };
    };
    GroceryController_updateGrocery: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateGroceryDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdResposeDto"];
                };
            };
        };
    };
    GroceryController_deleteGrocery: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdResposeDto"];
                };
            };
        };
    };
    GroceryController_findGroceryItemHistory: {
        parameters: {
            query?: {
                take?: number;
                skip?: number;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GroceryHistoryPaginatedDto"];
                };
            };
        };
    };
    GroceryController_updateGroceryStatus: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateGroceryStatusDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["IdResposeDto"];
                };
            };
        };
    };
    GroceryController_deleteGroceryBulk: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DeleteGroceryBulkDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}

export enum GroceryItemStatus {
  Ranout = "RANOUT",
  Have = "HAVE",
}
