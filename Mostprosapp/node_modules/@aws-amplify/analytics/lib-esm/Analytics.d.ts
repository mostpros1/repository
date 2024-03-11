import { AnalyticsProvider, AnalyticsEvent, AutoTrackSessionOpts, AutoTrackPageViewOpts, AutoTrackEventOpts, PersonalizeAnalyticsEvent, KinesisAnalyticsEvent } from './types';
import { PageViewTracker, EventTracker, SessionTracker } from './trackers';
declare const trackers: {
    pageView: typeof PageViewTracker;
    event: typeof EventTracker;
    session: typeof SessionTracker;
};
declare type TrackerTypes = keyof typeof trackers;
/**
 * Provide mobile analytics client functions
 */
export declare class AnalyticsClass {
    private _config;
    private _pluggables;
    private _disabled;
    private _trackers;
    /**
     * Initialize Analtyics
     * @param config - Configuration of the Analytics
     */
    constructor();
    getModuleName(): string;
    /**
     * configure Analytics
     * @param {Object} config - Configuration of the Analytics
     */
    configure(config?: any): any;
    /**
     * add plugin into Analytics category
     * @param pluggable - an instance of the plugin
     */
    addPluggable(pluggable: AnalyticsProvider): any;
    /**
     * Get the plugin object
     * @param providerName - the name of the provider to be removed
     */
    getPluggable(providerName: string): AnalyticsProvider;
    /**
     * Remove the plugin object
     * @param providerName - the name of the provider to be removed
     */
    removePluggable(providerName: string): void;
    /**
     * stop sending events
     */
    disable(): void;
    /**
     * start sending events
     */
    enable(): void;
    /**
     * Record Session start
     * @param [provider] - name of the provider.
     * @return - A promise which resolves if buffer doesn't overflow
     */
    startSession(provider?: string): Promise<unknown>;
    /**
     * Record Session stop
     * @param [provider] - name of the provider.
     * @return - A promise which resolves if buffer doesn't overflow
     */
    stopSession(provider?: string): Promise<unknown>;
    /**
     * Record one analytic event and send it to Pinpoint
     * @param event - An object with the name of the event, attributes of the event and event metrics.
     * @param [provider] - name of the provider.
     */
    record(event: AnalyticsEvent | PersonalizeAnalyticsEvent | KinesisAnalyticsEvent, provider?: string): Promise<unknown>;
    updateEndpoint(attrs: {
        [key: string]: any;
    }, provider?: string): Promise<unknown>;
    private _sendEvent;
    /**
     * Enable or disable auto tracking
     * @param trackerType - The type of tracker to activate.
     * @param [opts] - Auto tracking options.
     */
    autoTrack(trackerType: 'session', opts: AutoTrackSessionOpts): any;
    autoTrack(trackerType: 'pageView', opts: AutoTrackPageViewOpts): any;
    autoTrack(trackerType: 'event', opts: AutoTrackEventOpts): any;
    autoTrack(trackerType: TrackerTypes, opts: {
        provider: string;
        [key: string]: any;
    }): any;
}
export declare const Analytics: AnalyticsClass;
export {};
