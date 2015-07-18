var locationData = new ReactiveVar(null);

Template.landing.onCreated(function(){
	this.autorun(function(){
		var currentRoute = Router.current();
		var ip = currentRoute.params.ip || '82.124.236.10';
		locationData.set(null);
		$.getJSON('http://localhost:3000/geocode/' + ip, function(data){ 
			locationData.set(data);
		});
	});
});

Template.landing.helpers({
	locationData : function(){
		return locationData.get();
	},

	flagUrl : function(countryCode){
		return "/images/flags/" + countryCode.toLowerCase() + ".svg";
	}, 

	hello : function(countryCode){
		return getHelloForCountry(countryCode);
	},

	locationCoords : function(location){
		return location ? [
			Math.round(location.latitude * 100) / 100,
			Math.round(location.longitude * 100) / 100
		].join(', ') : '';
	}
});