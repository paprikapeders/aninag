import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';

const appName = 'Aninag';

createServer(page =>
    createInertiaApp({
        page,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
        setup: ({ App, props }) => ReactDOMServer.renderToString(<App {...props} />),
        progress: {
            color: '#1a1a1a',
        },
    })
);
