// Function to fetch data from the specified API endpoint
async function json(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
    return await response.json();
  }
  
// Variable to store the returned json from the API
const pgh_network = await json(`https://api.citybik.es/v2/networks/pittsburgh`);
  
// Function to parse the data and place it into a dictionary
function parse_network(data){
    // Map is a non-primitive type in JS that can be used as a dictionary 
    // station_data is a dictionary to store all station data
    const network_data = new Map();

    // CHALLENGE 1.1
    // Your code here
    // use .set() to add the data to the Map
    network_data.set('network_id', networkInfo.id);
    network_data.set('name', networkInfo.name);
    network_data.set('latitude', networkInfo.location.latitude);
    network_data.set('longitude', networkInfo.location.longitude);
    network_data.set('city', networkInfo.location.city);
    network_data.set('country', networkInfo.location.country);

    // Convert the Map to a plain object that can be indexed into similar to a dictionary and an array before returning
    return Object.fromEntries(network_data);
}
  
  // stores the output of the parsed data
  const network_info = parse_network(pgh_network);
  
  // used for getting the output quickly in the terminal, equivalent to CURL
  process.stdout.write(JSON.stringify(network_info));