const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers for the deployed domain
  res.setHeader('Access-Control-Allow-Origin', 'https://admin-cms-self.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const backendUrl = 'http://65.109.108.95:3001/api/admin';
  
  try {
    const requestOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward Authorization header if present
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      }
    };

    // Add body for methods that support it
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      requestOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(backendUrl, requestOptions);
    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error', 
      message: error.message 
    });
  }
}; 