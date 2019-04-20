import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ethers } from 'ethers';
import dxABI from './Dx-abi'
import { decode } from 'punycode';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const testFunction = async () => {
    
    // Create Hashtable with UNIX timestamp of 00:00 of each of the previous 30 days as key
    //const dateVolumeHash = {}
    
    // Get current date
    const date = new Date();
    console.log(date)
    let day = date.getDate()
    let month = date.getMonth()
    console.log(`Month: ${month}`)
    let year = date.getFullYear();
    
    console.log(day + " " + month + " " + year)
    
    // Get Date time of today 00:00
    const newDate = new Date(year, month, day);
    console.log(newDate)
    console.log("######")
    if (day / 10 < 1) {
        day = `0${day}`
    }
    console.log(day)

    // Input 0 infront of day and month if not present
    if (month / 10 < 1) {
        month = `0${month + 1}`
    }
    
    // Convert Date time to timestamp
    const timestamp = (newDate.getTime() / 1000).toFixed(0)
    console.log(timestamp)
    
    
    // Calc last 14 dates and store in hashTable
    const days = 2
    let i = 1
    
    const timeStamps = {}
    const apiDates = {}
    let x = timestamp;
    let apiDate = `${year}-${month}-${day}` 
    console.log(apiDate)

    while (i <= days) {
        
        // Calc Previous date time
        const previousTimestamp = x - 86400
        const previousDate = new Date (previousTimestamp * 1000)
        
        // Calc for DutchX API
        day = previousDate.getDate()
        if (day / 10 < 1) {
            day = `0${day}`
        }

        month = previousDate.getMonth()
        if (month / 10 < 1) {
            month = `0${month + 1}`
        }
        year = previousDate.getFullYear();
        //2019-04-01
        const previousApiDate = `${year}-${month}-${day}` 

        
        // Fetch the token info

        // Get all auction between a specific time frame
        const buyToken = 'WETH'
        const sellToken = '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
        let url2 = `https://dutchx.d.exchange/api/v1/auctions/cleared?fromDate=${previousApiDate}&toDate=${previousApiDate}`

        let response = await fetch(url2)
        let data = await response.json();
        console.log(data)
        apiDates[previousApiDate] = data.data
       
        
        // add timestmap to hash
        // timeStamps[x] = 0

        // add apiDate to hash

        // Reset x and apiDate
        
        x = previousTimestamp
        apiDate = previousApiDate
        i++;
    }
    console.log(timeStamps)
    console.log(apiDates)
    
    // ########### TOTAL DAILY VOLUME  ###############

    const totalDailyVolumes = {}
    // // Set keys of daily Volumes
    // Object.keys(apiDates).forEach(key => {
    //     totalDailyVolumes[key] = 0;
    // })
    Object.keys(apiDates).forEach((key) => {
        console.log(key)
        totalDailyVolumes[key] = {
            total:  0
        }
        // If sell token address is WETH
        Object.keys(apiDates[key]).forEach((key2) => {
            const auction = apiDates[key][key2]
            
            // If auction sell address does not exist as key of totalDaily Volume
            if (typeof totalDailyVolumes[key][auction.sellTokenAddress] === 'undefined') {
                if (auction.sellTokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && typeof totalDailyVolumes[key][auction.buyTokenAddress] === 'undefined') {
                    totalDailyVolumes[key][auction.buyTokenAddress] = auction.sellVolume
                    totalDailyVolumes[key]['total'] += auction.sellVolume
                } 
                else if (auction.sellTokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" && typeof totalDailyVolumes[key][auction.buyTokenAddress] !== 'undefined') {
                    totalDailyVolumes[key][auction.buyTokenAddress] += auction.sellVolume
                    totalDailyVolumes[key]['total'] += auction.sellVolume
                }
                else 
                {
                    totalDailyVolumes[key][auction.sellTokenAddress] = auction.sellVolume * auction.closingPrice
                    totalDailyVolumes[key]['total'] += auction.sellVolume * auction.closingPrice
                }
            } 
            else 
            {
                if (auction.sellTokenAddress === "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
                    totalDailyVolumes[key][auction.buyTokenAddress] += auction.sellVolume
                    totalDailyVolumes[key]['total'] += auction.sellVolume
                } 
                else 
                {
                    totalDailyVolumes[key][auction.sellTokenAddress] += auction.sellVolume * auction.closingPrice
                    totalDailyVolumes[key]['total'] += auction.sellVolume * auction.closingPrice
                }
            }

            
        })
    })
    console.log(totalDailyVolumes)
    
    
    
}
const getTokenPairs = async () => {
    //Get all token pairs

    let apiCall = 'tokens'
    let url = `https://dutchx.d.exchange/api/v1/${apiCall}`

    const tokenPairs = {}
    let i = 0
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        const result = myJson.data
        for (i in result) {
            tokenPairs[result[i].symbol] = {
                address: result[i].address,
                name: result[i].name,
                decimal: result[i].decimals
            }
        }
    });
    console.log(tokenPairs)
    return tokenPairs
 }

testFunction();



// async function getContract() {
        // Create Wallet
    // const privateKey = "0xb0deca206101914cf0bb59d31082078543815d31abcc784c98dc9e05c375767e"
    // console.log(privateKey)
    
    
    // // Connected Wallet with Mainet
    // let provider = ethers.getDefaultProvider();
    // let walletWithProvider = new ethers.Wallet(privateKey, provider);
    // console.log(await provider.getBlockNumber())
    // console.log(await walletWithProvider.getTransactionCount())


//     // Initiate DutchExchange.sol contract
//     const dxAdress = "0x2bAE491B065032a76BE1dB9e9eCf5738aFAe203E"
//     const dxContract = new ethers.Contract(dxAdress, dxABI, provider);
//     const testy = await dxContract.getClearingTime( '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', 87)
//     //console.log(testy)

//     // Get all emits of the event when an Auction is cleard
//     // initiation date = 7189410

//     const filter = {
//         address: dxAdress.address,
//         fromBlock: 7189410,
//         toBlock: 7203556,
//         topics: [dxContract.interface.events.AuctionCleared.topic]
//     };
//     let logs = await provider.getLogs(filter);

//     // dxContract.on("AuctionCleared", (event) => {
//     //     console.log(event);
//     // }).then(result => {
//     //     console.log(result)
//     // })
// }