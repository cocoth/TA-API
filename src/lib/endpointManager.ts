import { terminalColors } from "@/src/utils/color";
import { RouteType } from "@/src/types/endpoint.type";
import { Router } from "express";

export class EndpointManager {
    private static instance: EndpointManager;
    private endpoints = new Map<string, RouteType.RouteController>();
    private routeDefinitions = new Map<string, RouteType.RouteDefinition>();

    public static getInstance(): EndpointManager {
        if (!EndpointManager.instance) {
            EndpointManager.instance = new EndpointManager();
        }
        return EndpointManager.instance;
    }

    /**
     * Adds a new endpoint to the manager.
     */
    public addEndpoint(data: {
        prefix?: string,
        path: string,
        method: RouteType.Method,
        controller: RouteType.RouteController,
        middlewares?: RouteType.RouteMiddlewareController[],
        mainRouter: Router
    }): void {
        const { prefix, path, method, controller, middlewares = [], mainRouter } = data;
        const fullPath = `${prefix}${path}`;
        const routeKey = `${method}:${fullPath}`;
        const methodLower = method.toLowerCase();

        (mainRouter as any)[methodLower](fullPath, ...middlewares, controller);

        this.endpoints.set(fullPath, controller);
        this.routeDefinitions.set(routeKey, {
            method,
            path: fullPath,
            controller,
            middlewares
        });

    }

    public getRoute(path: string): RouteType.RouteController | undefined {
        return this.endpoints.get(path);
    }

    public methodColors = {
        GET: terminalColors.GREEN,
        POST: terminalColors.BLUE,
        PUT: terminalColors.YELLOW,
        DELETE: terminalColors.RED,
        PATCH: terminalColors.CYAN,
        OPTIONS: terminalColors.MAGENTA,
        HEAD: terminalColors.WHITE,
    };

    public printAllEndpoints(prefix?: string): void {
        console.log('\nRegistered Endpoints:\n');

        let lastPrefix = "";
        this.routeDefinitions.forEach((def, key) => {
            const endpointPrefix = def.path.split("/")[1] || "/";

            if (endpointPrefix !== lastPrefix) {
                if (lastPrefix !== "") {
                    console.log("");
                }
                const count = Array.from(this.routeDefinitions.values()).filter(d => (d.path.split("/")[1] || "/") === endpointPrefix).length;
                console.log(endpointPrefix.toUpperCase() + ` [${count}]:`)
                lastPrefix = endpointPrefix;
            }
            const middlewares = def.middlewares ? def.middlewares.map(m => m.name).join(", ") : "";
            const controllerName = def.controller.name.replace(/^bound\s*/, "");
            console.log(`${this.methodColors[def.method] + def.method + terminalColors._reset} ${prefix ? (prefix + def.path) : def.path} ${middlewares ? `${terminalColors._dim}[${middlewares}]${terminalColors._reset}` : ""}`);
        });
        const total = this.routeDefinitions.size;
        console.log(`\nTotal Endpoints: ${terminalColors._bright}${total}${terminalColors._reset}`);
        console.log('\n');
    }

    public cleanup() {
        this.endpoints.clear();
        this.routeDefinitions.clear();
    }
}

/**
 * Singleton instance of the EndpointManager
 */
export const endpointManager = EndpointManager.getInstance();
