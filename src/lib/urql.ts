import { cacheExchange, createClient, debugExchange, fetchExchange, ssrExchange } from 'urql';

const isServerSide = typeof window === 'undefined';
const ssrCache = ssrExchange({
    isClient: !isServerSide,
});

const client = createClient({
    url: 'https://api-eu-central-1.graphcms.com/v2/ckzprq7j54bkl01z28yyf8vg3/master',
    exchanges: [
        debugExchange,
        cacheExchange,
        ssrCache,
        fetchExchange
    ],
});

export {
    client,
    ssrCache
};