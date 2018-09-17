const assert = require('assert');
const getflags = require('.');

describe('Short options', function() {
    describe('with values', function() {
        it('sets the member in the output object to that string value', function() {
            assert.deepStrictEqual(
                getflags(
                    ['-s', '1', '-b=some-text', '-f', 'and some with space'],
                    [
                        {
                            short: 's',
                            withValue: true
                        },
                        {
                            short: 'b',
                            withValue: true
                        },
                        {
                            short: 'f',
                            withValue: true
                        }
                    ]
                ),
                {
                    s: '1',
                    b: 'some-text',
                    f: 'and some with space'
                }
            );
        });
    });

    describe('without values', function() {
        it('sets the member in the output object to true', function() {
            assert.deepStrictEqual(
                getflags(
                    ['-s', '-f'],
                    [
                        {
                            short: 's'
                        },
                        {
                            short: 'b'
                        },
                        {
                            short: 'f'
                        }
                    ]
                ),
                {
                    s: true,
                    f: true
                }
            );
        });
        it('throws an exception if a value is given', function() {
            assert.throws(() => {
                getflags(
                    ['-s', '-b', '1', '-f'],
                    [
                        {
                            short: 's'
                        },
                        {
                            short: 'b'
                        },
                        {
                            short: 'f'
                        }
                    ]
                );
            }, Error);
        });
    });

    describe('with values but set without', function() {
        it('throws an exception', function() {
            assert.throws(() => {
                getflags(
                    ['-s', '1', '-b', '-f', '2'],
                    [
                        {
                            short: 's',
                            withValue: true
                        },
                        {
                            short: 'b',
                            withValue: true
                        },
                        {
                            short: 'f',
                            withValue: true
                        }
                    ]
                );
            }, Error);
        });
    });

    describe('with unknown options', function() {
        it('throws an exception', function() {
            assert.throws(() => {
                getflags(
                    ['-r', '1', '-b', '-f', '2'],
                    [
                        {
                            short: 's',
                            withValue: true
                        },
                        {
                            short: 'b',
                            withValue: true
                        },
                        {
                            short: 'f',
                            withValue: true
                        }
                    ]
                );
            }, Error);
        });
    });

    describe('with required options', function() {
        it('goes ok when option is given', function() {
            assert.deepStrictEqual(
                getflags(
                    ['-r', 'first'],
                    [
                        {
                            short: 'r',
                            withValue: true,
                            required: true
                        }
                    ]
                ),
                {
                    r: 'first'
                }
            );
        });

        it('throws an exception when missing', function() {
            assert.throws(() => {
                getflags(
                    ['-r', 'first'],
                    [
                        {
                            short: 'r',
                            withValue: true,
                            required: true
                        },
                        {
                            short: 'b',
                            withValue: true,
                            required: true
                        }
                    ]
                );
            }, Error);
        });
    });
});

describe('Long options', function() {
    describe('with values', function() {
        it('sets the member in the output object to that string value', function() {
            assert.deepStrictEqual(
                getflags(
                    ['--some', '1', '--better=some-text', '--function', 'and some with space'],
                    [
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
                            withValue: true
                        }
                    ]
                ),
                {
                    some: '1',
                    better: 'some-text',
                    function: 'and some with space'
                }
            );
        });
    });

    describe('without values', function() {
        it('sets the member in the output object to true', function() {
            assert.deepStrictEqual(
                getflags(
                    ['--some', '--better'],
                    [
                        {
                            long: 'some'
                        },
                        {
                            long: 'better'
                        },
                        {
                            long: 'function'
                        }
                    ]
                ),
                {
                    some: true,
                    better: true
                }
            );
        });
        it('throws an exception if a value is given', function() {
            assert.throws(() => {
                getflags(
                    ['--some', '--better', '1', '--function'],
                    [
                        {
                            long: 'some'
                        },
                        {
                            long: 'better'
                        },
                        {
                            long: 'function'
                        }
                    ]
                );
            }, Error);
        });
    });

    describe('with values but set without', function() {
        it('throws an exception', function() {
            assert.throws(() => {
                getflags(
                    ['--some', '1', '--better', '--function', '2'],
                    [
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
                            withValue: true
                        }
                    ]
                );
            }, Error);
        });
    });

    describe('with unknown options', function() {
        it('throws an exception', function() {
            assert.throws(() => {
                getflags(
                    ['--not-here', '1', '-b', '-f', '2'],
                    [
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
                            withValue: true
                        }
                    ]
                );
            }, Error);
        });
    });

    describe('with required options', function() {
        it('goes ok when option is given', function() {
            assert.deepStrictEqual(
                getflags(
                    ['--myRequiredOption', 'first'],
                    [
                        {
                            long: 'myRequiredOption',
                            withValue: true,
                            required: true
                        }
                    ]
                ),
                {
                    myRequiredOption: 'first'
                }
            );
        });

        it('throws an exception when missing', function() {
            assert.throws(() => {
                getflags(
                    ['--myRequiredOption', 'first'],
                    [
                        {
                            long: 'myRequiredOption',
                            withValue: true,
                            required: true
                        },
                        {
                            long: 'myOtherRequiredOption',
                            withValue: true,
                            required: true
                        }
                    ]
                );
            }, Error);
        });
    });
});

