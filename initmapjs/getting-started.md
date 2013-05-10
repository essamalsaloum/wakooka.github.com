---
layout: initmapjs
---
# Getting Started

__initmap.js__ has two dependencies, _jQuery_ and _Google Maps_ - obviously. They both need to be loaded before __initmap.js__ like so :

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>
	<script src="path_to_js_directory/initmap.min.js" type="text/javascript"></script>

<p><a href="" class="btn btn-info">Download it</a></p>

--------------------------------------------------------------------------------

## Quick Example
Once the plugin is loaded, `initmap()` function is available.
This is all it takes to display a Google Maps on your website :

	$('#map').initMap();

<div class="alert alert-info">
	In this example <code>&lt;div id="map"&gt;&lt;/div&gt;</code> needs to exist and its width and height properties have been set.
</div>
