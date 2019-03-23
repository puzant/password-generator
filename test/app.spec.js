var assert = require('chai').assert;

let passwordGenerator = require('../app.js')


describe('password', function() {
    it('should return var', function() {
        assert.equal(passwordGenerator.x(), 'hello');
    })
})