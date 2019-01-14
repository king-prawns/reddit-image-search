
import './index.pcss';
import PhotoDetails from './components/photo-details';
import PhotoAlert from './components/photo-alert';
import PhotoGallery from './components/photo-gallery';
import PhotoLoader from './components/photo-loader';
import PhotoThumb from './components/photo-thumb';
import SearchBar from './components/search-bar';
import RisApp from './components/ris-app';

if (PRODUCTION) {
  require('offline-plugin/runtime').install();
}

customElements.define('photo-details', PhotoDetails);
customElements.define('photo-alert', PhotoAlert);
customElements.define('photo-gallery', PhotoGallery);
customElements.define('photo-loader', PhotoLoader);
customElements.define('photo-thumb', PhotoThumb);
customElements.define('search-bar', SearchBar);
customElements.define('ris-app', RisApp);
