
const process = require('process');
const testit = require('.');

console.log(
    testit(process.argv, [
        {
            short: 'c',             /* Short flag */
            long: 'collector',      /* Long equivalent flag */
            withValue: true,        /* Flag requires a value */
            collectInArray: true,   /* When same flag is given multiple times, 
                                       each value is pushed to an array, otherwise
                                       the last given value will set the flag value */
            required: true          /* Flag is required */
        },
        {
            short: 'd',
            withValue: true,
            default: 'when not specified' /* Default value given flag when not specified */
        },
        {
            long: 'some',
            withValue: true
        },
        {
            long: 'better',
            withValue: true
        },
        {
            long: 'function',
            withValue: false
        },
        {
            short: 'a',
            long: 'and',
            withValue: false,
            required: true
        },
        {
            short: 'g',
            withValue: true
        },
    ])
);