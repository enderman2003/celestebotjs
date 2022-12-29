const globals = {
    auctionProcess: {
      value: false
    },
    bidAmt: {
      value: 0
    },  
    hostId: {
      value: 0
    },
    bidderId: {
      value: 0
    },
    timeoutSec: {
      value: 25,
      protected: true
    },
  }
  
  var timer;

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
  
  export function bid_expired() {
     set_globals('auctionProcess', false)
     set_globals('bidderId', 0)
     set_globals('bidAmt', 0)
     set_globals('hostId', 0)
     return true
  }

  export function timer_start() {
      timer = setTimeout(bidWon(), get_globals('timeoutSec') * 1000)
  }

  export function timer_end() {
      clearTimeout(timer);
  }
