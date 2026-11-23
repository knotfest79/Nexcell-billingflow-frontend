import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useModal } from '../../context/ModalContext';
import { useSync } from '../../context/SyncContext';
import { useToast } from '../../context/ToastContext';
import { getTodayISO } from '../../utils/date';
import { money } from '../../utils/format';
import { Badge, StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { Modal } from './Modal';
import { CommandPalette } from './CommandPalette';
import { CustomerForm, emptyCustomerForm, type CustomerFormValues } from '../customer/CustomerForm';
import { ServiceForm, emptyServiceForm, type ServiceFormValues } from '../service/ServiceForm';
import { PaymentForm, emptyPaymentForm, type PaymentFormValues } from '../payment/PaymentForm';

export function ModalHost() {
  const { activeModal, modalPayload, closeModal } = useModal();
  const { invoices, customers, getCustomer, addCustomer, addService, addPayment, addRevision } = useData();
  const { toast } = useToast();
  const { setSync } = useSync();
  const [customerForm, setCustomerForm] = useState<CustomerFormValues>(emptyCustomerForm);
  const [serviceForm, setServiceForm] = useState<ServiceFormValues>(emptyServiceForm);
  const [paymentForm, setPaymentForm] = useState<PaymentFormValues>(() => emptyPaymentForm(invoices));

  if (activeModal === 'command') return <CommandPalette />;
  if (!activeModal) return null;

  switch (activeModal) {
    case 'review': {
      const invoice = modalPayload.invoice;
      return (
        <Modal
          title="Review Invoice"
          titleId="rt"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={closeModal}>Back</Button>
              <Button variant="primary" onClick={() => { closeModal(); modalPayload.onConfirm?.(); }}>Create Invoice</Button>
            </>
          }
        >
          <div className="card-b">
            {invoice && (
              <>
                <div className="kv" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div><span>Invoice</span><b>{invoice.invoiceNumber}</b></div>
                  <div><span>Customer</span><b>{getCustomer(invoice.customerId)?.name ?? '—'}</b></div>
                  <div><span>Service</span><b>{invoice.serviceName}</b></div>
                  <div><span>Total</span><b>{money(invoice.total)}</b></div>
                  <div><span>Invoice Date</span><b>{invoice.invoiceDate || '–'}</b></div>
                  <div><span>Due Date</span><b>{invoice.dueDate || '–'}</b></div>
                </div>
                <div>
                  <div className="check">✓ Invoice number available</div>
                  <div className="check">✓ Customer email available</div>
                  <div className="check">✓ Invoice date is current</div>
                  <div className="check">✓ Payment information configured</div>
                </div>
              </>
            )}
          </div>
        </Modal>
      );
    }
    case 'payment':
      return (
        <Modal
          title="Record Payment"
          titleId="pt"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={() => {
                const selected = invoices.find((invoice) => invoice.id === paymentForm.invoiceId);
                addPayment({
                  invoiceNumber: selected?.invoiceNumber ?? '',
                  customerName: customers.find((customer) => customer.id === selected?.customerId)?.name ?? '',
                  paymentDate: paymentForm.paymentDate,
                  amount: Number(paymentForm.amount) || 0,
                  method: paymentForm.method,
                  reference: paymentForm.reference || '—',
                });
                closeModal();
                toast('Payment recorded');
              }}>Record Payment</Button>
            </>
          }
        >
          <PaymentForm values={paymentForm} invoices={invoices} onChange={setPaymentForm} />
        </Modal>
      );
    case 'customer':
      return (
        <Modal
          title="New Customer"
          titleId="ct"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={() => {
                const result = addCustomer({
                  name: customerForm.name,
                  businessCode: customerForm.businessCode.toUpperCase(),
                  email: customerForm.email || 'none',
                  phone: customerForm.phone || 'none',
                  address: customerForm.address || 'Address not set',
                  totalInvoiced: 0,
                  outstanding: 0,
                  lastInvoice: 'none',
                  status: 'Active',
                });
                if (!result.ok) {
                  toast(result.error ?? 'Could not create customer', 'error');
                  return;
                }
                closeModal();
                setCustomerForm(emptyCustomerForm);
                toast('Customer created');
              }}>Create customer</Button>
            </>
          }
        >
          <CustomerForm values={customerForm} onChange={setCustomerForm} />
        </Modal>
      );
    case 'service':
      return (
        <Modal
          title="New Service"
          titleId="st"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={() => {
                const result = addService({
                  name: serviceForm.name,
                  code: serviceForm.code.toUpperCase(),
                  defaultPrice: Number(serviceForm.defaultPrice) || 0,
                  taxBehaviour: 'gst_inclusive',
                  billing: serviceForm.billing,
                  invoices: 0,
                  active: true,
                });
                if (!result.ok) {
                  toast(result.error ?? 'Could not create service', 'error');
                  return;
                }
                closeModal();
                setServiceForm(emptyServiceForm);
                toast('Service created');
              }}>Create service</Button>
            </>
          }
        >
          <ServiceForm values={serviceForm} onChange={setServiceForm} />
        </Modal>
      );
    case 'conflict':
      return (
        <Modal
          title="Resolve sync conflict"
          titleId="cft"
          variant="wide"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={() => { closeModal(); setSync('online'); toast('Kept this device’s version'); }}>Keep this device</Button>
              <Button onClick={() => { closeModal(); setSync('online'); toast('Used the cloud version'); }}>Use cloud</Button>
              <Button variant="primary" onClick={() => {
                closeModal();
                setSync('online');
                addRevision({ n: 99, date: getTodayISO(), note: 'Merged from two devices after sync conflict', total: 576 });
                toast('Both versions saved as revisions');
              }}>Keep both as revisions</Button>
            </>
          }
        >
          <div className="card-b">
            <p className="sm muted">#830418-EST-WHM changed on two devices. Nothing is lost: choose what becomes current, or keep both as revisions.</p>
            <div className="compare">
              <div>
                <b>This device</b>
                <div className="sm muted">Pragesh’s MacBook · 4:32 PM</div>
                <div className="diff"><span className="muted">Due Date</span><b>11 Aug 2026</b></div>
                <div className="diff"><span className="muted">Rate</span><b>$320.00</b></div>
              </div>
              <div>
                <b>Cloud</b>
                <div className="sm muted">Office PC · 4:41 PM</div>
                <div className="diff"><span className="muted">Due Date</span><b>04 Aug 2026</b></div>
                <div className="diff"><span className="muted">Note</span><b>Paid by cheque</b></div>
              </div>
            </div>
          </div>
        </Modal>
      );
    case 'backdated':
      return (
        <Modal
          title="Backdated invoice"
          titleId="bdt"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={() => { closeModal(); modalPayload.onConfirm?.(); }}>I understand</Button>
            </>
          }
        >
          <div className="card-b">
            <div className="alert warn" style={{ margin: 0 }}>
              <b>Backdated invoice</b>
              <p className="sm">This invoice date is earlier than today.</p>
            </div>
            <p className="sm muted">You must confirm that you understand before creating this invoice.</p>
          </div>
        </Modal>
      );
    case 'confirmUpdate':
      return (
        <Modal
          title="Confirm update"
          titleId="cut"
          onClose={closeModal}
          footer={
            <>
              <Button onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={() => { closeModal(); modalPayload.onConfirm?.(); }}>Update Invoice</Button>
            </>
          }
        >
          <div className="card-b">
            <p className="sm muted">You are modifying an existing invoice. Changes will be recorded as a new revision; the original is preserved.</p>
            <div className="row"><Badge>{modalPayload.invoiceNumber ?? 'Existing invoice'}</Badge><StatusBadge status="Draft" /></div>
          </div>
        </Modal>
      );
  }
}
