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
  
  export function get_globals(global) {
    // return variable or false if not exists
    return globals[global] && globals[global].value ? globals[global].value : false;
  };
  
  export function set_globals(global, value) {
    // exists and is protected: return false
    if (globals[global] && globals[global].protected && globals[global].protected === true)
      return false;
    // set global and return true
    globals[global] = { value: value };
    return true;
  };