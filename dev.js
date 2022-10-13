// A Landsat 8 surface reflectance image.
var image = ee.Image('LANDSAT/LC08/C02/T1_L2/LC08_044034_20210508')
  .select(['SR_B.']);  // reflectance bands

// A region of interest.
var region = ee.Geometry.BBox(-122.24, 37.13, -122.11, 37.20);

// Set the export "scale" and "crs" parameters.
Export.image.toDrive({
  image: image,
  description: 'image_export',
  folder: 'ee_demos',
  region: region,
  scale: 30,
  crs: 'EPSG:5070'
});