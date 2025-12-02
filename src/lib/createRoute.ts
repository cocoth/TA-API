import { endpointManager } from "./endpointManager";
import { RouteType } from "@/src/types/endpoint.type";
import { Router } from "express";

/**
 * Creates a new route group and adds it to the endpoint manager.
 * @param prefix The prefix for the route group.
 * @param routes The routes to include in the group.
 * @returns The created route group.
 */
export const createRouteGroup = (
    data: {
        prefix: string,
        middlewares?: RouteType.RouteMiddlewareController[],
        routes: RouteType.Route[],
    }
) => {
    const { prefix, routes, middlewares = [] } = data;
    const router = Router()

    for (const route of routes) {
        endpointManager.addEndpoint({
            mainRouter: router,
            prefix,
            path: route.path,
            method: route.method,
            controller: route.controller,
            middlewares: [...middlewares, ...(route.middlewares ?? [])]
        });
    }
    return router;
};

/**
 * Automatically binds all methods of the given instance to itself.
 * This ensures that the `this` context within each method always refers to the instance,
 * regardless of how the method is called.
 *
 * @param instance - The object whose methods should be bound to itself.
 * 
 * @remarks
 * Only binds methods defined directly on the prototype, excluding the constructor.
 */
export function autoBind(instance: any) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).forEach(key => {
        const val = instance[key];
        if (typeof val === "function" && key !== "constructor") {
            instance[key] = val.bind(instance);
        }
    });
}