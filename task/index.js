const http = require('http');
const url = require('url');
const { addDays, addWeeks, subDays, format } = require('date-fns');

const server = http.createServer((req, res) => {
  // Parse the URL to get the query parameters
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  // Check if the 'action' and 'value' query parameters are provided
  if (!query.action || !query.value) {
    res.statusCode = 400;
    res.end('Bad Request: Please provide both "action" and "value" parameters.');
    return;
  }

  const action = query.action.toLowerCase();
  const value = parseInt(query.value);
  const valueType = query.valueType || 'days';

  let resultDate;

  if (action === 'add') {
    if (valueType === 'days') {
      resultDate = addDays(new Date(), value);
    } else if (valueType === 'weeks') {
      resultDate = addWeeks(new Date(), value);
    }
  } else if (action === 'subtract') {
    if (valueType === 'days') {
      resultDate = subDays(new Date('2019-01-12'), value);
    }
  }

  if (resultDate) {
    const formattedDate = format(resultDate, 'yyyy-MM-dd');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Result Date: ${formattedDate}`);
    console.log(`Request: ${action} ${value} ${valueType}`);
    console.log(`Response: ${formattedDate}`);
  } else {
    res.statusCode = 400;
    res.end('Bad Request: Please specify a valid action and value type.');
    console.log('Invalid request');
  }
});

const port = 3000; // Change to your desired port number
server.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});