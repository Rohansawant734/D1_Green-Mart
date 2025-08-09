import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AddressProvider } from './context/AddressContext.jsx'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>

      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <AddressProvider>
              <App />
            </AddressProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>

    </BrowserRouter>
  // </StrictMode>
)
