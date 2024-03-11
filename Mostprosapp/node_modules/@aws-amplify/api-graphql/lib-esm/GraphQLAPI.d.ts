import { GraphQLOptions, GraphQLResult } from './types';
import { InternalGraphQLAPIClass } from './internals';
import Observable from 'zen-observable-ts';
export declare const graphqlOperation: (query: any, variables?: {}, authToken?: string) => {
    query: any;
    variables: {};
    authToken: string;
};
/**
 * Export Cloud Logic APIs
 */
export declare class GraphQLAPIClass extends InternalGraphQLAPIClass {
    getModuleName(): string;
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `graphql_headers` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */
    graphql<T = any>(options: GraphQLOptions, additionalHeaders?: {
        [key: string]: string;
    }): Observable<GraphQLResult<T>> | Promise<GraphQLResult<T>>;
}
export declare const GraphQLAPI: GraphQLAPIClass;
