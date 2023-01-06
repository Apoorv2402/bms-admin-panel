export const oktaConfig = {
  oidc: {
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `${window.location.origin}`,
    pkce: false,
    disableHttpsCheck: true,
    useInteractionCode: true,
  },
  widget: {
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirectUri: `${window.location.origin}`,
    scopes: ['openid', 'profile', 'email'],
    authParams: {
      issuer: process.env.REACT_APP_OKTA_ISSUER,
    },
    pkce: false,
    disableHttpsCheck: true,
    useInteractionCode: true,
  },
};
