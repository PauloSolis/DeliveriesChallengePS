
import { Driver } from './Driver';
import { Address } from './Address';
import { Deliveries } from './Deliveries';

import fs from 'fs';
import readline from 'readline';



let drivers: Driver[];
let addresses: Address[];
/**
 * Constant to match VOWELS for the score algorithm.
 */
const REGEX_PATTERN_ONLY_VOWELS = /[aeiou]/gi;

/**
 * Constant to match CONSONANTS for the score algorithm.
 */
const REGEX_PATTERN_ONLY_CONSONANTS = /[bcdfghjklmnpqrstvwxyz]/gi;

/**
 * Constant of the drivers and addresses to which they are going to deliver
 */
const finalDeliveries: Deliveries[] = [];

addresses = addresses.sort((a, b) => {
  return a.name.length - b.name.length;
});

/**
 * Constant array of all possible permutations between addresses and drivers to get all scores
 */
const driversPossibleDeliveries:
  { driver: string, addresses: { address: string, score: number }[] }[] = drivers.map(driver => {
    let deliveries: any = addresses.map(address => {
      return {
        address: address.name,
        score: getScore(address.name, driver.name)
      };
    })
    return { driver: driver.name, addresses: deliveries };
  });


addresses.forEach(address => {
  // variable to save the address with the highest score and driver
  let maxShipmentPermutation = { driver: null, address: null, score: null };

  // Checking all the permutations looking for the highest one with the actual driver.
  driversPossibleDeliveries.forEach(delivery => {

    // Looking for the actual address and which is the driver with the highest score

    const actualDelivery: any = delivery.addresses.find(deliveryAddress => address.name == deliveryAddress.address);

    // If we found a higher score than the actual for that address we are going to save it until we reach another one
    if (actualDelivery.score > maxShipmentPermutation?.score
      && !finalDeliveries.some(finalDelivery => finalDelivery.driver == delivery.driver || finalDelivery.address == actualDelivery.address)) {
      maxShipmentPermutation = actualDelivery;
      maxShipmentPermutation.driver = delivery.driver;

    }
  })

  // Once found an address and a driver which have not been coupled yet, we are going to assign that driver to that address
  if (!finalDeliveries.some(delivery => delivery.driver == maxShipmentPermutation.driver || delivery.address == maxShipmentPermutation.address)) {
    finalDeliveries.push({ driver: maxShipmentPermutation.driver, address: maxShipmentPermutation.address, score: maxShipmentPermutation.score });
    maxShipmentPermutation = null;
  }
});


// Prints the final results
console.log(finalDeliveries);

/** #region This section calculates the address score according to the next conditions 
 * - If the length of the shipment's destination street name is even, the base suitability scoreis the number of
 * VOWELS in the driver's name multiplied by 1.5.
 *
 * - If the length of the shipment's destination street name is odd, the base SS is the number of CONSONANTS 
 * in the driver's name multiplied by 1
 *
 * - If the length of the shipment's destination street shares any common factors (besides 1) with the length of
 * the driver's name, the SS is increased by 50% above the base SS.
 */
function getScore(addressName: string, driverName: string): number {
  const score = evenLength(addressName, driverName);

  const noSpacesAddress = addressName?.replace(/\s/g, '');
  const noSpacesDriver = driverName?.replace(/\s/g, '')

  const addressFactors = numberFactor(noSpacesAddress.length);
  const driverFactors = numberFactor(noSpacesDriver.length);
  const shouldIncreaseSS: boolean = addressFactors.some(digit => driverFactors.includes(digit));

  return shouldIncreaseSS ? score * 1.5 : score;

}

function evenLength(addressName: string, driverName: string): number {
  return addressName.length % 2 === 1 ? vowelScore(driverName) * 1.5
    : consonantScore(driverName);
}

function vowelScore(driversName: string): number {
  return driversName?.match(REGEX_PATTERN_ONLY_VOWELS)?.length ?? 0;
}

function consonantScore(driversName: string): number {
  return driversName?.match(REGEX_PATTERN_ONLY_CONSONANTS)?.length ?? 0;
}

function numberFactor(size: number): number[] {
  return Array.from(Array(size + 1), (_, i) => i + 2).filter(i => size % i === 0);
}
// #endregion

/**
 * Function that gets the content of a file line by line and transforms it into an object
 */
function getFileContent(fileName: string): Driver[] | Address[] {
  try{
    const content = fs.readFileSync(fileName, 'utf-8')
      .split('\n')
      .filter(Boolean);
    console.log(content);
  
    return content.map((result: string) => {
      return { name: result }
    });
  }catch (error) {
    console.log(error);
    throw(error);
  }
}

async function main(){
  console.log('Type the drivers file');
drivers = getFileContent('drivers.txt');
console.log('Type the addresses file');
  addresses = getFileContent('test.txt');
}

await main();