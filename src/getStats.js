const getStats = async () => {
    
    // Create Hashtable with UNIX timestamp of 00:00 of each of the previous 30 days as key
    //const dateVolumeHash = {}
    
    // Get current date
    const date = new Date();
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear();
    
    
    // Get Date time of today 00:00
    const newDate = new Date(year, month, day);
    if (day / 10 < 1) {
        day = `0${day}`
    }

    // Input 0 infront of day and month if not present
    if (month / 10 < 1) {
        month = `0${month + 1}`
    }
    
    // Convert Date time to timestamp
    const timestamp = (newDate.getTime() / 1000).toFixed(0)
    
    
    // Calc last x dates and store in hashTable
    const days = 60
    let i = 1
    
    const timeStamps = {}
    const apiDates = {}
    let x = timestamp;
    let apiDate = `${year}-${month}-${day}` 

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

        // for frontend readability
        let convPrevDate = `${day}-${month}`

        let response = await fetch(url2)
        let data = await response.json();
        apiDates[convPrevDate] = data.data
       
        
        // add timestmap to hash
        // timeStamps[x] = 0

        // add apiDate to hash

        // Reset x and apiDate
        
        x = previousTimestamp
        apiDate = previousApiDate
        i++;
    }
    
    // ########### TOTAL DAILY VOLUME  ###############

    const totalDailyVolumes = {}
    // // Set keys of daily Volumes
    // Object.keys(apiDates).forEach(key => {
    //     totalDailyVolumes[key] = 0;
    // })
    Object.keys(apiDates).forEach((key) => {
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
    return totalDailyVolumes;
}

 export default getStats;


   