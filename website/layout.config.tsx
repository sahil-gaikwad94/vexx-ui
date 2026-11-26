export const layoutConfig = {
  title: 'Vexx',
  subtitle: 'Make the model prove it · vexx2.1',
  description:
    'Vexx 2.1 compiles Pydantic schemas, algebraic constraints and Python code into a verified generation loop — with receipts, proof certificates and an agent firewall. By maya labs.',
  github: 'https://github.com/sahil-gaikwad94/vexx',
  githubDocs: 'https://github.com/sahil-gaikwad94/vexx/tree/main/website/content/docs',
  favicon: '/favicon.ico',
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
  },
  topLinks: [
    { text: 'Docs', url: '/docs/getting-started' },
    { text: 'Playground', url: '/playground' },
    { text: 'Verify', url: '/verify' },
    { text: 'GitHub', url: 'https://github.com/sahil-gaikwad94/vexx', external: true },
  ],
  search: {
    provider: 'orama',
    placeholder: 'Search documentation, cartridges & API…',
  },
  themeToggle: true,
  sidebar: {
    collapsible: true,
    defaultCollapsed: false,
  },
};
