let store = { drivers: [], passengers: [], trips: []};

let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
  constructor(name) {
    this.id = ++driverId;
    this.name = name;

    store.drivers.push(this);
    // console.log('driver',store.drivers[1].name);
    // console.log('driver', store.drivers);
  }

  trips() {
    return store.trips.filter(
      function(trip) {
        return trip.driverId === this.id;
      }.bind(this)
    );
    }
    //Using arrow function
    // return store.trips.filter(trip => {
    // return trip.driverId === this.id;
    // });
  // }

  passengers() {
    return this.trips().map (
       function(trip) {
        return trip.passenger();
    })
  }
};


class Passenger {
  constructor(name) {
    this.id = ++passengerId;
    this.name = name;

    store.passengers.push(this);
    // console.log('passenger',store.passengers[1].name);
    // console.log('passenger', store.passengers);
  }

  trips() {
    return store.trips.filter (
      function(trip) {
        return trip.passengerId === this.id;
      }.bind(this)
    );
  }

 drivers() {
   return this.trips().map (
     function(trip) {
       return trip.driver();
     }.bind(this)
   );
 }

};


class Trip {
  constructor(driver, passenger) {
    this.id = ++tripId;
    this.driverId = driver.id;
    this.passengerId = passenger.id;
    store.trips.push(this);
    // console.log('trip',store.trips[0].driverId, passengerId);
    // console.log(store.trips[0]);
}

  passenger() {
    return store.passengers.find(
      function(passenger) {
        return passenger.id === this.passengerId;
      }.bind(this)
    );
  }

  driver() {
    return store.drivers.find (
      function(driver) {
        return driver.id === this.driverId;
      }.bind(this)
    );
  }

}



driver = new Driver("Alfie");
passenger = new Passenger("Bob");
firstTrip = new Trip(driver, passenger);
secondPassenger = new Passenger("Susan");
secondTrip = new Trip(driver, secondPassenger);
console.log(driver);
console.log(passenger);
console.log(secondPassenger);
console.log(firstTrip);
console.log('driver_trip',driver.trips(firstTrip));
console.log('driver_passenger',driver.passengers());
console.log('trip_driver', firstTrip.driver());
console.log('trip_passenger', firstTrip.passenger());
console.log('passenger_trip_driver', secondPassenger.drivers());
