import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';
import { SyncProvider } from './context/SyncContext';
import { ModalProvider } from './context/ModalContext';
import './styles/app.css';
import './styles/documents.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <DataProvider>
          <SyncProvider>
            <BrowserRouter>
              <ModalProvider>
                <App />
              </ModalProvider>
            </BrowserRouter>
          </SyncProvider>
        </DataProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
