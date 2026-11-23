import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { InvoiceForm } from '../components/invoice/InvoiceForm';
import { InvoicePreview } from '../components/invoice/InvoicePreview';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { DEFAULT_PAYMENT_DETAILS, newInvoiceItems } from '../data/mockData';
import { calculateDueDate, getTodayISO, isBackdated } from '../utils/date';
import type { Invoice, InvoiceDraft } from '../types/invoice';

export function NewInvoicePage() {
  const { customers, services, getCustomer, addInvoice } = useData();
  const { openModal } = useModal();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [draft, setDraft] = useState<InvoiceDraft>(() => {
    const today = getTodayISO();
    return {
      customerId: customers[0]?.id ?? '',
      serviceId: services[0]?.id ?? '',
      invoiceDate: today,
      dueDate: calculateDueDate(today),
      currency: 'AUD',
      items: newInvoiceItems.map((item) => ({ ...item })),
      notes: '',
      internalNotes: '',
      paymentDetails: DEFAULT_PAYMENT_DETAILS,
      backdatedReason: '',
      backdatedConfirmed: false,
    };
  });

  const customer = getCustomer(draft.customerId);
  const service = services.find((item) => item.id === draft.serviceId);
  const backdated = isBackdated(draft.invoiceDate);

  // PREVIEW ONLY: the backend will later become authoritative for final
  // invoice-number generation and duplicate validation.
  const invoiceNumberPreview = useMemo(
    () => `#830418-${customer?.businessCode ?? ''}-${service?.code ?? ''}`,
    [customer?.businessCode, service?.code],
  );

  const subtotal = draft.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  const onChange = (patch: Partial<InvoiceDraft>) => {
    setDraft((current) => {
      const next = { ...current, ...patch };
      if (patch.invoiceDate !== undefined) {
        next.dueDate = calculateDueDate(patch.invoiceDate);
        next.backdatedConfirmed = false;
      }
      if (patch.serviceId !== undefined) {
        const selected = services.find((item) => item.id === patch.serviceId);
        if (selected) {
          next.items = current.items.map((item, index) => index === 0 ? {
            ...item,
            description: selected.name,
            details: selected.description ?? '',
            unitPrice: selected.defaultPrice,
          } : item);
        }
      }
      return next;
    });
  };

  const buildInvoice = (): Invoice => {
    const number = invoiceNumberPreview.replace(/^#/, '');
    return {
      id: number,
      invoiceNumber: invoiceNumberPreview,
      customerId: draft.customerId,
      businessCode: customer?.businessCode ?? '',
      serviceCode: service?.code ?? '',
      serviceName: service?.name ?? '',
      invoiceDate: draft.invoiceDate,
      dueDate: draft.dueDate,
      status: 'draft',
      displayStatus: 'Draft',
      items: draft.items,
      subtotal,
      tax: 0,
      discount: 0,
      total: subtotal,
      amountPaid: 0,
      balanceDue: subtotal,
      currency: draft.currency,
      notes: draft.notes,
      internalNotes: draft.internalNotes,
      paymentDetails: draft.paymentDetails,
    };
  };

  const confirmCreate = () => {
    const invoice = buildInvoice();
    addInvoice(invoice);
    toast('Invoice created successfully');
    navigate(`/invoices/${invoice.id}`);
  };

  const openReview = () => {
    openModal('review', {
      invoice: buildInvoice(),
      onConfirm: confirmCreate,
    });
  };

  const handleCreate = () => {
    if (backdated && !draft.backdatedConfirmed) {
      toast('Confirm the backdated invoice to continue', 'warning');
      openModal('backdated', {
        onConfirm: () => onChange({ backdatedConfirmed: true }),
      });
      return;
    }
    openReview();
  };

  return (
    <>
      <div className="page-head">
        <div><h1>New Invoice</h1><p className="muted">Create and send a professional invoice.</p></div>
        <div className="row sticky-act">
          <Button onClick={() => toast('Draft saved')}>Save Draft</Button>
          <Button onClick={() => toast('Preview opened (demo)', 'info')}>Preview</Button>
          <Button variant="primary" onClick={handleCreate}>Create Invoice</Button>
        </div>
      </div>
      <div className="invoice-layout">
        <InvoiceForm
          draft={draft}
          invoiceNumberPreview={invoiceNumberPreview}
          customers={customers}
          services={services}
          backdated={backdated}
          onChange={onChange}
          onAddCustomer={() => openModal('customer')}
        />
        <InvoicePreview
          customer={customer}
          invoiceNumber={invoiceNumberPreview}
          invoiceDate={draft.invoiceDate}
          dueDate={draft.dueDate}
          items={draft.items}
          subtotal={subtotal}
          tax={0}
          discount={0}
          total={subtotal}
          currency={draft.currency}
          notes={draft.notes}
          backdated={backdated}
          paymentDetails={draft.paymentDetails}
        />
      </div>
    </>
  );
}
