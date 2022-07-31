var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_fs = __toModule(require("fs"));
let drivers;
console.log("Type the drivers file");
drivers = getFileContent("drivers.txt");
console.log("Type the addresses file");
let addresses = getFileContent("addresses.txt");
const REGEX_PATTERN_ONLY_VOWELS = /[aeiou]/gi;
const REGEX_PATTERN_ONLY_CONSONANTS = /[bcdfghjklmnpqrstvwxyz]/gi;
const finalDeliveries = [];
addresses = addresses.sort((a, b) => {
  return a.name.length - b.name.length;
});
const driversPossibleDeliveries = drivers.map((driver) => {
  let deliveries = addresses.map((address) => {
    return {
      address: address.name,
      score: getScore(address.name, driver.name)
    };
  });
  return { driver: driver.name, addresses: deliveries };
});
addresses.forEach((address) => {
  let maxShipmentPermutation = { driver: null, address: null, score: null };
  driversPossibleDeliveries.forEach((delivery) => {
    const actualDelivery = delivery.addresses.find((deliveryAddress) => address.name == deliveryAddress.address);
    if (actualDelivery.score > (maxShipmentPermutation == null ? void 0 : maxShipmentPermutation.score) && !finalDeliveries.some((finalDelivery) => finalDelivery.driver == delivery.driver || finalDelivery.address == actualDelivery.address)) {
      maxShipmentPermutation = actualDelivery;
      maxShipmentPermutation.driver = delivery.driver;
    }
  });
  if (!finalDeliveries.some((delivery) => delivery.driver == maxShipmentPermutation.driver || delivery.address == maxShipmentPermutation.address)) {
    finalDeliveries.push({ driver: maxShipmentPermutation.driver, address: maxShipmentPermutation.address, score: maxShipmentPermutation.score });
    maxShipmentPermutation = null;
  }
});
console.log(finalDeliveries);
function getScore(addressName, driverName) {
  const score = evenLength(addressName, driverName);
  const noSpacesAddress = addressName == null ? void 0 : addressName.replace(/\s/g, "");
  const noSpacesDriver = driverName == null ? void 0 : driverName.replace(/\s/g, "");
  const addressFactors = numberFactor(noSpacesAddress.length);
  const driverFactors = numberFactor(noSpacesDriver.length);
  const shouldIncreaseSS = addressFactors.some((digit) => driverFactors.includes(digit));
  return shouldIncreaseSS ? score * 1.5 : score;
}
function evenLength(addressName, driverName) {
  return addressName.length % 2 === 1 ? vowelScore(driverName) * 1.5 : consonantScore(driverName);
}
function vowelScore(driversName) {
  var _a;
  return ((_a = driversName == null ? void 0 : driversName.match(REGEX_PATTERN_ONLY_VOWELS)) == null ? void 0 : _a.length) ?? 0;
}
function consonantScore(driversName) {
  var _a;
  return ((_a = driversName == null ? void 0 : driversName.match(REGEX_PATTERN_ONLY_CONSONANTS)) == null ? void 0 : _a.length) ?? 0;
}
function numberFactor(size) {
  return Array.from(Array(size + 1), (_, i) => i + 2).filter((i) => size % i === 0);
}
function getFileContent(fileName) {
  try {
    const content = import_fs.default.readFileSync(fileName, "utf-8").split("\n").filter(Boolean);
    console.log(content);
    return content.map((result) => {
      return { name: result };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//# sourceMappingURL=index.js.map
