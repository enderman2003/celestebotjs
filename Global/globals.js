const globals = {
  auctionProcess: {
    value: false
  },
  bid_amt: {
    value: 0
  },
  hostId: {
    value: 0
  },
}

exports.get = function(global) {
  // return variable or false if not exists
  return globals[global] && globals[global].value ? globals[global].value : false;
};

exports.set = function(global, value) {
  // exists and is protected: return false
  if (globals[global] && globals[global].protected && globals[global].protected === true)
    return false;
  // set global and return true
  globals[global] = { value: value };
  return true;
};
