
module.exports = function(args, configuration) {
    let configuredFlags = {};
    let requiredFlags = [];
    configuration.forEach(flagConfiguration => {
        if (flagConfiguration.short) {
            configuredFlags[flagConfiguration.short] = flagConfiguration;
        }
        if (flagConfiguration.long) {
            configuredFlags[flagConfiguration.long] = flagConfiguration;
        }
        if (flagConfiguration.required) {
            if (flagConfiguration.long) {
                requiredFlags.push(flagConfiguration.long);
            }
            else if (flagConfiguration.short) {
                requiredFlags.push(flagConfiguration.short);
            }
        }
    });

    let understoodFlags = {};
    let numberOfArgs = args.length;
    for (let i = 0; i < numberOfArgs;) {
        let argBehindCurrent = (numberOfArgs - i - 1) > 0;

        let flagValueMatch = args[i].match(/-{1,2}(\w+)(?:=(.*))?/);
        if (!flagValueMatch) {
            // Completely failed, move forward one and try again
            i++;
            continue;
        }
        
        let flag = flagValueMatch[1];
        let value = flagValueMatch[2];

        if (value === undefined) {
            if (argBehindCurrent) {
                let valueMatch = args[i+1].match(/^[^-].*/);
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
        }
        else {
            if (value !== undefined) {
                throw new Error(`value given for flag that expects no value: ${flag}`);
            }
            value = true;
        }

        let longFlag = configuredFlags[flag].long;
        let shortFlag = configuredFlags[flag].short;
        let toSetFlag = (longFlag && flag === shortFlag) ? longFlag : flag;

        if (configuredFlags[toSetFlag].collectInArray) {
            if (understoodFlags[toSetFlag]) {
                understoodFlags[toSetFlag].push(value);
            }
            else {
                understoodFlags[toSetFlag] = [value];
            }
        }
        else {
            understoodFlags[toSetFlag] = value;
        }
    }

    requiredFlags.forEach(flag => {
        if (!understoodFlags[flag]) {
            let configuredFlag = configuredFlags[flag];
            let flagString;
            if (configuredFlag.long) {
                flagString = `--${configuredFlag.long}`;
                if (configuredFlag.short) {
                    flagString += ` (-${configuredFlag.short})`;
                }
            }
            else {
                flagString = `-${configuredFlag.short}`;
            }

            throw new Error(`required flag missing: ${flagString}`);
        }
    });

    return understoodFlags;
};
