# Nexcell BillingFlow — React frontend

## Current status

**This version uses mock frontend data only.** The real Python BillingFlow integration is **not connected yet**. No email is sent, no Python scripts are executed, no spreadsheets are modified, no real PDFs/receipts are generated, and no live business data is touched. All actions are local, mocked interactions with toast feedback.

The original vanilla prototype is preserved untouched in `prototype-original/`.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Vite serves the app at `http://localhost:5173` by default.

## Build

```bash
npm run build
```

TypeScript is checked as part of the build (`tsc -b && vite build`).

## Routes

`/`, `/invoices`, `/invoices/new`, `/invoices/:invoiceId`, `/invoices/:invoiceId/edit`, `/customers`, `/customers/:customerId`, `/services`, `/payments`, `/receipts`, `/reminders`, `/tax-records`, `/reports`, `/settings`.

Navigation uses React Router. Sidebar, command palette, header actions, tables, and buttons all navigate through the router.

## Architecture

```
src/
├── components/
│   ├── layout/      Sidebar, Header, AppLayout, MobileNavigation
│   ├── common/      Button, Card, Modal, Dropdown, StatusBadge, Toast,
│   │                SearchInput, EmptyState, SyncIndicator, CommandPalette,
│   │                Tabs, Toggle, Bar, ModalHost
│   ├── invoice/     InvoiceTable, InvoiceForm, InvoiceItems, InvoiceTotals,
│   │                InvoicePreview, InvoiceDetails, InvoiceRevisionHistory, InvoiceStatus
│   ├── customer/    CustomerTable, CustomerForm, CustomerSelector, CustomerDetails
│   ├── service/     ServiceTable, ServiceForm, ServiceSelector
│   └── payment/     PaymentTable, PaymentForm
├── pages/           One component per route
├── api/             Shared HTTP client + endpoint modules + offline extension points
├── types/           TypeScript domain models
├── data/            Typed mock data (temporary)
├── hooks/           Small reusable hooks (online/offline state)
├── context/         Theme, Toast, Modal, Data, Sync providers
├── utils/           Date, formatting, icon helpers
├── styles/app.css   Original prototype design system (CSS variables)
├── App.tsx          Route table only
└── main.tsx         Provider composition + mount
```

### Key implementation notes

- The CSS in `src/styles/app.css` is the original prototype stylesheet, copied with only a few React-support additions at the end (mobile backdrop click target and toast kind accents). Dark mode still uses the same CSS variables and persists to `localStorage` (`bf-theme`).
- All UI state is React state. There are no `document.querySelector`, `getElementById`, or manual `innerHTML` updates.
- Dates come from `getTodayISO()` using the browser's local date. New invoices always start with today's date and a due date from `calculateDueDate()`; no previous invoice date is carried forward.
- Invoice numbers shown in the UI are **previews only**. The backend will become authoritative for final invoice-number generation and duplicate validation.
- Backdated invoices require explicit confirmation in the form and a confirmation modal before the review step.
- The sync indicator is a mock/demo control that cycles through `online`, `syncing`, `pending`, `offline`, `error`, and `conflict`. Conflict review is wired to a reusable modal. Offline/sync-queue types exist in `src/api/offline.ts` as extension points only — cloud sync is not implemented.
- Records created in the UI (customers, services, payments, invoices, revisions) live in memory in `DataProvider` and are lost on refresh.

## Environment configuration

Copy `.env.example` to `.env` if you want to override the API base URL:

```bash
cp .env.example .env
```

```
VITE_API_BASE_URL=http://localhost:8000/api
```

The frontend never hardcodes API URLs in components. Every request goes through `src/api/client.ts`, which reads `import.meta.env.VITE_API_BASE_URL`.

## Future FastAPI integration

Planned flow:

```
React (Vite)  --HTTP-->  FastAPI  -->  existing Python BillingFlow logic
```

1. Run FastAPI in Ubuntu/WSL, e.g. `http://localhost:8000/api`. From Windows, use `http://localhost:8000/api` when WSL port forwarding is active, or use the WSL IP/host configured through `VITE_API_BASE_URL`.
2. Change only `VITE_API_BASE_URL` to switch to a remote backend, e.g. `https://api.billingflow.example.com/api`. No page component changes are required.
3. Replace the mock arrays in `src/data/mockData.ts` with calls to the existing API modules (`src/api/invoices.ts`, `customers.ts`, `services.ts`, `payments.ts`, `receipts.ts`). The endpoint modules already define the intended shapes.
4. Let the backend generate and validate final invoice numbers, record revisions, send emails, generate PDFs/receipts, and own conflict resolution.
5. Add persistence (IndexedDB/local cache), a real sync queue, pending-change tracking, and conflict detection on top of the existing `SyncSnapshot`/`PendingChange` types.

Do not call Python scripts from the browser; all backend operations must go through FastAPI endpoints.
