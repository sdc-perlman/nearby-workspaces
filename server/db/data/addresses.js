const array1 = [
  '201 W Washington Blvd, Los Angeles, CA 90007, United States',
  '4011 S Central Ave, Los Angeles, CA 90011, United States',
  '2810 S Figueroa St, Los Angeles, CA 90007, United States',
  '1311 W Washington Blvd, Los Angeles, CA 90006, United States',
  '1625 Wilshire Blvd, Los Angeles, CA 90017, United States',
  '2838 Crenshaw Blvd, Los Angeles, CA 90016, United States',
  '3501 S La Cienega Blvd, Los Angeles, CA 90016, United States',
  '1231 South La Brea Ave, Los Angeles, CA 90019, United States',
  '6345 Wilshire Blvd, Los Angeles, CA 90048, United States',
  '344 Bathurst St, Toronto, ON M5T 2S3, Canada',
  '710 King St W, Toronto, ON M5V 2Y6, Canada',
  '160 Spadina Ave, Toronto, ON M5T 2C2, Canada',
  '109 McCaul St, Toronto, ON M5T 3K5, Canada',
  'Union station Toronto, 65 Front St W, Toronto, ON M5J 1E6, Canada',
  '181 Bay St, Toronto, ON M5J 2S1, Canada',
  '123 Yonge St, Toronto, ON M5C 1W4, Canada',
  '121 Front St E, Toronto, ON M5A 4P7, Canada',
  '127 Church St, Toronto, ON M5C 2G5, Canada',
  '356 Yonge St, Toronto, ON M5B 1S5, Canada',
  '11 St Clair Ave E, Toronto, ON M4T 1L8, Canada',
  '710 St Clair Ave W, Toronto, ON M6C 1B2, Canada',
  '1168 St Clair Ave W, Toronto, ON M6E 1B4, Canada',
  'Loftus St &, Alfred St, Sydney NSW 2000, Australia',
  'Wynyard Railway Concourse Wynyard St &, Carrington St, Sydney NSW 2000, Australia',
  '375-377 George St, Sydney NSW 2000, Australia',
  'Lower Ground Floor, Westfield, Central St, Sydney NSW 2000, Australia',
  'Harbourside Shopping Centre Level 1 Darling Harbour, NSW 2000, Australia',
  '1 Harbour St, Haymarket NSW 2000, Australia',
  '600 George St, Sydney NSW 2000, Australia',
  '45-47 Darlinghurst Rd, Potts Point NSW 2011, Australia',
  'Railway Square, 863 George St, Ultimo NSW 2007, Australia',
  '11 Sulkhan Nasidze St',
  '12 Viktor Dolidze St',
  '17a Sulkhan Nasidze St',
  `Victor Dolidze 29 T'bilisi, 0171`,
  `Merab Kostava St, Tbilisi`,
  `2 Viktor Dolidze St, Tbilisi`,
  `150 Davit Aghmashenebeli Ave, Tbilisi 1112`,
  `Ia Kargareteli Street, Tbilisi`,
];

const array2 = [
  '946 8th Ave, New York, NY 10019, United States',
  '1651 Broadway, New York, NY 10019, United States',
  '18 E 42nd St, New York, NY 10017, United States',
  '490 8th Ave, New York, NY 10001, United States',
  '972 6th Ave, New York, NY 10018, United States', 
  '809 6th Ave, New York, NY 10001, United States',
  '39 Union Square W, New York, NY 10003, United States',
  '102 1st Avenue, New York, NY 10003, United States',
  '262 Canal St, New York, NY 10013, United States',
  '160 Broadway, New York, NY 10038, United States',
  '2450 Junipero Serra Blvd, Daly City, CA 94015, United States',
  '381 S Airport Blvd, South San Francisco, CA 94080, United States',
  '2298 Gellert Blvd, South San Francisco, CA 94080, United States',
  '2750 Geneva Ave, Daly City, CA 94014, United States',
  '5454 Mission St, San Francisco, CA 94112, United States',
  '235 Front St, San Francisco, CA 94111, United States',
  '609 Market St, San Francisco, CA 94105, United States',
  '441 Sutter St, San Francisco, CA 94108, United States',
  '1100 Fillmore St, San Francisco, CA 94102, United States',
  '302 Potrero Ave, San Francisco, CA 94110, United States',
  '2801 Mission St, San Francisco, CA 94110, United States',
  '345 Bayshore Blvd, San Francisco, CA 94124, United States',
  '5411 3rd St, San Francisco, CA 94124, United States',
  '800 Market St, Oakland, CA 94607, United States',
  '715 Central Ave, Alameda, CA 94501, United States',
  '32D Street Naval Sta, San Diego, CA 92136, United States',
  '2796 Main St, San Diego, CA 92113, United States',
  '1280 12th Ave, San Diego, CA 92101, United States', 
  '1515 Euclid Ave, San Diego, CA 92105, United States',
  '1624 Rosecrans St, San Diego, CA 92106, United States',
  '3665 N Harbor Dr Building G-1, San Diego, CA 92101, United States',
  '3805 Midway Dr, San Diego, CA 92110, United States',
  '1414 University Ave, San Diego, CA 92103, United States',
];

