import { AWSAppSyncRealTimeProvider } from '@aws-amplify/pubsub';
import { GraphQLOptions, GraphQLResult } from '@aws-amplify/api-graphql';
import Observable from 'zen-observable-ts';
import { GraphQLQuery, GraphQLSubscription } from './types';
import { InternalAPIClass } from './internals/InternalAPI';
/**
 * @deprecated
 * Use RestApi or GraphQLAPI to reduce your application bundle size
 * Export Cloud Logic APIs
 */
export declare class APIClass extends InternalAPIClass {
    getModuleName(): string;
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `graphql_headers` set in the config
     * @returns An Observable if queryType is 'subscription', else a promise of the graphql result from the query.
     */
    graphql<T>(options: GraphQLOptions, additionalHeaders?: {
        [key: string]: string;
    }): T extends GraphQLQuery<T> ? Promise<GraphQLResult<T>> : T extends GraphQLSubscription<T> ? Observable<{
        provider: AWSAppSyncRealTimeProvider;
        value: GraphQLResult<T>;
    }> : Promise<GraphQLResult<any>> | Observable<object>;
}
export declare const API: APIClass;
