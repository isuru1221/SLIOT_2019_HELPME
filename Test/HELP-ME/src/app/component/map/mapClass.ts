export interface IGeoJson {
  type: string;
  geometry:{
    type: string;
    coordinates: number[];
  };
  properties?: any;
  $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}
}
