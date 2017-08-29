# getflags

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
```

Saving that into `test.js` and running with:

```bash
node test.js --some 1 --better=some-text --a --function -g 'and some with space'
```

returns:

```js
{ 
    some: '1',
    better: 'some-text',
    and: true,
    function: true,
    g: 'and some with space'
}
```

## License

[MIT](LICENSE)
