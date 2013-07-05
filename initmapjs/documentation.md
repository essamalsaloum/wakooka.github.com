---
layout: initmapjs
menu_active: documentation
current_page: documentation
---

# Option Reference
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
			<code>terain</code>.
			Learn more:
			<a href="https://developers.google.com/maps/documentation/javascript/reference#MapTypeId"> google.maps.MapTypeId</a>
		</td>
	</tr>
	<tr>
		<td><a href="#options">options</a></td>
		<td>object</td>
		<td>{ zoom: 2 }</td>
		<td>
			Any property that is defined in 
			<a href="https://developers.google.com/maps/documentation/javascript/reference#MapOptions">google.maps.MapOptions</a>, e.g: <code>options : { zoom: 4, scrollwheel: false }</code>
		</td>
	</tr>
</table>

---------------------------------------------------

### Center

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<p>You can either pass a plain text address, or an array of latitude and longitude:</p>
			<pre><code class="javascript">$('#map').initMap({ center : 'Paris, France' });</code></pre>
			<p>or</p>
			<pre><code class="javascript">$('#map').initMap({ center : [ 48.861553 , 2.351074 ] });</code></pre>
			<p>Those two examples will give the exact same result.</p>
			<div class="alert alert-info">When passing the address, we convert it into latitude and longitude internally using Google Maps Geocoder, it's important to watch the <a href="https://developers.google.com/maps/documentation/geocoding/index#Limits"><strong>usage limit</strong></a>. I would recommend, if you can, to get the latitude and longitude manually and pass them as an array.
			</div>
		</div>
	</div>
	<div class="span6">
		<div id="center-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

---------------------------------------------------

### Type

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<p>Set map type id to roadmap:</p>
			<pre><code class="javascript">$('#map').initMap({ type : 'roadmap' });</code></pre>
			<p>
				4 options are available: 
				<code>hybrid</code>,
				<code>roadmap</code>,
				<code>satellite</code>,
				<code>terain</code>
			</p>
		</div>
	</div>
	<div class="span6">
		<div id="type-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

---------------------------------------------------

### Options
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<p>Set zoom to 6 and disable scrollwheel:</p>
			<pre><code class="javascript">$('#map').initMap({ options : { zoom: 4, scrollwheel: false } });</code></pre>
			<p>Any property that is defined in 
				<a href="https://developers.google.com/maps/documentation/javascript/reference#MapOptions">google.maps.MapOptions</a>.
			</p>
		</div>
	</div>
	<div class="span6">
		<div id="zoom-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>
---------------------------------------------------------------------

## Marker
You can pass multiple markers, in <code>initMap()</code>. That can be done like this:

	$('#map').initMap({
		markers : {
			marker1 : { position: [ 48.861553 , 2.351074 ] }, // Melbourne
			paris_marker : { position: [ -37.764201 , 144.9646 ] } // Paris
		}
	});
	
<div class="alert alert-info">
	In the example above, note that <strong>'marker1'</strong> and <strong>'paris_marker'</strong> can be anything. We store those <em>keys</em> internally, so it's easier to get an existing marker via <code>markers.get()</code> method.
</div>

### Marker options

<table class="table table-bordered">
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><a href="#marker_position">position</a></td>
		<td>array or string</td>
		<td>-</td>
		<td>
			<span class="label label-important">Required</span> Plain text address, or array of latitude / longitude: [ lat , lng ]
		</td>
	</tr>
	<tr>
		<td><a href="#infowindow">info_window</a></td>
		<td>object</td>
		<td>-</td>
		<td><a href="#infowindow">Infowindow object</a></td>
	</tr>
	<tr>
		<td><a href="#marker_animation">animation</a></td>
		<td>string</td>
		<td>-</td>
		<td>2 options available: <code>bounce</code>, <code>drop</code></td>
	</tr>
	<tr>
		<td>options</td>
		<td>object</td>
		<td>-</td>
		<td>
			Any property that is defined in 
			<a href="https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions">google.maps.MarkerOptions</a>, <br>
			e.g: <code>options : { icon: 'icon.png', title: 'Paris marker' }</code>
		</td>
	</tr>
</table>

### Marker position

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<p>You can either pass a plain text address, or an array of latitude and longitude:</p>
			<pre><code class="javascript">$('#map').initMap({
	// Set the center of the map to Paris
	center: [ 48.861553 , 2.351074 ], 
	markers : {
		paris_marker: { position: 'Paris, France' },
		london : { position: 'London, UK' }
	}
});
			</code></pre>
			<p>or</p>
			<pre><code class="javascript">var paris_latlng =  [ 48.861553 , 2.351074 ];
