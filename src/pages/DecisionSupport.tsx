import React, { useState } from 'react';
import { Brain, Target, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const DecisionSupport: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<string>('');
  
  const mockRecommendations = [
    {
      id: '1',
      holderName: 'Ravi Kumar',
      village: 'Kondagaon',
      recommendations: [
        {
          scheme: 'PM-KISAN',
          eligible: true,
          priority: 'high' as const,
          reason: 'Agricultural land ownership confirmed',
          action: 'Direct enrollment recommended',
        },
        {
          scheme: 'Jal Jeevan Mission',
          eligible: true,
          priority: 'medium' as const,
          reason: 'No piped water access detected',
          action: 'Survey required for water connection',
        },
        {
          scheme: 'MGNREGA',
          eligible: true,
          priority: 'high' as const,
          reason: 'Located in MGNREGA priority area',
          action: 'Immediate job card issuance',
        }
      ],
      aiInsights: [
        'Satellite data shows recent agricultural activity on claimed land',
        'Water stress index indicates high priority for water schemes',
        'Economic vulnerability score: 7.2/10 (High priority)',
      ]
    }
  ];

  const dssStats = [
    { label: 'Records Analyzed', value: '12,547', icon: Brain, color: 'blue' },
    { label: 'Recommendations Generated', value: '8,932', icon: Target, color: 'green' },
    { label: 'Schemes Matched', value: '15,847', icon: TrendingUp, color: 'purple' },
    { label: 'Interventions Planned', value: '2,156', icon: AlertCircle, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AI Decision Support System</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Run AI Analysis
        </button>
      </div>

      {/* DSS Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dssStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI-Generated Recommendations
          </h3>
        </div>
        
        <div className="p-6">
          {mockRecommendations.map((rec) => (
            <div key={rec.id} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">{rec.holderName}</h4>
                <p className="text-sm text-gray-600">Village: {rec.village}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scheme Recommendations */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-4">Scheme Eligibility & Recommendations</h5>
                  <div className="space-y-4">
                    {rec.recommendations.map((scheme, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-medium text-gray-900">{scheme.scheme}</h6>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              scheme.priority === 'high' ? 'bg-red-100 text-red-800' :
                              scheme.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {scheme.priority.toUpperCase()} PRIORITY
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{scheme.reason}</p>
                        <p className="text-sm font-medium text-blue-600">{scheme.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-4">AI-Powered Insights</h5>
                  <div className="space-y-3">
                    {rec.aiInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-sm text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intervention Priorities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Priority Interventions</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium text-red-900">Critical - Water Access</span>
              </div>
              <p className="text-sm text-red-800">847 households without piped water access</p>
              <p className="text-xs text-red-600 mt-1">Jal Jeevan Mission priority</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-medium text-yellow-900">High - Livelihood Support</span>
              </div>
              <p className="text-sm text-yellow-800">1,254 eligible for MGNREGA employment</p>
              <p className="text-xs text-yellow-600 mt-1">Job card pending issuance</p>
            </div>
            
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium text-green-900">Medium - Agricultural Support</span>
              </div>
              <p className="text-sm text-green-800">2,156 farmers eligible for PM-KISAN</p>
              <p className="text-xs text-green-600 mt-1">Direct benefit transfer ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSupport;