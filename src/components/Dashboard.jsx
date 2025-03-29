export default function Dashboard() {
    const stats = [
      { title: 'Total Events', value: '24', color: 'bg-blue-100' },
      { title: 'Merchandise Items', value: '156', color: 'bg-green-100' },
      { title: 'Active Users', value: '1,234', color: 'bg-yellow-100' },
      { title: 'Total Revenue', value: '₹54,320', color: 'bg-purple-100' },
    ]
  
    return (
      <div>
        <h1 className="text-3xl font-bold text-college-primary mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-sm ${stat.color}`}>
              <h3 className="text-lg font-semibold mb-2">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          {/* Add activity timeline component here */}
        </div>
      </div>
    )
  }
  