const array3 = [
  '2345 El Cajon Blvd, San Diego, CA 92104, United States',
  '3879 Fairmount Ave, San Diego, CA 92105, United States',
  '5824 Montezuma Rd, San Diego, CA 92115, United States',
  '6326 Mission Gorge Rd, San Diego, CA 92120, United States',
  '1121 Garnet Ave, San Diego, CA 92109, United States',
  '4711 Mission Bay Dr, San Diego, CA 92109, United States',
  '5920 Balboa Ave, San Diego, CA 92111, United States',
  '2616 Connecticut Ave NW, Washington, DC 20008, United States',
  '2481-83 18th St NW, Washington, DC 20009, United States',
  '1916 M St NW, Washington, DC 20036, United States',
  '750 17th St NW, Washington, DC 20006, United States',
  '1235 New York Ave NW, Washington, DC 20005, United States',
  '555 13th St NW, Washington, DC 20004, United States',
  '601 F St NW, Washington, DC 20004, United States',
  '400 C St SW, Washington, DC 20024, United States',
  '50 Massachusetts Ave NE, Washington, DC 20002, United States',
  '75 New York Ave NE, Washington, DC 20002, United States',
  '1400 14th St NW, Washington, DC 20005, United States',
  '178 Border St, East Boston, MA 02128, United States',
  '14 McGrath Hwy, Somerville, MA 02143, United States',
  '463 Massachusetts Ave, Cambridge, MA 02139, United States',
  '329 Washington St, Boston, MA 02108, United States',
  '146 Tremont St, Boston, MA 02111, United States',
  '2 S Station, Boston, MA 02110, United States',
  '870 Massachusetts Ave, Boston, MA 02118, United States',
  '301 Warren St, Roxbury, MA 02119, United States',
  '3064 Washington St, Roxbury, MA 02119, United States',
  '1513 Dorchester Ave, Dorchester, MA 02122, United States',
  '605 Washington St, Dorchester, MA 02124, United States',
  '515 Gallivan Blvd, Dorchester, MA 02124, United States',
  '690 Alameda St, Los Angeles, CA 90021, United States',
  '1310 E Olympic Blvd, Los Angeles, CA 90021, United States',
];

// const checkArrays = [array1, array2, array3]
function removeDuplicates(checkArray = []) {
  const track = {};
  const duplicates = [];
  checkArray.forEach((arr, j) => {
    arr.forEach((address, i) => {
      if (track[address]) {
        const dup = arr.splice(i, 1);
        duplicates.push(dup);
        console.log(`${dup} removed from array${j} at index ${i}`);
      } else {
        track[address] = true;
      }
    });
  });
  if (!duplicates.length) {
    console.log('No removals');
  }
  return true;
}

removeDuplicates([array1, array2, array3]);

exports.removeDuplicates = removeDuplicates;
exports.array1 = array1;
exports.array2 = array2;
exports.array3 = array3;

//1-10 nyc
//11-25 sf
//26-41 sd
//42-52 dc
//53-64 boston
//65-75 la
//76-88 toronto
//89-97 sydney
//98+ tbilisi, georgia

/* 
  extra addresses tbilisi
  // `118 Davit Aghmashenebeli Ave, Tbilisi 0101`,
  // `38/6 Egnate Ninoshvili St, Tbilisi 0112`,
  // `13 Queen Tamar Ave, Tbilisi`,
  // `31 Giorgi Chitaia St, Tbilisi`,
  // `28 Zurab Kvlividze St, Tbilisi`,
  // `22 Arnold Chikobava St, Tbilisi 0102`,
  // `89 Davit Aghmashenebeli Ave, Tbilisi 0102`,
  // `5, 3 Gabriel Sundukiani Street, Tbilisi`,
  // `26 Shota Rustaveli Ave, Tbilisi`,
  // `8 Mitropan Laghidze St, Tbilisi`,
  // `6 Gia Chanturia St, Tbilisi`,
  // `#1 Shio Chitadze St, Tbilisi 0108`
*/