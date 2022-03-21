// Core
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from 'mobx';

// Components
import { Provider } from './lib/Provider';

// Instruments
import { RoutesComponent } from './navigation';

// Styles
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './theme/index.scss';

configure({
    enforceActions:             'always',
    computedRequiresReaction:   true,
    observableRequiresReaction: true,
    reactionRequiresObservable: true,
});

render(
    <Provider>
        <Router>
            <RoutesComponent />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
