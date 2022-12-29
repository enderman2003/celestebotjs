const globals = {
    imgHash: {
        value: ''
    },
    bidWon: {
        value: false
    },
    bidExpired: {
        value: false
    },
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
    auctionTimeout: {
        value: 60,
        protected: true
    },
}

var timer;
var atimer;
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

function bidWon() {
    set_globals('auctionProcess', false)
    set_globals('bidderId', 0)
    set_globals('bidAmt', 0)
    set_globals('hostId', 0)
    set_globals('bidWon', true)
}

function bidExpired() {
    set_globals('auctionProcess', false)
    set_globals('bidderId', 0)
    set_globals('bidAmt', 0)
    set_globals('hostId', 0)
    set_globals('bidExpired', true)
}

export function auction_timer() { atimer = setTimeout(function() {bidExpired()}, get_globals('auctionTimeout') * 1000) }
export function bid_timer() { timer = setTimeout(function() {bidWon()}, get_globals('timeoutSec') * 1000) }
export function auction_timer_end() { clearTimeout(atimer) }
export function bid_timer_end() { clearTimeout(timer) }
  
