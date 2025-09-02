import React from 'react';
import { Users, FileText, CheckCircle, Clock, MapPin, Satellite, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import AnalyticsChart from '../components/Charts/AnalyticsChart';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const adminStats = [
    { title: 'Total FRA Records', value: '12,547', change: { value: '+8.2% from last month', type: 'increase' as const }, icon: FileText, color: 'blue' as const },
    { title: 'Approved Claims', value: '8,932', change: { value: '+5.1% from last month', type: 'increase' as const }, icon: CheckCircle, color: 'green' as const },
    { title: 'Pending Review', value: '2,847', change: { value: '-12.3% from last month', type: 'decrease' as const }, icon: Clock, color: 'yellow' as const },
    { title: 'Active Users', value: '1,456', change: { value: '+15.7% from last month', type: 'increase' as const }, icon: Users, color: 'purple' as const },
  ];

  const beneficiaryStats = [
    { title: 'My Applications', value: '3', icon: FileText, color: 'blue' as const },
    { title: 'Approved Claims', value: '2', icon: CheckCircle, color: 'green' as const },
    { title: 'Eligible Schemes', value: '7', icon: TrendingUp, color: 'purple' as const },
    { title: 'Land Area', value: '4.2 ha', icon: MapPin, color: 'green' as const },
  ];

  const fraStatusData = {
    labels: ['Approved', 'Pending', 'Under Review', 'Rejected'],
    datasets: [
      {
        data: [8932, 2847, 1245, 523],
        backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const monthlyTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications Received',
        data: [450, 520, 480, 600, 750, 680],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Applications Approved',
        data: [380, 420, 390, 510, 580, 620],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const stateWiseData = {
    labels: ['Chhattisgarh', 'Jharkhand', 'Odisha', 'Madhya Pradesh', 'Maharashtra'],
    datasets: [
      {
        label: 'FRA Claims',
        data: [3200, 2800, 2100, 1900, 1500],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const stats = user?.role === 'beneficiary' ? beneficiaryStats : adminStats;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.role === 'beneficiary' ? 'My Dashboard' : 'Administrative Dashboard'}
        </h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {user?.role !== 'beneficiary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            type="pie"
            title="FRA Application Status Distribution"
            data={fraStatusData}
          />
          <AnalyticsChart
            type="bar"
            title="State-wise FRA Claims"
            data={stateWiseData}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <AnalyticsChart
          type="line"
          title="Monthly Application Trends"
          data={monthlyTrendsData}
          height={400}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {user?.role === 'beneficiary' ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Your IFR application has been approved</span>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New scheme eligibility: PM-KISAN</span>
                  <span className="text-xs text-gray-400">1 week ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Land survey scheduled for next month</span>
                  <span className="text-xs text-gray-400">2 weeks ago</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">245 new FRA applications submitted today</span>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Satellite imagery updated for Bastar district</span>
                  <span className="text-xs text-gray-400">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">AI processing completed for 1,200 documents</span>
                  <span className="text-xs text-gray-400">6 hours ago</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;