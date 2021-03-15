
exports.setPromises = (shippingMethod, offDays, orderWeight)=>{
    var now_datetime = new Date();
    var nextDate = new Date();
    var nextBussinesDays = [];
    while(nextBussinesDays.length < 10){ //set nextBussinesDays
        nextDate.setDate(nextDate.getDate() + 1);
        var day = nextDate.getDate()
        var month = nextDate.getMonth() + 1
        var year = nextDate.getFullYear()

        if(month < 10){
          var date = `${year}-0${month}-${day}`
        }else{
          var date = `${year}-${month}-${day}`
        }

        if(offDays.indexOf(date) === -1){
            nextBussinesDays.push(date);
        }
    }
    
    var minWeight = shippingMethod.rules.availability.byWeight.min;
    var maxWeight = shippingMethod.rules.availability.byWeight.max;
    if(minWeight <= orderWeight && orderWeight <= maxWeight){ //validate weight
        var dayType = shippingMethod.rules.availability.byRequestTime.dayType;
        var fromTimeOfDay = shippingMethod.rules.availability.byRequestTime.fromTimeOfDay;
        var toTimeOfDay = shippingMethod.rules.availability.byRequestTime.toTimeOfDay;

        if(dayType === "ANY" || dayType === "BUSINESS" ){
            if(dayType === "BUSINESS"){
                var day = now_datetime.getDate()
                var month = now_datetime.getMonth() + 1
                var year = now_datetime.getFullYear()
                if(month < 10){
                  var date = `${year}-0${month}-${day}`
                }else{
                  var date = `${year}-${month}-${day}`
                }
                if(offDays.indexOf(date) !== -1){ //validate day type
                    var pack_promise_min = null;
                    var pack_promise_max = null;
                    var ship_promise_min = null;
                    var ship_promise_max = null;
                    var delivery_promise_min = null;
                    var delivery_promise_max = null;
                    var ready_pickup_promise_min = null;
                    var ready_pickup_promise_max = null;
                    return {
                        pack_promise_min: pack_promise_min,
                        pack_promise_max: pack_promise_max,
                        ship_promise_min: ship_promise_min,
                        ship_promise_max: ship_promise_max,
                        delivery_promise_min: delivery_promise_min,
                        delivery_promise_max: delivery_promise_max,
                        ready_pickup_promise_min: ready_pickup_promise_min,
                        ready_pickup_promise_max: ready_pickup_promise_max
                    }
                }
            }

            var now_datetime_hour = now_datetime.getHours();
            if(fromTimeOfDay <= now_datetime_hour && now_datetime_hour <= toTimeOfDay){ //validate time of day
                var cases = shippingMethod.rules.promisesParameters.cases;
                var priority = 1;
                for(var i = 0; i < cases.length; i++){
                    var dayType = cases[i].condition.byRequestTime.dayType;
                    var fromTimeOfDay = cases[i].condition.byRequestTime.fromTimeOfDay;
                    var toTimeOfDay = cases[i].condition.byRequestTime.toTimeOfDay;

                    if(dayType === "ANY" || dayType === "BUSINESS" ){
                        var cont = true
                        if(dayType === "BUSINESS"){
                            var day = now_datetime.getDate()
                            var month = now_datetime.getMonth() + 1
                            var year = now_datetime.getFullYear()

                            if(month < 10){
                              var date = `${year}-0${month}-${day}`
                            }else{
                              var date = `${year}-${year}month}-${day}`
                            }

                            if(offDays.indexOf(date) !== -1){ //validate day type
                                cont = false
                            }
                        }
                        if(cont){
                            if(fromTimeOfDay <= now_datetime_hour && now_datetime_hour <= toTimeOfDay){ //validate time of day
                                var workingCase = cases[i]
                                break
                            } else{
                                priority++
                            }
                        } else{
                            priority++
                        }
                    }
                }
                //pack_promise
                var minType = workingCase.packPromise.min.type;
                var minDeltaHours = workingCase.packPromise.min.deltaHours;
                var minDeltaBusinessDays = workingCase.packPromise.min.deltaBusinessDays;
                var minTimeOfDay = workingCase.packPromise.min.timeOfDay;
                var maxType = workingCase.packPromise.max.type;
                var maxDeltaHours = workingCase.packPromise.max.deltaHours;
                var maxDeltaBusinessDays = workingCase.packPromise.max.deltaBusinessDays;
                var maxTimeOfDay = workingCase.packPromise.max.timeOfDay;

                if(minType === "NULL"){
                    var pack_promise_min = null;
                }
                if(minType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + minDeltaHours)
                    var pack_promise_min = now_datetime.toUTCString();  //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - minDeltaHours)
                }
                if(minType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[minDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + minTimeOfDay) 
                    var pack_promise_min = finDate.toUTCString(); //set promise GMT
                }
                if(maxType === "NULL"){
                    var pack_promise_max = null;
                }
                if(maxType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + maxDeltaHours)
                    var pack_promise_max = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - maxDeltaHours)
                }
                if(maxType === "DELTA-BUSINESSDAYS"){
                   var initDate = nextBussinesDays[maxDeltaBusinessDays-1].split("-")
                   var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                   finDate.setHours(finDate.getHours() + maxTimeOfDay) 
                   var pack_promise_max = finDate.toUTCString(); //set promise GMT 
                }

                //ship_promise  
                var minType = workingCase.shipPromise.min.type;
                var minDeltaHours = workingCase.shipPromise.min.deltaHours;
                var minDeltaBusinessDays = workingCase.shipPromise.min.deltaBusinessDays;
                var minTimeOfDay = workingCase.shipPromise.min.timeOfDay;
                var maxType = workingCase.shipPromise.max.type;
                var maxDeltaHours = workingCase.shipPromise.max.deltaHours;
                var maxDeltaBusinessDays = workingCase.shipPromise.max.deltaBusinessDays;
                var maxTimeOfDay = workingCase.shipPromise.max.timeOfDay;

                if(minType === "NULL"){
                    var ship_promise_min = null;
                }
                if(minType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + minDeltaHours)
                    var ship_promise_min = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - minDeltaHours)
                }
                if(minType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[minDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + minTimeOfDay) 
                    var ship_promise_min = finDate.toUTCString(); //set promise GMT
                }
                if(maxType === "NULL"){
                    var ship_promise_max = null;
                }
                if(maxType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + maxDeltaHours)
                    var ship_promise_max = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - maxDeltaHours)
                }
                if(maxType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[maxDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + maxTimeOfDay) 
                    var ship_promise_max = finDate.toUTCString(); //set promise GMT
                }

                //delivery_promise  
                var minType = workingCase.deliveryPromise.min.type;
                var minDeltaHours = workingCase.deliveryPromise.min.deltaHours;
                var minDeltaBusinessDays = workingCase.deliveryPromise.min.deltaBusinessDays;
                var minTimeOfDay = workingCase.deliveryPromise.min.timeOfDay;
                var maxType = workingCase.deliveryPromise.max.type;
                var maxDeltaHours = workingCase.deliveryPromise.max.deltaHours;
                var maxDeltaBusinessDays = workingCase.deliveryPromise.max.deltaBusinessDays;
                var maxTimeOfDay = workingCase.deliveryPromise.max.timeOfDay;

                if(minType === "NULL"){
                    var delivery_promise_min = null;
                }
                if(minType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + minDeltaHours)
                    var delivery_promise_min = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - minDeltaHours)
                }
                if(minType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[minDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + minTimeOfDay) 
                    var delivery_promise_min = finDate.toUTCString(); //set promise GMT
                }
                if(maxType === "NULL"){
                    var delivery_promise_max = null;
                }
                if(maxType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + maxDeltaHours)
                    var delivery_promise_max = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - maxDeltaHours)
                }
                if(maxType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[maxDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + maxTimeOfDay) 
                    var delivery_promise_max = finDate.toUTCString(); //set promise GMT
                }

                //ready_pickup_promise
                var minType = workingCase.readyPickUpPromise.min.type;
                var minDeltaHours = workingCase.readyPickUpPromise.min.deltaHours;
                var minDeltaBusinessDays = workingCase.readyPickUpPromise.min.deltaBusinessDays;
                var minTimeOfDay = workingCase.readyPickUpPromise.min.timeOfDay;
                var maxType = workingCase.readyPickUpPromise.max.type;
                var maxDeltaHours = workingCase.readyPickUpPromise.max.deltaHours;
                var maxDeltaBusinessDays = workingCase.readyPickUpPromise.max.deltaBusinessDays;
                var maxTimeOfDay = workingCase.readyPickUpPromise.max.timeOfDay;

                if(minType === "NULL"){
                    var ready_pickup_promise_min = null;
                }
                if(minType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + minDeltaHours)
                    var ready_pickup_promise_min = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - minDeltaHours)
                }
                if(minType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[minDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + minTimeOfDay) 
                    var ready_pickup_promise_min = finDate.toUTCString(); //set promise GMT
                }
                if(maxType === "NULL"){
                    var ready_pickup_promise_max = null;
                }
                if(maxType === "DELTA-HOURS"){
                    now_datetime.setHours(now_datetime.getHours() + maxDeltaHours)
                    var ready_pickup_promise_max = now_datetime.toUTCString(); //set promise GMT
                    now_datetime.setHours(now_datetime.getHours() - maxDeltaHours)
                }
                if(maxType === "DELTA-BUSINESSDAYS"){
                    var initDate = nextBussinesDays[maxDeltaBusinessDays-1].split("-")
                    var finDate = new Date(parseInt(initDate[0]), parseInt(initDate[1])-1, parseInt(initDate[2]))
                    finDate.setHours(finDate.getHours() + maxTimeOfDay) 
                    var ready_pickup_promise_max = finDate.toUTCString(); //set promise GMT
                } 
            } else{
                var pack_promise_min = null;
                var pack_promise_max = null;
                var ship_promise_min = null;
                var ship_promise_max = null;
                var delivery_promise_min = null;
                var delivery_promise_max = null;
                var ready_pickup_promise_min = null;
                var ready_pickup_promise_max = null;
                return {
                    pack_promise_min: pack_promise_min,
                    pack_promise_max: pack_promise_max,
                    ship_promise_min: ship_promise_min,
                    ship_promise_max: ship_promise_max,
                    delivery_promise_min: delivery_promise_min,
                    delivery_promise_max: delivery_promise_max,
                    ready_pickup_promise_min: ready_pickup_promise_min,
                    ready_pickup_promise_max: ready_pickup_promise_max
                }
            }
        }
    } else{
        var pack_promise_min = null;
        var pack_promise_max = null;
        var ship_promise_min = null;
        var ship_promise_max = null;
        var delivery_promise_min = null;
        var delivery_promise_max = null;
        var ready_pickup_promise_min = null;
        var ready_pickup_promise_max = null;
        return {
            pack_promise_min: pack_promise_min,
            pack_promise_max: pack_promise_max,
            ship_promise_min: ship_promise_min,
            ship_promise_max: ship_promise_max,
            delivery_promise_min: delivery_promise_min,
            delivery_promise_max: delivery_promise_max,
            ready_pickup_promise_min: ready_pickup_promise_min,
            ready_pickup_promise_max: ready_pickup_promise_max
        }
    }
    return {
        pack_promise_min: pack_promise_min,
        pack_promise_max: pack_promise_max,
        ship_promise_min: ship_promise_min,
        ship_promise_max: ship_promise_max,
        delivery_promise_min: delivery_promise_min,
        delivery_promise_max: delivery_promise_max,
        ready_pickup_promise_min: ready_pickup_promise_min,
        ready_pickup_promise_max: ready_pickup_promise_max
    }
}