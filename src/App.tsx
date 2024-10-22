import LocationList from './components/LocationList';
import WorldMap from './components/WorldMap';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
      <WorldMap />
      <LocationList />
    </div>
  );
}

export default App;
