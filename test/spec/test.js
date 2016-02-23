(function() {
    'use strict';

    describe('Tests for functions on SowTime', function() {


        describe('testing calcDates()', function() {

            it('should return undefined with empty input', function() {
                expect(calcSowDates({})).to.equal(undefined);
            });

            it('should return an object', function() {
		    	var input = {
		            vopb1: "50",
		            tra1: "35"
	        	};
            	var result = calcSowDates(input, 'harvestsoonest');
                assert.typeOf(result,'Object');
            });

            it('should return an object of same n of input properties + 2', function() {
		    	var input = {
		            vopb1: "50",
		            tra1: "35",
		            bla: "44",
		            daa: "45"
	        	};
	        	var result = calcSowDates(input);
	        	expect(Object.keys(result).length).to.equal(6);
            });

            

        });


        describe('testing convertObjToArr()', function(){
        	it('shoud return an array', function(){
        		assert.typeOf(convertObjToArr(),'Array');
        	});

        	it('shoud return an array of the same length', function(){
		    	var input = {
		            vopb1: "50",
		            tra1: "35"
		        };
        		var expected = [['vopb1',50],['tra1',35]];
        		assert.lengthOf(convertObjToArr(input),expected.length);
        	});        	

        	it('shoud return an expected array', function(){
		    	var input1 = {
		            vopb1: "50",
		            tra1: "35",
		            opb1: "30"
	        	};
		    	var input2 = {
		            tra1: "35",
		            opb1: "30",
		            vopb1: "50"
	        	};

        		var expected = [['vopb1',"50"],['tra1',"35"],['opb1',"30"]];
        		expect(convertObjToArr(input1)).to.eql(expected);
        		expect(convertObjToArr(input2)).to.eql(expected);
        	});        	

        });
    });
})();