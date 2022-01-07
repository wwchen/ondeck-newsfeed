import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  )
}

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache({
    // https://www.apollographql.com/docs/react/pagination/cursor-based/
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: ["__typename", "id"],
            // While args.cursor may still be important for requesting
            // a given page, it no longer has any role to play in the
            // merge function.
            merge(existing, incoming, { readField }) {
              const merged = { ...existing };
              incoming.forEach(item => {
                const key = readField("__typename", item) + "-" + readField("id", item)
                merged[key] = item;
              });
              return merged;
            },

            // Return all items stored so far, to avoid ambiguities
            // about the order of the items.
            read(existing) {
              return existing && Object.values(existing);
            },
          }
        }
      }
    }
  }),
})

const theme = {
  colors: {
  }
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
  }

  a {
    color: #0070f0;
    text-decoration: none;
  }

  a:hover {
    color: #0050d0;
    text-decoration: underline;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }

  p {
    font-size: 1rem;
    margin: 0 0 1rem;
  }

  * {
    box-sizing: border-box;
  }
`;