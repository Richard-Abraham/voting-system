import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitSupportTicket } from '../../lib/api/support';

interface SupportTicket {
  title: string;
  description: string;
  type: 'login' | 'voting' | 'results' | 'other';
}

export function TechnicalSupport() {
  const [ticket, setTicket] = useState<SupportTicket>({
    title: '',
    description: '',
    type: 'other'
  });

  const submitTicketMutation = useMutation({
    mutationFn: submitSupportTicket,
    onSuccess: () => {
      // Reset form and show success message
      setTicket({ title: '', description: '', type: 'other' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTicketMutation.mutate(ticket);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Technical Support</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Issue Type</label>
          <select
            value={ticket.type}
            onChange={(e) => setTicket({ ...ticket, type: e.target.value as SupportTicket['type'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="login">Login Issues</option>
            <option value="voting">Voting Problems</option>
            <option value="results">Results Display</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={ticket.description}
            onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitTicketMutation.isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitTicketMutation.isPending ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  );
} 