$('#map').initMap({ 
	// Set the center of the map to Paris
	center: paris_latlng,
	markers : {
		paris_marker: { position: paris_latlng },
		london : { position: [ 51.526261, -0.119476 ] }
	}
});</code></pre>
			<p>Those two examples will give the exact same result.</p>
			<div class="alert alert-info">When passing the address, we convert it into latitude and longitude internally using Google Maps Geocoder, it's important to watch the <a href="https://developers.google.com/maps/documentation/geocoding/index#Limits"><strong>usage limit</strong></a>. I would recommend, if you can, to get the latitude and longitude manually and pass them as an array.
			</div>
		</div>
	</div>
	<div class="span6">
		<div id="marker-paris-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

--------------------------------------------------------------

### Marker animation

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<pre><code class="javascript">$('#map').initMap({ 
	// Set the center of the map to Paris
	center: [ 48.861553 , 2.351074 ],
	markers : {
		paris_marker: { 
			position: [ 48.861553 , 2.351074 ], 
			animation: 'bounce' 
		},
	}
});</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="marker-animation-map" style="width: 100%; height: 300px;"> </div>
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
		<td><a href="#geolocation_center">center</a></td>
		<td>boolean</td>
		<td>false</td>
		<td>true to center the map where the user is located</td>
	</tr>
	<tr>
		<td><a href="#geolocation_center">marker</a></td>
		<td>boolean or object</td>
		<td>false</td>
		<td>true to add a default marker on the user position, or <a href="#marker">Marker Object</a> to customise it</td>
	</tr>
	<tr>
		<td>options</td>
		<td>object</td>
		<td>-</td>
		<td><a href="https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation#PositionOptions">See PositionOptions properties</a></td>
	</tr>
</table>

### Geolocation callbacks

<table class="table table-bordered">
	<tr>
		<th>Name</th>
		<th>Return value</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>success( Position )</td>
		<td>Position object</td>
		<td>
			<a href="https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation#Describing_a_position">
				See Position object properties
			</a>
		</td>
	</tr>
	<tr>
		<td>error( PositionError )</td>
		<td>PositionError object</td>
		<td>
			<a href="https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation#Handling_errors">
				See PositionError object properties
			</a> 
		</td>
	</tr>
	<tr>
		<td>unsupported()</td>
		<td>-</td>
		<td>
			This function will be invoked, if the browser doesn't support HTML5 geolocation
		</td>
	</tr>
</table>

---------------------------------------------------------

### Geolocation center

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			Center the map where the user is located
			<pre><code class="javascript">$('#map').initMap({ geolocation: { center: true } });</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="geolocation-center-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

--------------------------------------------------------------------

### Geolocation marker
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			Add a marker to the map where the user is located
			<pre><code class="javascript">$('#map').initMap({ geolocation: { marker: true } });</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="geolocation-marker-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

-----------------------------------------------------------------

### Using geolocation callbacks
<div class="row-fluid">
	<div class="span6">
		<div class="well">
			An example using all the callback functions available
			<pre><code class="javascript">$('#map').initMap({ 
    geolocation: { 
        marker: true,
        success: function( position ) {
            // position = Position Object
        },
        error: function( error ) {
            if ( error.code == 1 ) {
            // PERMISSION_DENIED
            }
            if ( error.code == 2 ) {
            // POSITION_UNAVAILABLE 
            }
            if ( error.code == 3 ) {
            // TIMEOUT 
            }
        },
        unsupported: function() {
            // Do something
            // Tell the user that their browser is old
        }
    }
});</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="geolocation-callback-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

-----------------------------------------------------------------

## InfoWindow

<table class="table table-bordered">
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>content</td>
		<td>string</td>
		<td>-</td>
		<td>
			Content to display in the InfoWindow. This can be an HTML element, a plain-text string, or a string containing HTML. The InfoWindow will be sized according to the content. To set an explicit size for the content, set content to be a HTML element with that size.
		</td>
	</tr>
	<tr>
		<td>disableAutoPan</td>
		<td>boolean</td>
		<td>false</td>
		<td>
			Disable auto-pan on open. By default, the InfoWindow will pan the map so that it is fully visible when it opens.
		</td>
	</tr>
	<tr>
		<td>maxWidth</td>
		<td>number</td>
		<td>-</td>
		<td>Maximum width of the InfoWindow, regardless of content's width in pixel.</td>
	</tr>
	<tr>
		<td>hideOn</td>
		<td>string</td>
		<td>-</td>
		<td>Event name to close the InfoWindow. e.g: <code>mouseout</code></td>
	</tr>
	<tr>
		<td>showOn</td>
		<td>string</td>
		<td>click</td>
		<td>Event name to open the infowindow. e.g: <code>mouseover</code></td>
	</tr>
	<tr>
		<td>zIndex</td>
		<td>number</td>
		<td>-</td>
		<td>All InfoWindows are displayed on the map in order of their zIndex, with higher values displaying in front of InfoWindows with lower values. By default, InfoWinodws are displayed according to their latitude, with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers.</td>
	</tr>

