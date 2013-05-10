---
layout: initmapjs
---

# About

__initmap.js__ allows you to embed Google Maps in a __nice, quick, and easy way__. The main goal of the plugin is to get rid of the boilerplate code to embed a Google Map. The plugin doesn't try to do everything for you and gives you __flexibility__ if you need to do more complex things.

- HTML 5 Geolocation
- Markers
- Info Windows
- Controls

# Getting Started

__initmap.js__ has two dependencies, _jQuery_ and _Google Maps_ - obviously. They both need to be loaded before __initmap.js__ like so :

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>
	<script src="path_to_js_directory/initmap.min.js" type="text/javascript"></script>

<p><a href="" class="btn btn-info">Download it</a></p>

-----------------------------------------------------------

## Basic example

#### jQuery
		
	$('#map').initMap();
		
#### HTML
	
	<div id="map" style="width: 100%; height: 300px;"></div>
	
<div id="basic-map" style="width: 100%; height: 300px;"></div>
<script>
	$('#basic-map').initMap();
</script>


# Documentation


