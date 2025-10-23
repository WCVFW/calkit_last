import React, { useState, useEffect } from 'react';
import { orderAPI } from '../lib/api';

export default function CheckoutModal() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(null);
  const [email, setEmail] = useState('demo@demo.com');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    function handler(e) {
      setService(e.detail.service);
      setOpen(true);
    }
    window.addEventListener('openCheckout', handler);
    return () => window.removeEventListener('openCheckout', handler);
  }, []);

  if (!open || !service) return null;

  const handleCreateOrder = async () => {
    setCreating(true);
    try {
      const payload = { serviceName: service.title, customerEmail: email };
      const res = await orderAPI.create(payload);
      const order = res.data;
      // Call payments mock
      await fetch('/api/payments/pay', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: String(order.id), method: 'mock' }) });
      // navigate to dashboard order detail
      window.location.href = `/dashboard/orders/${order.id}`;
    } catch (err) {
      console.error(err);
      alert('Failed to create order');
    } finally {
      setCreating(false);
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold">Checkout — {service.title}</h3>
        <p className="text-sm text-gray-600 mt-2">Select plan and complete payment to proceed. (Demo: mocked)</p>
        <div className="mt-4">
          <label className="block text-xs text-gray-600">Contact Email</label>
          <input className="w-full border rounded px-3 py-2 mt-1" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={() => { setOpen(false); setService(null); }} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleCreateOrder} disabled={creating} className="px-4 py-2 bg-blue-600 text-white rounded">{creating ? 'Processing...' : 'Pay & Avail'}</button>
        </div>
      </div>
    </div>
  );
}
