Router.route('/geocode/:ip?', function () {
  try {
    var req = this.request;
    var requestIp = this.params.ip || req.headers['x-forwarded-for'];
    var geoData = IPGeocoder.geocode(requestIp);
    this.response.end(JSON.stringify({
    	ip : requestIp,
    	data : geoData
    }));
  } catch(e) {
    console.error('geoloc failed', e);
    this.response.end(null);
  }
  
}, {where: 'server'});