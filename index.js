module.exports = function(args, configuration) {
    const configuredFlags = {};
    const requiredFlags = [];
    const defaultFlags = {};
    configuration.forEach(flagSetup => {
        const flagKey = flagSetup.long ? flagSetup.long : flagSetup.short;
        if (!flagKey) {
            return;
        }
        const flagObject = Object.assign({}, { key: flagKey }, flagSetup);

        if (flagSetup.long) {
            configuredFlags[flagSetup.long] = flagObject;
        }

        if (flagSetup.short) {
            configuredFlags[flagSetup.short] = flagObject;
        }

        if (flagSetup.required) {
            requiredFlags.push(flagKey);
        }
        if (flagSetup.default) {
            defaultFlags[flagKey] = flagSetup.default;
        }
    });

    const understoodFlags = {};
    const numberOfArgs = args.length;
    for (let i = 0; i < numberOfArgs; ) {
        const argBehindCurrent = numberOfArgs - i - 1 > 0;

        const flagValueMatch = args[i].match(/^-{1,2}([^=]+)(?:=(.*))?/);
        if (!flagValueMatch) {
            // Completely failed, move forward one and try again
            i++;
            continue;
        }

        const flag = flagValueMatch[1];
        let value = flagValueMatch[2];

        if (value === undefined) {
            if (argBehindCurrent) {
                const valueMatch = args[i + 1].match(/^[^-].*/);
                if (valueMatch) {
                    value = valueMatch[0];
                    i++;
                }
            }
        }
        i++;

        if (!configuredFlags[flag]) {
            throw new Error(`unknown flag: ${flag}`);
        }

        if (configuredFlags[flag].withValue) {
            if (value === undefined) {
                throw new Error(`missing value for flag: ${flag}`);
            }
        } else {
            if (value !== undefined) {
                throw new Error(`value given for flag that expects no value: ${flag}`);
            }
            value = true;
        }

        const flagKey = configuredFlags[flag].key;

        if (configuredFlags[flagKey].collectInArray) {
            if (understoodFlags[flagKey]) {
                understoodFlags[flagKey].push(value);
            } else {
                understoodFlags[flagKey] = [value];
            }
        } else {
            understoodFlags[flagKey] = value;
        }
    }

    // Check required flags
    requiredFlags.forEach(flagKey => {
        if (!understoodFlags[flagKey]) {
            const configuredFlag = configuredFlags[flagKey];

            let flagString;
            if (configuredFlag.long) {
                flagString = `--${configuredFlag.long}`;
                if (configuredFlag.short) {
                    flagString += ` (-${configuredFlag.short})`;
                }
            } else {
                flagString = `-${configuredFlag.short}`;
            }

            throw new Error(`required flag missing: ${flagString}`);
        }
    });

    // Apply default values
    Object.keys(defaultFlags).forEach(flagKey => {
        if (!understoodFlags[flagKey]) {
            understoodFlags[flagKey] = defaultFlags[flagKey];
        }
    });

    return understoodFlags;
};
