import { GraphQLOperation, GraphQLOptions, GraphQLResult, OperationTypeNode } from '@aws-amplify/api-graphql';
import { CustomUserAgentDetails } from '@aws-amplify/core';
import { AWSAppSyncRealTimeProvider } from '@aws-amplify/pubsub';
import Observable from 'zen-observable-ts';
import { GraphQLQuery, GraphQLSubscription } from '../types';
/**
 * @deprecated
 * Use RestApi or GraphQLAPI to reduce your application bundle size
 * Export Cloud Logic APIs
 */
export declare class InternalAPIClass {
    /**
     * Initialize API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    private _options;
    private _restApi;
    private _graphqlApi;
    Auth: import("@aws-amplify/auth/lib-esm/Auth").AuthClass;
    Cache: import("@aws-amplify/cache/lib-esm/types").ICache;
    Credentials: import("@aws-amplify/core").CredentialsClass;
    /**
     * Initialize API with AWS configuration
     * @param {Object} options - Configuration object for API
     */
    constructor(options: any);
    getModuleName(): string;
    /**
     * Configure API part with aws configurations
     * @param {Object} config - Configuration of the API
     * @return {Object} - The current configuration
     */
    configure(options: any): any;
    /**
     * Make a GET request
     * @param apiName - The api name of the request
     * @param path - The path of the request
     * @param [init] - Request extra params
     * @return A promise that resolves to an object with response status and JSON data, if successful.
     */
    get(apiName: string, path: string, init: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Make a POST request
     * @param apiName - The api name of the request
     * @param path - The path of the request
     * @param [init] - Request extra params
     * @return A promise that resolves to an object with response status and JSON data, if successful.
     */
    post(apiName: string, path: string, init: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Make a PUT request
     * @param apiName - The api name of the request
     * @param path - The path of the request
     * @param [init] - Request extra params
     * @return A promise that resolves to an object with response status and JSON data, if successful.
     */
    put(apiName: string, path: string, init: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Make a PATCH request
     * @param apiName - The api name of the request
     * @param path - The path of the request
     * @param [init] - Request extra params
     * @return A promise that resolves to an object with response status and JSON data, if successful.
     */
    patch(apiName: string, path: string, init: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Make a DEL request
     * @param apiName - The api name of the request
     * @param path - The path of the request
     * @param [init] - Request extra params
     * @return A promise that resolves to an object with response status and JSON data, if successful.
     */
    del(apiName: string, path: string, init: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Make a HEAD request
     * @param apiName - The api name of the request
     * @param path - The path of the request
     * @param [init] - Request extra params
     * @return A promise that resolves to an object with response status and JSON data, if successful.
     */
    head(apiName: string, path: string, init: {
        [key: string]: any;
    }): Promise<any>;
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param error - Any error
     * @return If the error was from an api request cancellation
     */
    isCancel(error: any): boolean;
    /**
     * Cancels an inflight request for either a GraphQL request or a Rest API request.
     * @param request - request to cancel
     * @param [message] - custom error message
     * @return If the request was cancelled
     */
    cancel(request: Promise<any>, message?: string): boolean;
    private getInitWithCustomUserAgentDetails;
    /**
     * Getting endpoint for API
     * @param apiName - The name of the api
     * @return The endpoint of the api
     */
    endpoint(apiName: string): Promise<string>;
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
     * @returns An Observable if queryType is 'subscription', else a promise of the graphql result from the query.
     */
    graphql<T>(options: GraphQLOptions, additionalHeaders?: {
        [key: string]: string;
    }, customUserAgentDetails?: CustomUserAgentDetails): T extends GraphQLQuery<T> ? Promise<GraphQLResult<T>> : T extends GraphQLSubscription<T> ? Observable<{
        provider: AWSAppSyncRealTimeProvider;
        value: GraphQLResult<T>;
    }> : Promise<GraphQLResult<any>> | Observable<object>;
}
export declare const InternalAPI: InternalAPIClass;
