
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '51ba63a738mshc342e294c358014p14553bjsn60bec33c628c',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));