// Function to fetch data from the specified API endpoint
async function json(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
    return await response.json();
  }
  
  // Variable to store the returned json from the API
  const pgh_stations = await json(`https://api.citybik.es/v2/networks/pittsburgh`);
  
  // Function to parse the data on each station and place it into a dictionary
  function parse_stations(data){
      // Map is a non-primitive type in JS that can be used as a dictionary 
      // station_data is a dictionary to store all station data
      const station_data = new Map();
      data.network.stations.forEach(station => {
        // inner dictionary for each information field
        const station_info = new Map();

        // CHALLENGE 2.1
        // Add information_field:quantity to the inner dictionary using .set() 
        station_info.set('free_bikes', station.free_bikes);
        station_info.set('empty_slots', station.empty_slots);
        station_info.set('latitude', station.latitude);
        station_info.set('longitude', station.longitude);

        // Adds to the station_data dictionary with the key-value pair of name:info (where info is a dictionary)
        station_data.set(station.name, station_info);
      });
  
      // Convert Map to plain object for serialization so stringify can be used
      // You don't have to worry about this  
      const plain_object = Object.fromEntries(
          [...station_data.entries()].map(([stationId, infoMap]) => [
              stationId,
              Object.fromEntries(infoMap) // Convert inner Map to object
          ])
      );
  
      // returns the plain dictionary for use with stringify
      return plain_object;
  }
  
  // stations stores the output of the parsed data
  const stations = parse_stations(pgh_stations);
  
  // used for getting the output quickly in the terminal, equivalent to CURL
  process.stdout.write(JSON.stringify(stations));