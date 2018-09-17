// Type definitions for getflags 1.3.0
// Project: getflags
// Definitions by: Kristian Nordman knordman.github@cxz.fi

export = getflags;

declare function getflags(args: string[], configuration: getflags.Configuration): getflags.Flags;

declare namespace getflags {
    interface ConfigurationEntry {
        /** Short flag alternative */
        short?: string;
        /** Long flag alternative */
        long: string;
        /** Whether flag requires a value */
        withValue: boolean;
        /** When same flag is given multiple times, each value is pushed to an array, otherwise the last given value will set the flag value */
        collectInArray: boolean;
        /** Whether flag is required */
        required: boolean;
        /** Default value given the flag when not specified */
        default: string;
    }
    export type Configuration = ConfigurationEntry[];

    export interface Flags {
        [flag: string]: string | boolean;
    }
}
