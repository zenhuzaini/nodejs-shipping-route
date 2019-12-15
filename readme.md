A small web service that takes the source and a list of destinations and returns a list of routes between source and each destinations. Both source and destination are defined as a pair of latitude and longitude. The returned list of routes is sorted by driving time and distance (if time is equal).

It is a very simple web app that can help traces the shipping route
This web app is build using Nodejs, Express and 2 libraries: OSRM API and Mapbox
OSRM API is an open source API that can enable the developer to get complete shippng route information that includes driving time and distance
Mapbox is also a free API that can let the developer to translate the given address into longitude and latitude (and reverse it)

#There are two ways of using this simple web app
1. We ca access directly from the homepage
in order to get the route we must:
- go to the homepage
- fill the source address
- fill the destination address (can be more than one), 
- and click Get Route button

2. We can directly use the endpoint
in the contrary of the first way. In this way we must know the latitude and longitude of an area (for the home address / source address and the destination address) in order to get the route

We can only provide one source address, but we can provide more than one destination address. 
The url endpoint can be used like this :

/route/?src=17.035318,51.107706&dst=25.060768,51.115341&dst=20.058637,51.112269

src= is for the source address (latitude, longitude), dst = is for the destination address (latitude, longitude)

this web app can be seen here : zen-shipping-route.herokuapp.com

