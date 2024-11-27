
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getNotifications } from '../../lib/api/notifications';
import { useAuth } from '../auth/AuthProvider';

export function NotificationsPanel() {
  const { user } = useAuth();
  const { data: notifications } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => getNotifications(user!.id),
    enabled: !!user
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications?.map(notification => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-md ${
              notification.type === 'deadline' ? 'bg-yellow-50' : 
              notification.type === 'result' ? 'bg-green-50' : 
              'bg-blue-50'
            }`}
          >
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            {notification.actionUrl && (
              <Link 
                to={notification.actionUrl}
                className="text-sm text-indigo-600 hover:text-indigo-500 mt-2 inline-block"
              >
                {notification.actionText || 'View Details'}
              </Link>
            )}
          </div>
        ))}
        {(!notifications || notifications.length === 0) && (
          <p className="text-gray-500 text-center">No new notifications</p>
        )}
      </div>
    </div>
  );
} 