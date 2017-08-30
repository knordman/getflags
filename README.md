# getflags

[![npm](https://img.shields.io/npm/v/getflags.svg)]()

Parses arguments into long and short flags, with or without value. 

## Install

```bash
npm install --save getflags
```

## Usage

The module exports one function that takes as arguments the `argv` 
array (`splice` from 2 to only include the program arguments), and a
configuration of recognized flags. When a false flag is detected (not 
recognized or given a value when not expected and vice versa) an 
exception is thrown. Example:

```js
let process = require('process');
let getflags = require('getflags');

console.log(
    getflags(process.argv.splice(2), [
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
        }
    ])
);
```

Saving that into `test.js` and running with:

```bash
node test.js --some 1 \
    --collector first \
    --better=some-text \
    --a -c='second collector' \
    --function -g 'and some with space'
```

returns:

```js
{ 
    some: '1',
    collector: ['first', 'second collector'],
    better: 'some-text',
    and: true,
    function: true,
    g: 'and some with space'
}
```

## License

[MIT](LICENSE)
