import LocationList from './components/LocationList';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
      <Map />
      <LocationList />
    </div>
  );
}

export default App;
