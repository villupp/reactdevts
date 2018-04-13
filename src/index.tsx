import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import RepoViewer from './RepoViewer';

ReactDOM.render(
    <RepoViewer value="" />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
