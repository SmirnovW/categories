import React from 'react';
import { Roboto } from 'next/font/google';
const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
	variable: '--font-roboto-mono',
});

import 'styles/globals.css';

import { ErrorBoundary } from 'components/error-boundary';
import { Error } from 'components/error';

export default function App({ Component, pageProps }) {
	return (
		<ErrorBoundary
			fallback={
				<div className={`main ${roboto.className}`}>
					<Error />
				</div>
			}
		>
			<div className={`main ${roboto.className}`}>
				<Component {...pageProps} />
			</div>
		</ErrorBoundary>
	);
}
