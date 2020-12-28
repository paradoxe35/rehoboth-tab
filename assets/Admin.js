import 'alpinejs'
import "bootstrap/dist/css/bootstrap.min.css"
import "/@/styles/dashboard.css"
import loadComponents from 'gia/loadComponents';
import components from '/@/admin/components';
import config from 'gia/config';

loadComponents(components);
// @ts-ignore
config.set('log', process.env.NODE_ENV == "development");