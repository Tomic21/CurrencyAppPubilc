import React, { useState, useEffect } from 'react'

import "./Calcualtor.css"



function Calculator() {
    //state variables---------------------------------------------------------------------
    const [value, setvalue] = useState("")
    const [currentvalue, setcurrentvalue] = useState("")
    const [dataOfValues, setdataOfValues] = useState([])
    const data = [
        [["dol", "dol", "dl", "$"],
        ["HRV", "BIH", "EUR"],
        ["kn", "KM", "€"], "USD"],

        [["km", "mar", "kon", "bam"],
        ["HRV", "EUR", "USD"],
        ["kn", "€", "$"], "BIH"],

        [["eu", "eur", "€"],
        ["HRV", "BIH", "USD"],
        ["kn", "KM", "$"], "EUR"],

        [["kn", "kun"],
        ["BIH", "EUR", "USD"],
        ["KM", "€", "$"], "HRV"],
    ]
    const [first, setfirst] = useState("")
    const [second, setsecond] = useState("")
    const [third, setthird] = useState("")
    //other variables---------------------------------------------------------------------
    const [firstData, setfirstData] = useState("")
    const [secondData, setsecondData] = useState("")
    const [thirdData, setthirdData] = useState("")





    //lifecycle---------------------------------------------------------------------
    useEffect(() => {
        authenticateBeforeCall()
        if (value === "") {
            setfirst("")
            setsecond("")
            setthird("")
            setfirstData("")
            setsecondData("")
            setthirdData("")
        }
    }, [value])






    //functions---------------------------------------------------------------------
    function authenticateBeforeCall() {
        let valueWithoutNumbers = value.replace(/[^a-z]/gi, '');

        data.forEach(element => {
            if (element[0].includes(valueWithoutNumbers.toLowerCase())) {
                getData(element[3], element[1], element[2])
            }
        });
    }

    function getData(dataToGet, arrayOfDataToget, setDataArray) {
        var finallValue = value.replace(/\D/g, "");
        console.log(dataToGet)
        console.log(currentvalue)
        if (currentvalue !== dataToGet) {
            fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=59a9bb20-5761-11ec-9f0f-191f2ce917c6&base_currency=${dataToGet}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    setdataOfValues(data)
                    setcurrentvalue(dataToGet)
                    setData(data)

                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            setData(dataOfValues)
        }


        function setData(data) {
            setfirst((parseFloat(data.data[arrayOfDataToget[0]]) * parseFloat(finallValue)).toFixed(2))
            setsecond((parseFloat(data.data[arrayOfDataToget[1]]) * parseFloat(finallValue)).toFixed(2))
            setthird((parseFloat(data.data[arrayOfDataToget[2]]) * parseFloat(finallValue)).toFixed(2))

            setfirstData(setDataArray[0])
            setsecondData(setDataArray[1])
            setthirdData(setDataArray[2])
        }
    }



    //return JSX---------------------------------------------------------------------
    return (
        <div className="container">
            <input className="container__input" type="text" value={value} onChange={(e) => {
                setvalue(e.target.value)
            }} />
            <h1 className="container__text">{first} {firstData}</h1>
            <h1 className="container__text">{second} {secondData}</h1>
            <h1 className="container__text">{third} {thirdData}</h1>
        </div>
    )
}

export default Calculator
