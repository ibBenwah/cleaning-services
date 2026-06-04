'use client'

import { useState, useEffect } from "react";

interface LineItem {
  id: number;
  description: string;
  qty: string;
  rate: string;
}

interface Customer {
  id: string;
  name: string;
  company: string;
  address: string;
  email: string;
}

const INVOICE_NUM_KEY = "pp_last_invoice_number";
const CUSTOMERS_KEY = "pp_customers";
const STARTING_INVOICE = 1001;

function loadNextInvoiceNumber(): string {
  const stored = localStorage.getItem(INVOICE_NUM_KEY);
  if (!stored) return String(STARTING_INVOICE);
  return String(parseInt(stored, 10) + 1);
}

function saveInvoiceNumber(num: string) {
  localStorage.setItem(INVOICE_NUM_KEY, num);
}

function loadCustomers(): Customer[] {
  try {
    return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCustomer(customer: Customer) {
  const customers = loadCustomers();
  const existing = customers.findIndex((c) => c.id === customer.id);
  if (existing >= 0) {
    customers[existing] = customer;
  } else {
    customers.unshift(customer);
  }
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

const emptyItem = (id: number): LineItem => ({
  id,
  description: "",
  qty: "1",
  rate: "",
});

let nextId = 4;

export default function InvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    emptyItem(1),
    emptyItem(2),
    emptyItem(3),
  ]);
  const [taxRate, setTaxRate] = useState("0");
  const [notes, setNotes] = useState(
    "Payment due within 30 days of invoice date. Thank you for your business!"
  );
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    setInvoiceNumber(loadNextInvoiceNumber());
    setCustomers(loadCustomers());
  }, []);

  function handleSelectCustomer(id: string) {
    setSelectedCustomerId(id);
    if (!id) return;
    const c = customers.find((c) => c.id === id);
    if (!c) return;
    setClientName(c.name);
    setClientCompany(c.company);
    setClientAddress(c.address);
    setClientEmail(c.email);
  }

  function handleSaveCustomer() {
    if (!clientName.trim()) return;
    const customer: Customer = {
      id: selectedCustomerId || Date.now().toString(),
      name: clientName,
      company: clientCompany,
      address: clientAddress,
      email: clientEmail,
    };
    saveCustomer(customer);
    const updated = loadCustomers();
    setCustomers(updated);
    setSelectedCustomerId(customer.id);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  }

  function handlePrint() {
    saveInvoiceNumber(invoiceNumber);
    window.print();
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem(nextId++)]);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateItem(id: number, field: keyof LineItem, value: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  const filledItems = items.filter(
    (i) => i.description.trim() || i.rate.trim()
  );

  const subtotal = filledItems.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const taxAmount = subtotal * ((parseFloat(taxRate) || 0) / 100);
  const total = subtotal + taxAmount;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  function formatDate(iso: string) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${m}/${d}/${y}`;
  }

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .invoice-sheet {
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          input, select, textarea {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            outline: none !important;
            resize: none !important;
          }
          .item-row-actions { display: none !important; }
          .add-row-btn { display: none !important; }
          .empty-row { display: none !important; }
        }
        @media screen {
          .print-only { display: none; }
        }
        input, select, textarea {
          font-family: inherit;
          font-size: inherit;
          color: inherit;
        }
        textarea { resize: vertical; }
      `}</style>

      <div className="min-h-screen bg-slate-100 py-8 px-4">
        {/* Toolbar */}
        <div className="no-print max-w-4xl mx-auto mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Invoice Generator</h1>
            <p className="text-sm text-muted mt-0.5">
              Fill in the fields below, then print or save as PDF.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="bg-navy hover:bg-navy/90 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
            Print / Save PDF
          </button>
        </div>

        {/* Invoice Sheet */}
        <div className="invoice-sheet max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-navy text-white px-10 py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="text-2xl font-bold tracking-tight">
                Pure Perfection
              </div>
              <div className="text-sky text-xs font-semibold tracking-widest uppercase mt-0.5">
                Cleaning LLC
              </div>
              <div className="mt-4 text-white/60 text-sm space-y-0.5">
                <p>(586) 230-0992</p>
                <p>(586) 822-8254</p>
                <p>pureperfectioncleaning8254@gmail.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tracking-tight">INVOICE</div>
              <div className="mt-3 space-y-1 text-sm text-white/70">
                <div className="flex items-center justify-end gap-3">
                  <span className="text-white/40">Invoice #</span>
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="no-print bg-white/10 text-white text-right rounded px-2 py-0.5 w-24 focus:outline-none focus:ring-1 focus:ring-sky"
                  />
                  <span className="print-only font-semibold text-white">{invoiceNumber}</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-white/40">Date</span>
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="no-print bg-white/10 text-white text-right rounded px-2 py-0.5 w-36 focus:outline-none focus:ring-1 focus:ring-sky"
                  />
                  <span className="print-only text-white">{formatDate(invoiceDate)}</span>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <span className="text-white/40">Due Date</span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Optional"
                    className="no-print bg-white/10 text-white text-right rounded px-2 py-0.5 w-36 focus:outline-none focus:ring-1 focus:ring-sky"
                  />
                  <span className="print-only text-white">{formatDate(dueDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="px-10 py-6 border-b border-slate-100">
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">
              Bill To
            </p>

            {/* Customer selector */}
            <div className="no-print flex items-center gap-2 mb-4">
              <select
                value={selectedCustomerId}
                onChange={(e) => handleSelectCustomer(e.target.value)}
                className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky bg-white"
              >
                <option value="">— Select saved customer —</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}{c.company ? ` — ${c.company}` : ""}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSaveCustomer}
                disabled={!clientName.trim()}
                className="text-sm font-medium px-3 py-1.5 rounded-lg border border-sky text-sky hover:bg-sky/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {savedBanner ? "Saved!" : "Save customer"}
              </button>
            </div>

            <div className="space-y-1.5">
              <input
                type="text"
                value={clientName}
                onChange={(e) => { setClientName(e.target.value); setSelectedCustomerId(""); }}
                placeholder="Client Name"
                className="no-print block w-full text-navy font-semibold text-base border-b border-dashed border-slate-200 pb-1 focus:outline-none focus:border-sky"
              />
              <span className="print-only block font-semibold text-navy text-base">{clientName}</span>
              <input
                type="text"
                value={clientCompany}
                onChange={(e) => { setClientCompany(e.target.value); setSelectedCustomerId(""); }}
                placeholder="Company / Property Name"
                className="no-print block w-full text-sm text-slate-600 border-b border-dashed border-slate-200 pb-1 focus:outline-none focus:border-sky"
              />
              <span className="print-only block text-sm text-slate-600">{clientCompany}</span>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => { setClientAddress(e.target.value); setSelectedCustomerId(""); }}
                placeholder="Address"
                className="no-print block w-full text-sm text-slate-600 border-b border-dashed border-slate-200 pb-1 focus:outline-none focus:border-sky"
              />
              <span className="print-only block text-sm text-slate-600">{clientAddress}</span>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => { setClientEmail(e.target.value); setSelectedCustomerId(""); }}
                placeholder="Email Address"
                className="no-print block w-full text-sm text-slate-600 border-b border-dashed border-slate-200 pb-1 focus:outline-none focus:border-sky"
              />
              <span className="print-only block text-sm text-slate-600">{clientEmail}</span>
            </div>
          </div>

          {/* Line Items */}
          <div className="px-10 py-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy text-left">
                  <th className="pb-2 text-navy font-semibold w-full pr-4">
                    Description
                  </th>
                  <th className="pb-2 text-navy font-semibold text-right pr-4 whitespace-nowrap">
                    Qty
                  </th>
                  <th className="pb-2 text-navy font-semibold text-right pr-4 whitespace-nowrap">
                    Unit Price
                  </th>
                  <th className="pb-2 text-navy font-semibold text-right whitespace-nowrap">
                    Total
                  </th>
                  <th className="item-row-actions pb-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const qty = parseFloat(item.qty) || 0;
                  const rate = parseFloat(item.rate) || 0;
                  const lineTotal = qty * rate;
                  const isEmpty =
                    !item.description.trim() && !item.rate.trim();
                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-slate-100 ${isEmpty ? "empty-row" : ""}`}
                    >
                      <td className="py-2 pr-4">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, "description", e.target.value)
                          }
                          placeholder="Service description..."
                          className="no-print w-full focus:outline-none text-slate-700 placeholder:text-slate-300"
                        />
                        <span className="print-only text-slate-700">
                          {item.description}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={item.qty}
                          onChange={(e) =>
                            updateItem(item.id, "qty", e.target.value)
                          }
                          className="no-print w-16 text-right focus:outline-none text-slate-700"
                        />
                        <span className="print-only text-slate-700">
                          {item.qty}
                        </span>
                      </td>
                      <td className="py-2 pr-4 text-right">
                        <span className="text-slate-400 mr-0.5">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(item.id, "rate", e.target.value)
                          }
                          placeholder="0.00"
                          className="no-print w-24 text-right focus:outline-none text-slate-700 placeholder:text-slate-300"
                        />
                        <span className="print-only text-slate-700">
                          {rate > 0 ? fmt(rate) : ""}
                        </span>
                      </td>
                      <td className="py-2 text-right font-medium text-navy">
                        {lineTotal > 0 ? fmt(lineTotal) : "—"}
                      </td>
                      <td className="item-row-actions py-2 pl-2 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="no-print text-slate-300 hover:text-red-400 transition-colors text-lg leading-none"
                          title="Remove row"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <button
              onClick={addItem}
              className="add-row-btn no-print mt-3 text-sky text-sm font-medium hover:underline"
            >
              + Add line item
            </button>
          </div>

          {/* Totals */}
          <div className="px-10 pb-6 flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>
                  Tax{" "}
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="no-print w-12 text-right border-b border-dashed border-slate-300 focus:outline-none"
                  />
                  <span className="no-print">%</span>
                  <span className="print-only text-slate-600">
                    {taxRate !== "0" ? `${taxRate}%` : ""}
                  </span>
                </span>
                <span>{taxAmount > 0 ? fmt(taxAmount) : "—"}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-navy border-t-2 border-navy pt-2">
                <span>Total Due</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="px-10 pb-10">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Notes & Payment Terms
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="no-print w-full bg-transparent text-sm text-slate-600 focus:outline-none"
              />
              <p className="print-only text-sm text-slate-600">{notes}</p>
            </div>
          </div>

          {/* Footer stripe */}
          <div className="bg-navy/5 border-t border-slate-100 px-10 py-4 text-center text-xs text-muted">
            Pure Perfection Cleaning LLC &mdash; Thank you for your business!
          </div>
        </div>
      </div>
    </>
  );
}
