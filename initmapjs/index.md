---
layout: initmapjs
menu_active: index
---

## About

__initmap.js__ allows you to embed Google Maps in a __nice, quick, and easy way__.   
The plugin gets rid of the boilerplate code to embed a Google Map. It also gives you __flexibility__ if you need to do more complex things.

- HTML 5 Geolocation, get the user location
- Markers API to get, remove, update marker on the map 
- InfoWindows, can get attached to a marker easily
- Controls, show/hide, and position each control on the map

## Getting Started

__initmap.js__ has two dependencies:

- jQuery 
- Google Maps

They both need to be loaded before __initmap.js__ :

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>
	<script src="path_to_js_directory/initmap.min.js" type="text/javascript"></script>

<p><a href="#" class="btn btn-info">Download initmap.js</a></p>

-----------------------------------------------------------

### Basic usage example

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<pre><code class="javascript">$('#map').initMap();</code></pre>

			<p>Default parameters (required by Google Maps to initialize the map): <br>
			<code>center</code>: lat: 0 / lng: 0 <br>
			<code>zoom</code>: 2 <br>
			<code>type</code>: hybrid</p>
			
			<p><a href="./documentation.html">Checkout the documentation</a></p>
		</div>
	</div>

	<div class="span6">
		<div id="basic-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>