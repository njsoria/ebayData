const request = require("request");

var options = { method: 'GET',
url: 'https://svcs.ebay.com/services/search/FindingService/v1',
qs: 
{ 'OPERATION-NAME': 'findItemsByKeywords',
    'SECURITY-APPNAME': 'devKore-devkore-PRD-c393cab7d-511d9e96',
    'RESPONSE-DATA-FORMAT': 'JSON',
    keywords: 'DELL 43 ULTRA HD 4K'},
headers: 
{ 'Postman-Token': '712629e4-6ad6-4e7e-ad49-7a3606aafe46',
    'cache-control': 'no-cache' } 
};

//we'll use request to make the API calls to eBay
function getPrice(options, callback){
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        //turn the response into a JSON object
        body = JSON.parse(body);

        //let's add up the prices we get
        let price = 0;

        //let's track how many items actually have a listing price
        let itemCount = 0;

        //loop through the 100 items returned
        for(var i=0; i<100; i++){
            //lets see if we can get a listing price value
            try{
                //if we're successful then assign it to an easier to use var
                let getPrice = body.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__;
                console.log(i+': '+getPrice);
                
                // as long as the listing price isn't at 0 then let's
                // add it to the total price
                if(getPrice > 0){
                    let add = parseFloat(getPrice);
                    price = price + add;
                }

                // increase item counter
                itemCount++;
            } catch (err) {
                // let us know if it didn't find a price
                console.log(i+': no price found');
            }

        }

        // divide the summed up price the the items added
        let avgPrice = price/itemCount;

        // show us the price
        console.log(avgPrice);

        callback(null, avgPrice);
    });
}

getPrice(options, function(err, body){
    if (err) { console.log(err)}
    else { console.log(body)}
});