describe('Arrayed options', function() {
    it('collects in an array the collectInArray flags', function() {
        assert.deepStrictEqual(
            getflags(
                ['--server', 'first', '--server=second'],
                [
                    {
                        long: 'server',
                        withValue: true,
                        collectInArray: true
                    }
                ]
            ),
            {
                server: ['first', 'second']
            }
        );
    });
});

describe('Required option error messages', function() {
    it('includes both long and short name when configured', function() {
        assert.throws(() => {
            getflags(
                [],
                [
                    {
                        short: 'r',
                        long: 'required',
                        required: true
                    }
                ]
            );
        }, /: --required \(-r\)/);
    });

    it('includes only long name when no short configured', function() {
        assert.throws(() => {
            getflags(
                [],
                [
                    {
                        long: 'required',
                        required: true
                    }
                ]
            );
        }, /: --required$/);
    });

    it('includes only short name when no long configured', function() {
        assert.throws(() => {
            getflags(
                [],
                [
                    {
                        short: 'r',
                        required: true
                    }
                ]
            );
        }, /: -r$/);
    });
});

describe('Default value', function() {
    it('is applied when a not required parameter is not specified', function() {
        assert.deepStrictEqual(
            getflags(
                [],
                [
                    {
                        long: 'has-default',
                        withValue: true,
                        required: false,
                        default: 'default value'
                    }
                ]
            ),
            {
                'has-default': 'default value'
            }
        );
    });

    it('is not applied when a value is given', function() {
        assert.deepStrictEqual(
            getflags(
                ['--has-default=specified'],
                [
                    {
                        long: 'has-default',
                        withValue: true,
                        required: false,
                        default: 'default value'
                    }
                ]
            ),
            {
                'has-default': 'specified'
            }
        );
    });
});

describe('Mixed options', function() {
    it('merges everything accordingly', function() {
        assert.deepStrictEqual(
            getflags(
                [
                    '--some',
                    '1',
                    '--collector',
                    'first',
                    '--better=some-text',
                    '--a',
                    '-c=1',
                    '--function',
                    '-g',
                    'and some with space'
                ],
                [
                    {
                        long: 'some',
                        withValue: true
                    },
                    {
                        short: 'c',
                        long: 'collector',
                        withValue: true,
                        collectInArray: true
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
                        long: 'another',
                        withValue: false
                    },
                    {
                        short: 'g',
                        withValue: true
                    }
                ]
            ),
            {
                some: '1',
                better: 'some-text',
                another: true,
                function: true,
                g: 'and some with space',
                collector: ['first', '1']
            }
        );
    });

    it('returns the long option when both are given', function() {
        assert.deepStrictEqual(
            getflags(
                ['--example', 'long', '-e=short'],
                [
                    {
                        long: 'example',
                        short: 'e',
                        withValue: true
                    }
                ]
            ),
            {
                example: 'short'
            }
        );
    });

    it('non flag matches are ignored', function() {
        assert.deepStrictEqual(
            getflags(
                ['not-a-flag', '--example', 'long', 'not-this-either', '-e=short'],
                [
                    {
                        long: 'example',
                        short: 'e',
                        withValue: true
                    }
                ]
            ),
            {
                example: 'short'
            }
        );
    });

    it('required option without short or long is ignored', function() {
        assert.deepStrictEqual(
            getflags(
                [],
                [
                    {
                        required: true
                    }
                ]
            ),
            {}
        );
    });
});
