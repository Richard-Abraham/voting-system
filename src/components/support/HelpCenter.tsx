
import { Link } from 'react-router-dom';

const HELP_CATEGORIES = [
  {
    title: 'Voting Process',
    description: 'Learn how to cast your vote and view election results',
    icon: '🗳️',
    link: '/help/voting-guide'
  },
  {
    title: 'Technical Support',
    description: 'Having trouble with the platform? Get technical help',
    icon: '🔧',
    link: '/help/technical'
  },
  {
    title: 'FAQ',
    description: 'Frequently asked questions about the election process',
    icon: '❓',
    link: '/help/faq'
  }
];

export function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {HELP_CATEGORIES.map((category) => (
          <Link
            key={category.title}
            to={category.link}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="text-3xl mb-4 block">{category.icon}</span>
            <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-indigo-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
        <p className="mb-4">Contact our support team directly:</p>
        <a
          href="mailto:support@studentelections.com"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          support@studentelections.com
        </a>
      </div>
    </div>
  );
} 