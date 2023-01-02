import { EmbedBuilder } from 'discord.js';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dxflwfledezyinanacmg.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Zmx3ZmxlZGV6eWluYW5hY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2OTczMzksImV4cCI6MTk4NTI3MzMzOX0.2aWmdFYDY_SBTMwNT1zeOGv-R_5uuBZEoVS9RxNCNaI'
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const WAIFU_CHANNEL = "1056425420746141708"

const globals = {
    imgHash: {
        value: ''
    },
    auctionProcess: {
        value: 'false'
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

async function bidWon(message, client) {
    var a_data = []
    const { adata, aerror } = await supabase
    .from('Discord minigame')
    .select('claimed_waifus')
    .eq('dis_id', message.author.id)
    console.log(message.author.id)
    for (var i=0; i<=adata[0].claimed_waifus.length; i++) { a_data.push(adata[0].claimed_waifus[i]) }

    const { data, error } = await supabase
    .from('Discord minigame')
    .select('amt')
    .eq('dis_id', message.author.id)
    var amount = data[0].amt - get_globals('bidAmt')

    a_data.push(get_globals('imgHash'))
    const { dat, err } = await supabase
    .from('Discord minigame')
    .update({ 'amt': amount, 'claimed_waifus': a_data })
    .eq('dis_id', message.author.id)

    var wonEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Bid Won')
    .setDescription(`Congratulations for winning the bid ${message.author.username}. \n ${get_globals('bidAmt')} :coin: has been deducted successfully`)
    .setImage('https://dxflwfledezyinanacmg.supabase.co/storage/v1/object/public/animenft/' + get_globals('imgHash'))
    .setFooter({ text: message.author.username });

    var channel = await client.channels.fetch(WAIFU_CHANNEL)
    channel.send({ embeds: [wonEmbed] })
    
    set_globals('auctionProcess', 'false')
    set_globals('imgHash', '')
    set_globals('bidderId', 0)
    set_globals('bidAmt', 0)
    set_globals('hostId', 0)
}

async function bidExpired(client) {
    var expireEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Auction Expired')
    .setDescription("The above has expired. Good luck next time")

    set_globals('imgHash', '')

    var channel = await client.channels.fetch(WAIFU_CHANNEL)
    channel.send({ embeds: [expireEmbed] })
    set_globals('auctionProcess', 'false')
    set_globals('bidderId', 0)
    set_globals('bidAmt', 0)
    set_globals('hostId', 0)
}

export function auction_timer(client) { atimer = setTimeout(async function() {await bidExpired(client)}, get_globals('auctionTimeout') * 1000) }
export function bid_timer(message, client) { timer = setTimeout(async function() {await bidWon(message, client)}, get_globals('timeoutSec') * 1000) }
export function auction_timer_end() { clearTimeout(atimer) }
export function bid_timer_end() { clearTimeout(timer) }
  
