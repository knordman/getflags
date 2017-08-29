
let assert = require('assert');
let getflags = require('./index');

describe('Short options', function() {

    describe('with values', function() {
        it('sets the member in the output object to that string value', function(){
            assert.deepStrictEqual(
                getflags(['-s', '1', '-b=some-text', '-f', 'and some with space'], 
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
                        },
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
        it('sets the member in the output object to true', function(){
            assert.deepStrictEqual(
                getflags(['-s', '-f'], 
                    [
                        {
                            short: 's',
                        },
                        {
                            short: 'b',
                        },
                        {
                            short: 'f',
                        },
                    ]
                ),
                {
                    s: true,
                    f: true
                }
            );
        });
        it('throws an exception if a value is given', function(){
            assert.throws(
                () => {
                    getflags(['-s', '-b', '1', '-f'], 
                        [
                            {
                                short: 's',
                            },
                            {
                                short: 'b',
                            },
                            {
                                short: 'f',
                            },
                        ]
                    );
                },
                Error
            );
        });
    });

    describe('with values but set without', function() {
        it('throws an exception', function(){
            assert.throws(
                () => {
                    getflags(['-s', '1', '-b', '-f', '2'], 
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
                            },
                        ]
                    );
                },
                Error
            );
        });
    });

    describe('with unknown options', function() {
        it('throws an exception', function(){
            assert.throws(
                () => {
                    getflags(['-r', '1', '-b', '-f', '2'], 
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
                            },
                        ]
                    );
                },
                Error
            );
        });
    });

});

describe('Long options', function() {

    describe('with values', function() {
        it('sets the member in the output object to that string value', function(){
            assert.deepStrictEqual(
                getflags(['--some', '1', '--better=some-text', '--function', 'and some with space'], 
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
                        },
                    ]
                ),
                {
                    some: '1',
                    better: 'some-text',
                    'function': 'and some with space'
                }
            );
        });    
    });

    describe('without values', function() {
        it('sets the member in the output object to true', function(){
            assert.deepStrictEqual(
                getflags(['--some', '--better'], 
                    [
                        {
                            long: 'some',
                        },
                        {
                            long: 'better',
                        },
                        {
                            long: 'function',
                        },
                    ]
                ),
                {
                    some: true,
                    better: true,
                }
            );
        });
        it('throws an exception if a value is given', function(){
            assert.throws(
                () => {
                    getflags(['--some', '--better', '1', '--function'], 
                        [
                            {
                                long: 'some',
                            },
                            {
                                long: 'better',
                            },
                            {
                                long: 'function',
                            },
                        ]
                    );
                },
                Error
            );
        });
    });

    describe('with values but set without', function() {
        it('throws an exception', function(){
            assert.throws(
                () => {
                    getflags(['--some', '1', '--better', '--function', '2'], 
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
                            },
                        ]
                    );
                },
                Error
            );
        });
    });

    describe('with unknown options', function() {
        it('throws an exception', function(){
            assert.throws(
                () => {
                    getflags(['--not-here', '1', '-b', '-f', '2'], 
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
                            },
                        ]
                    );
                },
                Error
            );
        });
    });    

});

describe('Mixed options', function() {

    it('merges everything accordingly', function(){
        assert.deepStrictEqual(
            getflags(['--some', '1', '--better=some-text', '--a', '--function', '-g', 'and some with space'], 
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
                'function': true,
                g: 'and some with space'
            }
        );
    }); 

    it('returns the long option when both are given', function(){
        assert.deepStrictEqual(
            getflags(['--example', 'long', '-e=short'], 
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


});