// const axios = require('axios');

// API's
// Exchange Rate API
// Countries API

//1st Function = getExchangeRate;
const getExchangeRate = async (fromCurrenc, toCurrenc) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=b759031dae844b91442d045ae277b5ef&format=1');

  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrenc];
  const exchangeRate = euro * rate[toCurrenc];

  if (isNaN(exchangeRate)) {
    throw new Error(`unable to get currency ${fromCurrenc} and ${toCurrenc}`)
  }
  return exchangeRate;

}
//2nd Function = getCountries;
const getCountries = async (toCurrenc) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/currency/${toCurrenc}`);
    return response.data.map(country => country.name.common)
  } catch (error) {
    throw new Error(`unable to get countries that use ${toCurrenc}`)
  }

}
//3rd Function = convertCurrency

const convertCurrency = async (fromCurrenc, toCurrenc, amount) => {
  const Countries = await getCountries(toCurrenc);
  const exchangeRate = await getExchangeRate(fromCurrenc, toCurrenc);

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrenc} is worth ${convertedAmount} ${toCurrenc}. You can spent these in these countries:${Countries}`

}


//Call Convert Currency to get meaningful data.


convertCurrency('USD', 'INR', 1).then((message) => {
  console.log(message);
}).catch((error) => {
  console.log(error.message);
})