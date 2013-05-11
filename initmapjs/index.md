---
layout: initmapjs
---

# About

__initmap.js__ allows you to embed Google Maps in a __nice, quick, and easy way__. The main goal of the plugin is to get rid of the boilerplate code to embed a Google Map. It gives you __flexibility__ if you need to do more complex things.

- HTML 5 Geolocation
- Markers
- Info Windows
- Controls

# Getting Started

__initmap.js__ has two dependencies:

- jQuery 
- Google Maps

They both need to be loaded before __initmap.js__ like this:

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>
	<script src="path_to_js_directory/initmap.min.js" type="text/javascript"></script>

<p><a href="#" class="btn btn-info">Download initmap.js</a></p>

-----------------------------------------------------------

## Basic example

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<pre><code>$('#map').initMap();</code></pre>

			<p>Default parameters (required by Google Maps to initialize the map): <br>
			<code>center</code>: lat: 0 / lng: 0 <br>
			<code>zoom</code>: 2 <br>
			<code>type</code>: hybrid</p>
			
			<p><a href="#documentation">See the documentation to override those parameters</a></p>
		</div>
	</div>

	<div class="span6">
		<div id="basic-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

---------------------------------------------------------------------------

# Documentation
## Basic options
<table class="table table-bordered">
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><a href="#center">center</a></td>
		<td>string or aray</td>
		<td>[ 0 , 0 ]</td>
		<td>Plain text address, or array of latitude / longitude: [ lat , lng ]</td>
	</tr>
	<tr>
		<td><a href="#type">type</a></td>
		<td>string</td>
		<td>hybrid</td>
		<td>4 options available:
			<code>hybrid</code>,
			<code>roadmap</code>,
			<code>satellite</code>,
			<code>terain</code>
		</td>
	</tr>
	<tr>
		<td><a href="#options">options</a></td>
		<td>objects</td>
		<td>{ zoom: 2 }</td>
		<td>
			You can specify any property that is defined in 
			<a href="https://developers.google.com/maps/documentation/javascript/reference#MapOptions">google.maps.MapOptions</a>, e.g: <code>options : { zoom: 4, scrollwheel: false }</code>
		</td>
	</tr>
</table>

### Center
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<p>You can either pass an address, or an array of latitude and longitude:</p>
			<pre><code>$('#map').initMap({ center : 'Paris, France' });</code></pre>
			<p>or</p>
			<pre><code>$('#map').initMap({ center : [ 48.861553 , 2.351074 ] });</code></pre>
			<p>Those two examples will give the exact same result.</p>
			<div class="alert alert-info">When passing the address, we convert it into latitude and longitude internally using Google Maps Geocoder, it's important to watch the <a href="https://developers.google.com/maps/documentation/geocoding/index#Limits"><strong>usage limit</strong></a>. I would recommend, if you can, to get the latitude and longitude manually and pass them as an array.
			</div>
		</div>
	</div>
	<div class="span6">
		<div id="center-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

### Type
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<p>Set the map type to roadmap:</p>
			<pre><code>$('#map').initMap({ type : 'roadmap' });</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="type-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

### Options
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			Set the zoom to 6:
			<pre><code>$('#map').initMap({ options : { zoom: 4, scrollwheel: false } });</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="zoom-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

------------------------------------------------------------

## Geolocation
### Geolocation options
<table class="table table-bordered">
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>center</td>
		<td>boolean</td>
		<td>false</td>
		<td>true to center the map where the user is located</td>
	</tr>
	<tr>
		<td>marker</td>
		<td>boolean / object</td>
		<td>false</td>
		<td>true to add a dafault marker on the user position, or <a href="#marker">Marker Object</a> to customise it</td>
	</tr>
	<tr>
		<td>success</td>
		<td>function</td>
		<td>-</td>
		<td>Returns HTML5 Geoposition object</td>
	</tr>
	<tr>
		<td>error</td>
		<td>function</td>
		<td>-</td>
		<td>Returns HTML5 Geoposition object</td>
	</tr>
</table>
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<pre><code>$('#map').initMap({ geolocation: { center: true } });</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="geolocation-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>