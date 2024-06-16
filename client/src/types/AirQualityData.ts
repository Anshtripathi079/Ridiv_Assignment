interface Coord {
    lon: number;
    lat: number;
  }
  
  interface Main {
    aqi: number;
  }
  
  interface Components {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  }
  
  interface List {
    main: Main;
    components: Components;
    dt: number;
  }
  
  interface AirQualityData {
    coord: Coord;
    list: List[];
  }
  
  
  