
let process = require('process');
let testit = require('./index');

console.log(process.argv.splice(2))

console.log(
    testit(process.argv.splice(2), [
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
            withValue: false
        },
        {
            short: 'g',
            withValue: true
        }
    ])
);