const fetchToken = async () => {
    // Token Names
    let apiCall = 'tokens'
    let url = `https://dutchx.d.exchange/api/v1/${apiCall}`

    const tokenPairs = []
    let i = 0
    const response = await fetch(url)
    const data = await response.json();
    const result = data.data
    for (let i of result) {
        tokenPairs.push([i.symbol, i.address, i.name, i.decimals])
    }
    const tokenPairs2 = {}
    // // Last auction price, whichever came last
    try
    {
        for (let token of tokenPairs) {
            let apiCall2 = `WETH-${token[1]}/prices/closing?count=2`
            let url2 = `https://dutchx.d.exchange/api/v1/markets/${apiCall2}`
            const response2 = await fetch(url2)
            const data2 = await response2.json();
            // const price = data2
            // const changePrice = data2.priceIncrement
            // const index = data2.auctionIndex
            tokenPairs2[token[0]] = data2
            
        }
    } 
    catch(e) 
    {
        console.log(e)
    }
    const tokenPairs3 = {}
    try
    {
        for (let token of tokenPairs) {
            let apiCall3 = `${token[1]}-WETH/prices/closing?count=2`
            let url3 = `https://dutchx.d.exchange/api/v1/markets/${apiCall3}`
            const response3 = await fetch(url3)
            const data3 = await response3.json();
            // const price = data2
            // const changePrice = data2.priceIncrement
            // const index = data2.auctionIndex
            tokenPairs3[token[0]] = data3
            
        }
    } 
    catch(e) 
    {
        console.log(e)
    }

    // console.log(tokenPairs2)
    // console.log("###")
    // console.log(tokenPairs3)
    const tokenPairSum = []
    tokenPairSum.push(tokenPairs2, tokenPairs3)
    // console.log(tokenPairs2)
    // console.log(tokenPairs2['DAI'][0])
    // console.log("complete")
    return tokenPairSum
    // // change in price
    // // Volume of last cleared auction
    // // change in volume

}

export default fetchToken;