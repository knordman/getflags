
module.exports = function(args, configuration) {
    let configuredFlags = {};
    configuration.forEach(flagConfiguration => {
        if (flagConfiguration.short) {
            configuredFlags[flagConfiguration.short] = flagConfiguration;
        }
        if (flagConfiguration.long) {
            configuredFlags[flagConfiguration.long] = flagConfiguration;
        }
    });

    let argsString = args.join(' ');
    let parsedElements = argsString.split(
        /(-){1,2}(\w+)(?:[\s=](?:(?:"([^"]*)")|(?:'([^']*)')|([^\s-]+)))?/
    );
    let numberOfParsedElements = parsedElements.length;
    let understoodFlags = {};

    for (let i = 0; i < numberOfParsedElements;) {
        let numberOfElementsBehindCurrent = numberOfParsedElements - i - 1;
        if (parsedElements[i] == '-' && numberOfElementsBehindCurrent >= 4) {
            let flagCandidate = parsedElements[i+1];
            let value;
            let numberOfUndefinedValues = 0;
            [
                parsedElements[i+2], // Quoted with ""
                parsedElements[i+3], // Quoted with ''
                parsedElements[i+4]  // Unescaped
            ].forEach(valueCandidate => {
                if (valueCandidate === undefined) {
                    numberOfUndefinedValues++;
                }
                else {
                    value = valueCandidate;
                }
            });

            // For correctly identified flags, at least two values should be undefined
            if (numberOfUndefinedValues < 2) {
                i++;
                continue;
            }

            if (!configuredFlags[flagCandidate]) {
                throw new Error(`unknown flag: ${flagCandidate}`);
            }

            if (configuredFlags[flagCandidate].withValue) {
                if (value === undefined) {
                    throw new Error(`missing value for flag: ${flagCandidate}`);
                }
            }
            else {
                if (value !== undefined) {
                    throw new Error(`value given for flag that expects no value: ${flagCandidate}`);
                }
                value = true;
            }

            let longFlag = configuredFlags[flagCandidate].long;
            let shortFlag = configuredFlags[flagCandidate].short;
            if (longFlag && flagCandidate === shortFlag) {
                understoodFlags[longFlag] = value;
            }
            else {
                understoodFlags[flagCandidate] = value;
            }

            i += 5;
        }
        else {
            i++;
        }
    }

    return understoodFlags;
};
