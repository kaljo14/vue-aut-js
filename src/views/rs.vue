// Accessing the "name" field
let data = JSON.parse(jsonString);
console.log(data.name); // Output: "John Doe"

// Looping through the "addresses" array
data.addresses.forEach((address) => {
  console.log(address.address);
});

// Filtering the "readings" array
let filteredReadings = data.readings.filter((reading) => {
  return reading.reading_value > 102.0;
});
console.log(filteredReadings);