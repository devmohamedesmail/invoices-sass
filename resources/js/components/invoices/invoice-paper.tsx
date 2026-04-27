import React from 'react'

export default function InvoicePaper({ invoice }: { invoice: any }) {
    console.log("invoice", invoice)
    return (
        <div className="w-full h-full border flex flex-col" style={{ width: '210mm', height: '297mm', minHeight: '297mm', maxHeight: '297mm', direction: 'rtl' }}>
            {/* invoice header */}
            <div className="p-8 bg-white text-black w-200 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">{invoice.company.name}</h1>
          <p>{invoice.company.address}</p>
          <p>{invoice.company.phone}</p>
          <p>{invoice.company.vat_number}</p>
        </div>

        <div className="text-right">
          <h2 className="text-xl font-semibold">INVOICE</h2>
          <p><strong>#:</strong> {invoice.invoice_number}</p>
          <p><strong>Date:</strong> {invoice.invoice_date}</p>
          <p><strong>Due:</strong> {invoice.due_date}</p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Bill To:</h3>
        <p>{invoice.client.name}</p>
        <p>{invoice.client.email}</p>
        <p>{invoice.client.phone}</p>
      </div>

      {/* Services Table */}
      <table className="w-full mt-6 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Service</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.services.map((s: any) => (
            <tr key={s.id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.description}</td>
              <td className="border p-2 text-center">{s.quantity}</td>
              <td className="border p-2 text-center">{s.unit_price}</td>
              <td className="border p-2 text-center">{s.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-6 flex justify-end">
        <div className="w-[300px]">
          <div className="flex justify-between border-b py-2">
            <span>Subtotal</span>
            <span>{invoice.subtotal}</span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span>Tax</span>
            <span>{invoice.tax}</span>
          </div>

          <div className="flex justify-between border-b py-2 font-bold">
            <span>Total</span>
            <span>{invoice.total}</span>
          </div>

          <div className="flex justify-between py-2">
            <span>Paid</span>
            <span>{invoice.paid_amount}</span>
          </div>

          <div className="flex justify-between py-2 font-bold text-red-600">
            <span>Balance</span>
            <span>{invoice.balance}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mt-6">
          <h3 className="font-semibold">Notes:</h3>
          <p>{invoice.notes}</p>
        </div>
      )}

      {/* Terms */}
      {invoice.terms && (
        <div className="mt-4">
          <h3 className="font-semibold">Terms & Conditions:</h3>
          <p>{invoice.terms}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-10 text-sm text-gray-500">
        Thank you for your business
      </div>
    </div>
        </div>
    )
}
