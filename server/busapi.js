
exports.CBusApi = function (nightmare) {

    var onPriceFound = function () { }

    getSearchSource = function* (query) {
        var src = yield exports.nightmare
            .goto('http://booking.polskibus.com/Pricing/SelectionsDynamic?SessionID=e3rllvrh10067285103rrqwkdtb&lang=PL&dbtype=MY&PC=')
            .wait()
            .select('#PricingForm_FromCity', query.from)
            .select('#PricingForm_ToCity', query.to)
            .evaluate(function (date) {
                $("#OutDate").val(date);
            }, query.date)
            .click('.btn-success')
            .wait('#btnSubmit')
            .evaluate(function () {
                return {
                    source: document.querySelector('body').innerHTML,
                    url: location.href
                };
            });
        return src;
    }



    function findLowestPrice(data) {

        var pos = 0;
        var prices = [];

        pos = data.source.indexOf("priceHilite", pos);
        while (pos != -1) {
            pos = data.source.indexOf(">", pos) + 1;
            let price = data.source.substr(pos, data.source.indexOf("<", pos) - pos).trim();
            prices.push(parseInt(price));

            pos = data.source.indexOf("priceHilite", pos);
        }
        return Math.min(...prices);
    }



    getPrices = function* (query) {
        var prices = [];
        for (let i = 1; i <= 31; i++) {

            let data = yield getSearchSource(query);
            let price = {
                price: getLowestPrice(data),
                url: data.url
            };
            prices.push(price);
            onPriceFound(prices);
        }

    }

    setOnPriceFound = function (func) {
        onPriceFound = func;
    }

    return {

        getPrices2: getPrices,
        onPriceFound: setOnPriceFound
    };


};