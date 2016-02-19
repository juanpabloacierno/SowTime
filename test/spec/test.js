(function() {
    'use strict';

    describe('Give it some context', function() {
        describe('testing calcDates()', function() {

            it('should return empty object', function() {
                expect(calcSowDates({})).to.equal(undefined);
            });

            it('should return an object', function() {
                expect(calcSowDates({
                    vopb1: "50",
                    tra1: "35",
                    opb1: "30"
                }, 'gaga', '02/01/2013').to.equal('ba'));
            });

        });
    });
})();