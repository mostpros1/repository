import { OperationTypeNode } from 'graphql';
import Observable from 'zen-observable-ts';
import { CustomUserAgentDetails } from '@aws-amplify/core';
import { GraphQLOptions, GraphQLResult, GraphQLOperation } from '../types';
export declare const graphqlOperation: (query: any, variables?: {}, authToken?: string) => {
    query: any;
    variables: {};
    authToken: string;
};
/**
 * Export Cloud Logic APIs
 */
export declare class InternalGraphQLAPIClass {
    /**
     * @private
     */
    private _options;
    private _api;
    Auth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
    Cache: import("@aws-amplify/cache/lib-esm/types").ICache;
    Credentials: import("@aws-amplify/core").CredentialsClass;
    /**
     * Initialize GraphQL API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    constructor(options: any);
    getModuleName(): string;
    /**
     * Configure API
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    configure(options: any): any;
    /**
     * Create an instance of API for the library
     * @return - A promise of true if Success
     */
    createInstance(): true | Promise<never>;
    private _headerBasedAuth;
    /**
     * to get the operation type
     * @param operation
     */
    getGraphqlOperationType(operation: GraphQLOperation): OperationTypeNode;
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `graphql_headers` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */
    graphql<T = any>({ query: paramQuery, variables, authMode, authToken }: GraphQLOptions, additionalHeaders?: {
        [key: string]: string;
    }, customUserAgentDetails?: CustomUserAgentDetails): Observable<GraphQLResult<T>> | Promise<GraphQLResult<T>>;
    private _graphql;
    createInstanceIfNotCreated(): Promise<void>;
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    isCancel(error: any): any;
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @return {boolean} - A boolean indicating if the request was cancelled
     */
    cancel(request: Promise<any>, message?: string): any;
    /**
     * Check if the request has a corresponding cancel token in the WeakMap.
     * @params request - The request promise
     * @return if the request has a corresponding cancel token.
     */
    hasCancelToken(request: Promise<any>): any;
    private _graphqlSubscribe;
    /**
     * @private
     */
    _ensureCredentials(): any;
}
export declare const InternalGraphQLAPI: InternalGraphQLAPIClass;
