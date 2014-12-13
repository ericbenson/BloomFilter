var BloomFilter = function(m){
  this._storage = [];
  this._m = m;

  for(var i = 0; i < m; i++){
    this._storage.push(false);
  }

  this._hashFunctions = Array.prototype.slice.call(arguments, 1);
};

BloomFilter.prototype.set = function(k){
  for(var i = 0; i<this._hashFunctions.length; i++){
    this._storage[this._hashFunctions[i](k, this._m)] = true;
  }
};

BloomFilter.prototype.check = function(k){
  for(var i = 0; i<this._hashFunctions.length; i++){
    if(this._storage[this._hashFunctions[i](k, this._m)] === false){
      return false;
    }
  }
  return true;
};
