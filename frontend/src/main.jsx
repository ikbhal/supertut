import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
  domain="dev-io8yt1yy2xpcnykz.us.auth0.com"
  clientId="QLYTupAq6BQB8fVrudUyTlnRK54YUMBh"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
</Auth0Provider>,
)

