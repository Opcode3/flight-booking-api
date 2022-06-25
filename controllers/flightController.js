const { uid, jsonReader, jsonWriter } = require('../helper/index');

// const initialize = () => {
    let flight_data;
    jsonReader(( data )=> {
        flight_data = data;
    })
// }

// initialize();


exports.getFlights = (req, res) => { // get all booked flight
    res.json(flight_data);
}

exports.getFlightById = (req, res) => { //get flight by id
    const id = req.params.id;
    let data = flight_data.filter( initial => initial.id == id);
    res.json(data)
}

exports.bookFlight = (req, res) => { // book a flight
    const data = req.body.data;
    data.id = uid(flight_data.length + 1);
    flight_data.push(data);
    jsonWriter(JSON.stringify(flight_data));
    res.json(data);
}

exports.updateFlight = (req, res, next) => { // edit booked flight via id
    const id = req.params.id;
    const data = req.body.data;

    let message = "unable to find flight record!";
    let status = 404;
    
    if(flight_data.length > 0 ){
        for(let i = 0; i < flight_data.length; i++){
            if(flight_data[i].id == id){
                if(data.title != null ) flight_data[i].title = data.title;
                if(data.time != null ) flight_data[i].time = data.time;
                if(data.price != null ) flight_data[i].price = data.price;
                message = flight_data[i];
                status = 200;
                break;
            }
        }
    }else{
        message = "no flight has been registered";
    }

    jsonWriter(JSON.stringify(flight_data));
    res.status(status).json(message)
}

exports.deleteFlight = (req, res) => { //delete booked flight via id
    const id = req.params.id;
    let message = "unable to find flight record!";
    let status = 404;
    if(flight_data.length > 0 ){
        for(let i = 0; i < flight_data.length; i++){
            if(flight_data[i].id == id){
                flight_data.splice(i, 1);
                message = "Flight is deleted";
                status = 200;
                break;
            }
        }
    }else{
        message = "no flight has been registered";
    }
    jsonWriter(JSON.stringify(flight_data));
    res.status(status).json({message});
}


