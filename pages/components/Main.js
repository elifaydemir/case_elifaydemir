import {useEffect, useState} from "react";
import Image from 'next/image';
import validator from 'validator';

function Main(){
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [flight, setFlight] = useState(null);
    const [flightStatus, setFlightStatus] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [informationText, setInformationText] = useState(true);
    const [firstStep, setFirstStep] = useState(false);
    const [success, setSuccess] = useState(false);
    const [flightText, setFlightText] = useState(true);
    const [flightOperations, setFlightOperations] = useState(false);
    const [flightTripType, setFlightTripType] = useState();
    const [flightAirLine, setFlightAirLine] = useState();
    const [flightNumber, setFlightNumber] = useState();
    const [flightDuration, setFlightDuration] = useState();
    const [flightDeparture, setFlightDeparture] = useState();
    const [flightStop, setFlightStop] = useState();
    const [flightFee, setFlightFee] = useState();
    const [flightTotal, setFlightTotal] = useState();
    const [flightSubTotal, setFlightSubTotal] = useState();
    const [checkEmail, setCheckEmail] = useState(null);
    const [checkName, setCheckName] = useState(null);
    const [checkSurname, setCheckSurname] = useState(null);
    const [warningTextName, setWarningTextName] = useState();
    const [warningTextSurname, setWarningTextSurname] = useState();
    const [warningTextEmail, setWarningTextEmail] = useState();
    const [inputClassName, setInputClassName] = useState();
    const [inputClassSurname, setInputClassSurname] = useState();
    const [inputClassEmail, setInputClassEmail] = useState();
    let sendUrl = 'https://zitfutnmyicch2zrixpqkp6l6u0hfwcz.lambda-url.eu-central-1.on.aws/';

    const addToFlight = async (trip_type, airline, flight_number, duration, departure_time, arrival_time, stop_detail, fee, total, subTotal) => {
        //bu fonksiyon ucusların listelendiği alanda kullanıcı bir ucusu secmek istediğinde ve ona tıkladıgında tetiklenen fonsiyon. Burada seçili uçusun bilgilerini statelerine set ediyorum.
        setFlightStatus(true);
        setFlightTripType(trip_type);
        setFlightAirLine(airline);
        setFlightNumber(flight_number);
        setFlightDuration(duration);
        setFlightDeparture(departure_time + " - " + arrival_time);
        setFlightStop(stop_detail);
        setFlightFee(fee);
        setFlightTotal(total);
        setFlightSubTotal(subTotal);
    }

    const sendInformation = async (name, surname, email, address) => {
      //I checked the null state of the inputs when it submits. That's why I sent the data to control before posting.
        if(!name){
            textNameChange('');
        }
        if(!surname){
            textSurnameChange('');
        }
        if(!email){
           textEmailChange('');
        }
        //If the control of the inputs is provided, I have posted the data in the desired structure.
        //I set the state that I control the page structure with the results returned from here, that is, the FirstStep state.
        // I also set the Success state to separate whether the page to return the result will success or not.
        else {
            const rest = await fetch(sendUrl, {
                method: 'POST',
                body: JSON.stringify({name, surname, email, address})
            });
            const json = await rest.json();
            if(json.message){
                setFirstStep(true);
                setSuccess(true);
            } else {
                setFirstStep(true);
                setSuccess(false);
            }
        }
    }
    const textNameChange = (val) => {
        //Here I provided the controls with the validator package.
        //I return a different error message if there is a spelling in the wrong structure, and a different error message if it is left blank. I checked the null state when it submits. That's why I post the data here for rechecking in the area I posted.
        //I wrote a separate control function for each input. because I needed to define and send the warning text and the classname to style the input in separate states.

        if(validator.isAlpha(val)){
            setName(val);
            setCheckName(false);
            setInputClassName();
        } else {
            setName(val);
            setCheckName(true);
            setWarningTextName('Please enter correct name value');
            setInputClassName('active');
        }if(validator.isEmpty(val)){
            setName(val);
            setCheckName(true);
            setWarningTextName('Please enter the name');
            setInputClassName('active');
        }

    }
    const textSurnameChange = (val) => {
        //Here I provided the controls with the validator package.
        //I return a different error message if there is a spelling in the wrong structure, and a different error message if it is left blank. I checked the null state when it submits. That's why I post the data here for rechecking in the area I posted.
        //I wrote a separate control function for each input. because I needed to define and send the warning text and the classname to style the input in separate states.

        if(validator.isAlpha(val)){
            setSurname(val);
            setCheckSurname(false);
            setInputClassSurname();
        } else {
            setSurname(val);
            setCheckSurname(true);
            setWarningTextSurname('Please enter correct surname value');
            setInputClassSurname('active');
        }if(validator.isEmpty(val)){
            setName(val);
            setCheckName(true);
            setWarningTextSurname('Please enter the surname');
            setInputClassSurname('active');
        }
    }
    const textEmailChange = (val) => {
        //Here I provided the controls with the validator package.
        //I return a different error message if there is a spelling in the wrong structure, and a different error message if it is left blank. I checked the null state when it submits. That's why I post the data here for rechecking in the area I posted.
        //I wrote a separate control function for each input. because I needed to define and send the warning text and the classname to style the input in separate states.

        if(validator.isEmail(val)){
            setEmail(val);
            setCheckEmail(false);
            setInputClassEmail();
        } else {
            setEmail(val);
            setCheckEmail(true);
            setWarningTextEmail('Please enter correct email value');
            setInputClassEmail('active');
        }if(validator.isEmpty(val)){
            setName(val);
            setCheckName(true);
            setWarningTextEmail('Please enter the email');
            setInputClassEmail('active');
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "https://sd26cjicx5izxcazmcjs6f6hpi0zcexq.lambda-url.eu-central-1.on.aws/");
            const flightData = await res.json();
            setFlight(flightData);
        };
        fetchData();
    }, []);


    //Since I will make the page a single page, I divided the page into multiple structures with the help of state.
    // If firstStep is true, I printed the page that returned us from the endpoint as successful or unsuccessful.When we send the information filled in the form on this page to the endpoint, if the result is correct, it goes to the other selection, if not an option.
    //If fisrtStep is false, I set up the structure to print the flight listing page and the form page. thus, this area went into divisions within itself.
    //If flightOperations is true in the first condition, we push the form field to col-md-9. If false, we print the field where the flights are listed.
    //We print the invoice part showing the flight information in the remaining col-md-3 field. If the control data here returns true, it is printed.
    //I placed the contents of the fields using the Map structure with the data returned from the endpoint.
    // Frankly, I did not understand how the pictures were determined here, so I placed them according to airports.

    return (
        <div className="main-container container">
            {firstStep ? (
                <>
                    { success ? (
                        <div className="alert-success-box">
                            <span className="alert-text">Your flight has been booked successfully! Have a great trip! <button onClick={() => setFirstStep(null)}><span className="fal fa-times"></span></button></span>
                            <Image src="/images/bag.png" width={800} height={919} />
                        </div>
                    ):(
                        <div className="alert-warning-box">
                            <span className="alert-text">Your credit card payment was rejected by your bank. Please try again and contact your bank for assistance. <button onClick={() => setFirstStep(null)}><span className="fal fa-times"></span></button></span>
                            <Image src="/images/bg-uzayli.png" width={1440} height={722} />
                        </div>
                    )}

                </>
            ):(
                <>
                    {flightText ? (
                        <>
                            <div className="title">
                                <h1>First class travel at economy prices</h1>
                                { informationText ? (
                                    <span>Select a tour that suits you below.</span>
                                ):("") }
                            </div>
                            <div className="flight-status">
                                <div className="row px-0 mx-0">
                                    <div className="col-12 col-md-9 pl-0">
                                        {flightOperations ? (
                                            <>
                                                <div className="flight-information">
                                                    <h3>Passenger Information</h3>
                                                    <span className="text">The information below is needed to  <br />
book your vacation.</span>
                                                    <div className="form-group">
                                                        <input id="name" className={ inputClassName } name="name" value={name} onChange={(e) => textNameChange(e.target.value)}  required autoComplete={"off"} type="text" placeholder="Name*" />
                                                        { checkName ? ( <span className="danger">{warningTextName}</span> ):(null)}
                                                    </div>
                                                    <div className="form-group">
                                                        <input id="surname" className={ inputClassSurname } name="surname" value={surname} onChange={(e) => textSurnameChange(e.target.value)}  required autoComplete={"off"} type="text" placeholder="surname*" />
                                                        { checkSurname ? ( <span className="danger">{warningTextSurname}</span> ):(null)}
                                                    </div>
                                                    <div className="form-group">
                                                        <input id="email" className={ inputClassEmail } name="email" value={email} onChange={(e) => textEmailChange(e.target.value)} required autoComplete={"off"} type="email" placeholder="Email*" />
                                                        { checkEmail ? ( <span className="danger">{warningTextEmail}</span> ):(null)}
                                                    </div>
                                                    <div className="form-group">
                                                        <input id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required autoComplete={"off"} type="text" placeholder="Address*" />
                                                    </div>
                                                    <div className="form-group">
                                                        <button onClick={() => sendInformation(name, surname, email, address)}>Submit</button>
                                                    </div>
                                                </div>
                                            </>
                                        ):(
                                            <div className="flight-operations">
                                                { flight ? (
                                                    <>
                                                        {flight.map((flights, index) => (
                                                            <>
                                                                    <div className="box"  key={index.toString()}>
                                                                        <button onClick={() => (addToFlight( flights.trip_type, flights.airline, flights.flight_number, flights.duration, flights.departure_time, flights.arrival_time, flights.stop_detail, flights.price.fees, flights.price.total, flights.price.subTotal))}>
                                                                            <div className="box-content">
                                                                                <div className="box-image">
                                                                                    {flights.airline == 'Hawaiian Airlines' ? (
                                                                                        <Image src="/images/round-trip.svg" alt="Round Trip" width={40} height={40} />
                                                                                    ):(
                                                                                        <Image src="/images/flight-trip.svg" alt="Fligt Trip" width={40} height={32} />
                                                                                    )}
                                                                                </div>
                                                                                <div className="box-title">
                                                                                    <span className="duration-time">{flights.duration}</span>
                                                                                    <span className="airline">{flights.airline}</span>
                                                                                </div>
                                                                                <div className="box-time">
                                                                                    <span>{flights.departure_time} - {flights.arrival_time}</span>
                                                                                </div>
                                                                                <div className="box-stop">
                                                                                    {flights.stop ? (
                                                                                        <>
                                                                                            <span className="non-stop">{flights.stop}</span>
                                                                                            <span className="stop-details">{flights.stop_detail}</span>
                                                                                        </>
                                                                                    ):(
                                                                                        <span className="non-stop">
                                                                            Non-stop
                                                                           </span>
                                                                                    )}
                                                                                </div>
                                                                                <div className="box-price">
                                                                       <span className="price-details">
                                                                           {flights.price.total}
                                                                       </span>
                                                                                    <span className="price-trip-type">
                                                                           {flights.trip_type}
                                                                       </span>
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                            </>
                                                        ))}
                                                    </>
                                                ):(
                                                    <div>Bekleniyor</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    { flightStatus ? (
                                        <div className="col-md-3 pr-0">
                                            <div className="flight-status-airplane">
                                                <div className="airplane-image">
                                                    {flightAirLine == 'Hawaiian Airlines' ? (
                                                        <Image src="/images/round-trip.svg" alt="Round Trip" width={40} height={40} />
                                                    ):(
                                                        <Image src="/images/flight-trip.svg" alt="Round Trip" width={40} height={40} />
                                                    )}
                                                </div>
                                                <div className="airplane-title">
                                                    <h2>{flightAirLine}</h2>
                                                    <span>{flightNumber}</span>
                                                </div>
                                                <div className="airplane-time">
                                                    <h2>{flightDuration}</h2>
                                                    <span>{flightDeparture}</span>
                                                    <span className="dark-purple">{flightStop}</span>
                                                </div>
                                            </div>
                                            <div className="taxes-fee">
                                                <ul>
                                                    <li><span className="title">Subtotal</span><span className="fee">{flightSubTotal}</span></li>
                                                    <li><span className="title">Taxes and Fees</span><span className="fee">{flightFee}</span></li>
                                                    <li><span className="title">Total</span><span className="fee">{flightTotal}</span></li>
                                                </ul>
                                                <button onClick={() => (setFlightOperations(true))}>Next</button>
                                            </div>
                                        </div>
                                    ):(
                                        ""
                                    )}
                                </div>
                            </div>
                        </>
                    ):(
                        ""
                    )}
                </>
            )}
        </div>
    )
}
export default Main;
