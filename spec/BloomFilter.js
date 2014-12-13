/* global BloomFilter, describe, it, expect, should */

describe('BloomFilter()', function () {
  'use strict';
  var hash1;
  var hash2;
  var hash3;
  var bloom;

  beforeEach(function() {
    //debugger;
    hash1 = Hash1;
    hash2 = Hash2;
    hash3 = Hash3;
    bloom = new BloomFilter(18, hash1, hash2, hash3);

  });


  it('checks if values may exist', function () {
    bloom.set("eric");
    bloom.set("zach");

    expect(bloom.check('eric')).to.equal(true);
    expect(bloom.check('zach')).to.equal(true);

  });

  it('return false for values that do not exist', function () {
    bloom.set("eric");
    bloom.set("zach");

    expect(bloom.check('marcus')).to.equal(false);
    expect(bloom.check('henry')).to.equal(false);

  });

  it('testing false positive rate', function () {
    var count=0;
    bloom.set('eric');
    bloom.set('zach');
    //bloom.set('marcus');
    //bloom.set('henry');
    //bloom.set('todd');

    for(var i=0;i<10000;i++){
      if(bloom.check('hi'+i)){
        count++;
      }
    }

    expect(count).to.equal(1530);
  });

  // Add more assertions here
});

var Hash1 = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
var Hash2 = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i) * 2;
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
var Hash3 = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i) * 3;
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
