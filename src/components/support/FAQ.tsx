

const FAQ_ITEMS = [
  {
    question: 'How do I verify my student status?',
    answer: 'Your student status is automatically verified through your institutional email when you sign up. If you\'re having issues, please contact your student affairs office.'
  },
  {
    question: 'Can I change my vote after submitting?',
    answer: 'No, votes are final once submitted to ensure election integrity. Make sure to review your choices carefully before confirming.'
  },
  {
    question: 'When will results be announced?',
    answer: 'Results are typically published within 24 hours of the election closing. You\'ll receive a notification when they\'re available.'
  },
  {
    question: 'What if I experience technical issues while voting?',
    answer: 'If you encounter any technical issues, please contact our support team immediately through the Technical Support page.'
  }
];

export function FAQ() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {FAQ_ITEMS.map((item, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
            <p className="mt-2 text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 