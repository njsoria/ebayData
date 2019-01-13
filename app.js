var request = require("request");

var options = { method: 'GET',
url: 'https://svcs.ebay.com/services/search/FindingService/v1',
qs: 
{ 'OPERATION-NAME': 'findItemsByKeywords',
    'SECURITY-APPNAME': 'devKore-devkore-PRD-c393cab7d-511d9e96',
    'RESPONSE-DATA-FORMAT': 'JSON',
    keywords: 'CA-3602 2.1'},
headers: 
{ 'Postman-Token': '712629e4-6ad6-4e7e-ad49-7a3606aafe46',
    'cache-control': 'no-cache' } 
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    body = JSON.parse(body);

    let price = 0;
    let itemCount = 0;

    for(var i=0; i<100; i++){
        try{
            let getPrice = body.findItemsByKeywordsResponse[0].searchResult[0].item[i].sellingStatus[0].currentPrice[0].__value__;
            console.log(i+': '+getPrice);
            if(getPrice > 0){
                let add = parseFloat(getPrice);
                price = price + add;
            }
            itemCount++;
        } catch (err) {
            console.log(i+': no price found');
        }

    }

    let avgPrice = price/itemCount;

    console.log(avgPrice);
});
