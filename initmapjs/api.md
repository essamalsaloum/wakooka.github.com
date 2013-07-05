---
layout: initmapjs
menu_active: documentation
current_page: api 
---

# API reference
## Basic
### getMap()
If something can not be done using initmap API, you can get the 
<a href="https://developers.google.com/maps/documentation/javascript/reference#Map">google.maps.Map</a> object so you can use Google Maps API.

	var map = $('#map').initMap();
	var google_map = map.getMap(); // returns google.maps.Map object

--------------------------------------------------

## Marker
### markers.add()
To add multiple markers to the map, you can pass an object of <a href="./documentation.html#marker_options">Marker objects</a>. <br>

	markers.add({ 'key_n': {MarkerObject}, 'key_n': {MarkerObject}, ... })

<span class="label label-warning"> Warning </span> 
 __key_n__ string needs to be __different for each new marker__, think of them as unique keys. Using the same key for multiple markers will lead to unexpected results.


<table class="table table-bordered">
	<tr>
		<th>Parameters</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>key_n</td>
		<td>string</td>
		<td>A string that needs to be different for each marker that is placed on the map, the markers are stored internally, and can be retrieved using <a href="./api.html#get_markers">markers.get('key_n')</a></td>
	</tr>
	<tr>
		<td>Marker object</td>
		<td>object</td>
		<td>
			See the properties available for <a href="./documentation.html#marker_options">Marker object</a>
		</td>
	</tr>
</table>

-----------------------------------------------------------------

#### markers.get()

To get a marker from the map, you can pass its unique key that you've specified when creating the marker.

	markers.get( 'key' , handler( google.maps.marker ) )

<table class="table table-bordered">
	<tr>
		<th>Parameters</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>key</td>
		<td>string</td>
		<td>Unique key that you've previously set, when creating the marker</td>
	</tr>
	<tr>
		<td>handler(<a href="https://developers.google.com/maps/documentation/javascript/reference#Marker">google.maps.Marker</a>)</td>
		<td>function</td>
		<td>
			A function that will be invoked once the marker has been placed on the map. The only parameter of that function is a 
			<a href="https://developers.google.com/maps/documentation/javascript/reference#Marker">google.maps.Marker object</a> You can then work with the <a href="https://developers.google.com/maps/documentation/javascript/reference#Marker">google.maps.Marker methods</a> to modify the marker.
		</td>
	</tr>
</table>
----------------------------------------------------------------------------

#### markers.all()

To get all the markers on the map.

	markers.all( handler( markers ) )

<table class="table table-bordered">
	<tr>
		<th>Parameters</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>handler(markers)</td>
		<td>function</td>
		<td>
			A function that will be invoked once the markers have been placed on the map. The only parameter of that function is an object containing all the markers on the map. The properties are the uniques that you've specified previously when creating the markers.
		</td>
	</tr>
</table>

--------------------------------------------------------------------

#### marker.remove()

To remove a marker from the map.

	markers.remove( 'key' )

<table class="table table-bordered">
	<tr>
		<th>Parameters</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>key</td>
		<td>string</td>
		<td>
			A string that has been previously defined when creating the marker.
		</td>
	</tr>
</table>

--------------------------------------------------------------------