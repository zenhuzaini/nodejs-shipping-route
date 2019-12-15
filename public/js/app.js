//SOURCE LOCATION
const sourceLocationForm = document.querySelector('#sourceLocation')
const sourceLocationButton = document.querySelector('#sourceLocationButton')
const messageOne = document.querySelector('#message-1')
const search = document.querySelector('#getInputLocation')

//DESTINATION
const destinationLocationForm = document.querySelector('#destination')
const destinationButton = document.querySelector('#destinationButton')
const messageTwo = document.querySelector('#message-2')
const searchDestination = document.querySelector('#getInputDestination')
let destinationValue = []

//GET the route


//get FIRST LOCATION
const firstLocation = (GetAddress) => {
    messageOne.textContent = '..loading..'

    //select the p (messageID) in order to be a place to put the iformtion
    fetch(`/setsource?source=${GetAddress}`).then((response) => {
        response.json().then((theNewInformation) => {
            if (theNewInformation.error) {
                console.log(theNewInformation.error)
                messageOne.textContent = JSON.stringify(theNewInformation.error)
            } else {
                console.log(theNewInformation)
                messageOne.textContent = `For ${search.value}, the longitude is ${theNewInformation.longitude} and latitude is ${theNewInformation.latitude}`
                document.getElementById('destinationGroup').style.display = "block";
            }
        })
    })

}

//add event listener for first form
sourceLocationForm.addEventListener('submit', (e) => { //e : event object
    e.preventDefault(); //we told the browser to stop loading because we will handle it
    const location = search.value
    firstLocation(location)
})

//get DESTINATIONs
const destinationLocation = (GetAddress) => {
    messageTwo.textContent = '..loading..'
    //select the p (messageID) in order to be a place to put the iformtion
    fetch(`/setdestination?destination=${GetAddress}`).then((response) => {
        response.json().then((theNewInformation) => {
            if (theNewInformation.error) {
                console.log(theNewInformation.error)
                messageTwo.textContent = JSON.stringify(theNewInformation.error)
            } else {
                messageTwo.textContent = 'list of destinations : '
                console.log(theNewInformation)

                destinationValue.push(searchDestination.value)

                var p = document.createElement("p");
                theNewInformation.forEach((element, index) => {
                    p.innerHTML = `For ${destinationValue[index]}, the longitude is ${element.longitude} and latitude is ${element.latitude}<br>`;
                    document.body.appendChild(p)
                });

                document.getElementById('buttonRoute').style.display = "block";


            }
        })
    })
}

destinationLocationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchDestination.value
    console.log(searchDestination.value)
    destinationLocation(location)
})

//GET routes
const getRoutes = () => {
    fetch()
}


