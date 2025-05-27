const params = {
  d: new Date().toISOString().split('T')[0],
  tz: 'Europe/Zurich',
  ln: 9.0341907,
  lt: 47.4584301,
  diptype: 'apparent',
  era: -16.0,
  ea: -19.0,
  eh: 563.0,
  eo: 563.0,
  fa: -19.0,
  fea: 1.0,
  ia: 4.5,
  isn: -10.0,
  k: 0.155,
  p: 1010.0,
  t: 15.0,
  rsa: 1.0,
  vc: 5.65,
  zt: 1.0,
};

const stringParams = Object.fromEntries(
  Object.entries(params).map(([key, value]) => [key, String(value)])
);
const query = new URLSearchParams(stringParams).toString();
const apiUrl = `https://www.muwaqqit.com/api2.json?${query}`;;

(async () => {
const response = await fetch(apiUrl)
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const data = await response.json()
console.log(data)
})();