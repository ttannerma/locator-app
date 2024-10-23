import LocationList from './components/LocationList';
import WorldMap from './components/WorldMap';
import 'leaflet/dist/leaflet.css';
import './styles/styles.css';

function App() {
  return (
    <div>
      <WorldMap />
      <LocationList />
    </div>
  );
}

export default App;
