/* Styling */
require("!style-loader!css-loader!sass-loader!../css/app-sas.css");
/* Imports for run sample */
// import IntervalDemo from './AutoJS/Demos/IntervalDemo'
import AutojsRenderer from './AutoJS/AutojsRenderer'
/* Field generations */
window.props = window.props || {};

/* Window Listener */
window.addEventListener("DOMContentLoaded", function() {
    window.autojs = new AutojsRenderer(props, false);
    window.autojs.render();
});
