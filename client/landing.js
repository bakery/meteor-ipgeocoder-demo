var locationData = new ReactiveVar(null);

Template.landing.onCreated(function(){
	this.autorun(function(){
		var currentRoute = Router.current();
		locationData.set(null);
		$.getJSON('/geocode/' + currentRoute.params.ip || '', function(data){ 
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