</table>

------------------------------------------------------------

### InfoWindow example

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<pre><code class="javascript">$('#map').initMap({
    markers : {
        london_marker : {
            position: 'london, UK',
            info_window : { 
                content :'Showing on mouseover and hiding on mouseout',
                showOn: 'mouseover',
                hideOn: 'mouseout',
                maxWidth: 150,
                zIndex: 2
            } 
        },
        paris_marker : {
            position: 'Paris, France',
            info_window : { 
                content :'Showing on click',
                maxWidth: 350,
                zIndex: 1
            } 
        }
    }  
});</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="infowindow-example-map" style="width: 100%; height: 300px;"> </div>
	</div>
</div>

--------------------------------------------------------------------

## Control

<div class="alert alert-info">
For each property of the <code>controls</code> object set to <strong>false</strong> the control will be hidden, and <strong>true</strong> will display the control based on the default settings set by Google Maps itself. <br> 
Note that if you want to hide all the controls on the map you should be using <strong>disableDefaultUI</strong>, and set it to true, this property is available in the <a href="#options">map options</a>.
</div>

<table class="table table-bordered">
	<tr>
		<th>Property</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>map_type</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>3 properties are available: <br>
			- <code>type</code>: string or array of map types. e.g.: type: 'hybrid' <br>
			- <code>position</code>: string, needs to be lowercase e.g: 'top_center', <a href="https://developers.google.com/maps/documentation/javascript/reference#ControlPosition">learn more about the control position on Google Maps docs</a> <br>
			- <code>style</code>: string, either 'dropdown_menu' or 'horizontal_bar'
        </td>
	</tr>
	<tr>
		<td>overview</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>1 property available: <br>
			- <code>opened</code>: boolean, default false, if true the overview will be opened
		</td>
	</tr>
	<tr>
		<td>pan</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>1 property available: <br>
			- <code>position</code>: string, needs to be lowercase e.g: 'top_center', <a href="https://developers.google.com/maps/documentation/javascript/reference#ControlPosition">learn more about the control position on Google Maps docs</a>  
		</td>
	</tr>
	<tr>
		<td>rotate</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>1 property available: <br>
			- <code>position</code>: string, needs to be lowercase e.g: 'top_center', <a href="https://developers.google.com/maps/documentation/javascript/reference#ControlPosition">learn more about the control position on Google Maps docs</a>  
		</td>
	</tr>
	<tr>
		<td>scale</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>1 property available: <br>
			- <code>position</code>: string, needs to be lowercase e.g: 'top_center', <a href="https://developers.google.com/maps/documentation/javascript/reference#ControlPosition">learn more about the control position on Google Maps docs</a>  
		</td>
	</tr>
	<tr>
		<td>street_view</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>1 property available: <br>
			- <code>position</code>: string, needs to be lowercase e.g: 'top_center', <a href="https://developers.google.com/maps/documentation/javascript/reference#ControlPosition">learn more about the control position on Google Maps docs</a>  
		</td>
	</tr>
	<tr>
		<td>zoom</td>
		<td>object or boolean</td>
		<td>true</td>
		<td>2 properties available: <br>
            - <code>position</code>: string, needs to be lowercase e.g: 'top_center', <a href="https://developers.google.com/maps/documentation/javascript/reference#ControlPosition">learn more about the control position on Google Maps docs</a> <br>    
			- <code>style</code>: string, either 'large' or 'small', if you don't set this property, Google Maps will choose either large or small, based on the map size. 
		</td>
	</tr>
</table>

------------------------------------------------------------

### Control example

<div class="row-fluid">
	<div class="span6">
		<div class="well">
			<pre><code class="javascript">$('#map').initMap({
    type: 'roadmap' ,
    controls : {
        map_type : 
        {
            type : ['roadmap', 'satellite', 'hybrid'],
            position : 'top_left',
            style: 'dropdown_menu'
        },
        overview : { opened : true },
        pan : false,
        rotate : false,
        scale : false,
        street_view : { position : 'top_center' },
        zoom : {
            position : 'top_right',
            style: 'large'
        }
    }
});</code></pre>
		</div>
	</div>
	<div class="span6">
		<div id="control-example-map"  style="width: 100%; height: 300px;"> </div>
	</div>
</div>

--------------------------------------------------------------------