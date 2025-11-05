import React, { useState, useEffect, useCallback } from "react";

// --- MOCK DATA (Internal Store) ---
const leadsMock = [
  { id: 1, name: "Jane Foster", email: "jane@example.com", status: "New", source: "Website", value: 5000, assigned: "Alice", created: "2025-10-28" },
  { id: 2, name: "Thor Odinson", email: "thor@example.com", status: "Contacted", source: "Referral", value: 12000, assigned: "Bob", created: "2025-10-27" },
  { id: 3, name: "Loki Laufeyson", email: "loki@example.com", status: "Qualified", source: "LinkedIn", value: 8000, assigned: "Alice", created: "2025-10-25" },
  { id: 4, name: "Bruce Banner", email: "bruce@example.com", status: "Disqualified", source: "Cold Call", value: 0, assigned: "Bob", created: "2025-10-24" },
  { id: 5, name: "Wanda Maximoff", email: "wanda@example.com", status: "New", source: "Website", value: 9000, assigned: "Carol", created: "2025-10-23" },
];
const customersMock = [
  { id: 101, name: "Tony Stark", email: "tony@stark.com", phone: "555-0101", status: "Active", industry: "Tech", created: "2024-01-15" },
  { id: 102, name: "Steve Rogers", email: "steve@avengers.com", phone: "555-0102", status: "Inactive", industry: "Defense", created: "2024-03-20" },
  { id: 103, name: "Natasha Romanoff", email: "natasha@shield.org", phone: "555-0103", status: "Active", industry: "Security", created: "2023-11-01" },
];
const dealsMock = [
    { id: 201, name: "Stark Tower Upgrade", stage: "Proposal Sent", amount: 50000, owner: "Alice", closeDate: "2025-12-01", priority: 'High' },
    { id: 202, name: "Avengers Initiative Contract", stage: "Qualification", amount: 120000, owner: "Bob", closeDate: "2026-01-15", priority: 'Medium' },
    { id: 203, name: "New Shield Project", stage: "Negotiation", amount: 30000, owner: "Carol", closeDate: "2025-11-20", priority: 'High' },
    { id: 204, name: "Gamma Testing Facility", stage: "Closed Won", amount: 15000, owner: "Alice", closeDate: "2025-10-10", priority: 'Low' },
    { id: 205, name: "Wakanda Tech Transfer", stage: "Lead In", amount: 90000, owner: "Bob", closeDate: "2026-03-01", priority: 'Medium' },
];
const ticketsMock = [
    { id: 301, subject: "API key expired", status: "Open", priority: "High", assigned: "Support Team", created: "2025-10-30" },
    { id: 302, subject: "Billing Inquiry", status: "Pending", priority: "Medium", assigned: "Alice", created: "2025-10-29" },
    { id: 303, subject: "Feature Request: Dark Mode", status: "Closed", priority: "Low", assigned: "Bob", created: "2025-10-25" },
];
// --- END MOCK DATA ---

// Navigation items for the sidebar (Using Emojis/Symbols instead of react-icons/hi)
const crmNavItems = [
  { path: "/dashboard/admin", label: "Dashboard", icon: "🏠", end: true },
  { path: "/dashboard/admin/leads", label: "Leads Management", icon: "🔥" },
  { path: "/dashboard/admin/customers", label: "Customers / Contacts", icon: "👥" },
  { path: "/dashboard/admin/deals", label: "Deals Pipeline", icon: "💰" },
  { path: "/dashboard/admin/tickets", label: "Tickets / Support", icon: "🎫" },
  { path: "/dashboard/admin/reports", label: "Reports & Analytics", icon: "📄" },
];
const utilityNavItems = [
    { path: "/dashboard/admin/profile", label: "My Profile", icon: "👤" },
    { path: "/dashboard/admin/settings", label: "Settings", icon: "⚙️" },
];
const allNavItems = [...crmNavItems, ...utilityNavItems];

// --- SUB-COMPONENTS START ---

const MetricCard = ({ title, value, change, color, description }) => {
  const isPositive = change > 0;
  const changeColor = isPositive ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100';

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
        {/* Removed Icon component */}
      </div>
      <p className="text-4xl font-extrabold text-gray-900 mt-2">{value}</p>
      
      <div className="mt-3 flex items-center justify-between">
        <span className={`flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${changeColor}`}>
          <span className="mr-1">{isPositive ? '▲' : '▼'}</span>
          {Math.abs(change)}%
        </span>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const DashboardOverview = ({ navigate }) => {
  const totalLeads = leadsMock.length;
  const newLeads = leadsMock.filter(l => l.status === 'New').length;
  const activeDeals = dealsMock.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost').length;
  const pendingTickets = ticketsMock.filter(t => t.status !== 'Closed').length;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">CRM Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Leads" 
          value={totalLeads} 
          change={15} 
          color="#0080FF" 
          description={`${newLeads} new leads this week`}
        />
        <MetricCard 
          title="Active Deals" 
          value={activeDeals} 
          change={-5} 
          color="#FFC107" 
          description={`$${(dealsMock.reduce((sum, d) => sum + (d.stage === 'Closed Won' ? d.amount : 0), 0) / 1000).toFixed(0)}K Closed Won`}
        />
        <MetricCard 
          title="Pending Tickets" 
          value={pendingTickets} 
          change={20} 
          color="#F44336" 
          description={`${pendingTickets} open tickets`}
        />
        <MetricCard 
          title="Total Customers" 
          value="1,450" 
          change={5} 
          color="#4CAF50" 
          description="5% growth MoM"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 flex items-center">📈 Monthly Sales Trend</h3>
          <div className="h-72 flex items-center justify-center text-gray-400 border border-dashed rounded-lg bg-gray-50">
            [Placeholder for Line Chart: Revenue vs Time]
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">🔥 Recent Leads (New)</h3>
          <ul className="space-y-3">
            {leadsMock.filter(l => l.status === 'New').slice(0, 5).map(lead => (
              <li key={lead.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center text-sm hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/dashboard/admin/leads')}>
                <div>
                  <p className="font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.source} - ${lead.value}</p>
                </div>
                <span className="text-xs text-[#0080FF]">{lead.assigned}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const LeadsManagement = () => {
    const [leads, setLeads] = useState(leadsMock);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddLead = () => console.log("Adding new lead...");
    const handleEdit = (id) => console.log(`Editing lead ${id}`);
    const handleDelete = (id) => setLeads(leads.filter(l => l.id !== id));

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">🔥 Leads Management (CRUD)</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white rounded-xl shadow">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0080FF] focus:border-[#0080FF]"
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"><span className="mr-2">🔎</span> Filter</button>
                    <button 
                        onClick={handleAddLead} 
                        className="flex items-center px-4 py-2 bg-[#0080FF] text-white rounded-lg hover:bg-[#0066CC] transition"
                    >
                        <span className="mr-2">➕</span> Add Lead
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                        lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>{lead.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${lead.value.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.assigned}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                    <button onClick={() => handleEdit(lead.id)} className="text-[#0080FF] hover:text-[#0066CC]">✏️</button>
                                    <button onClick={() => handleDelete(lead.id)} className="text-red-600 hover:text-red-900">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CustomersManagement = () => {
    const [customers, setCustomers] = useState(customersMock);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">👥 Customers / Contacts Management</h2>
            
            <div className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0080FF] focus:border-[#0080FF]"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>
                <button onClick={() => console.log("Add contact")} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Add Contact</button>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>{customer.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.industry}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                    <button onClick={() => console.log(`View ${customer.name}`)} className="text-[#0080FF] hover:text-[#0066CC]">View</button>
                                    <button onClick={() => console.log(`Edit ${customer.name}`)} className="text-yellow-600 hover:text-yellow-900">✏️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DealsPipeline = () => {
    const [deals, setDeals] = useState(dealsMock);
    
    const pipelineStages = [
        { id: 'Lead In', color: 'border-blue-500', bg: 'bg-blue-50', name: 'Lead In' },
        { id: 'Qualification', color: 'border-yellow-500', bg: 'bg-yellow-50', name: 'Qualification' },
        { id: 'Proposal Sent', color: 'border-indigo-500', bg: 'bg-indigo-50', name: 'Proposal Sent' },
        { id: 'Negotiation', color: 'border-purple-500', bg: 'bg-purple-50', name: 'Negotiation' },
        { id: 'Closed Won', color: 'border-green-500', bg: 'bg-green-50', name: 'Closed Won' },
        { id: 'Closed Lost', color: 'border-red-500', bg: 'bg-red-50', name: 'Closed Lost' },
    ];

    const handleDrop = (dealId, newStage) => {
        setDeals(deals.map(deal => 
            deal.id === dealId ? { ...deal, stage: newStage } : deal
        ));
    };

    const handleDragStart = (e, dealId) => {
        e.dataTransfer.setData("dealId", dealId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const activeDealsValue = deals
        .filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost')
        .reduce((sum, d) => sum + d.amount, 0);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">💰 Deals / Sales Pipeline (Kanban)</h2>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow">
                <button className="px-4 py-2 bg-[#0080FF] text-white rounded-lg hover:bg-[#0066CC]">Add Deal</button>
                <div className="text-sm text-gray-600 font-medium">
                    Active Pipeline Value: <span className="text-lg font-bold text-[#0080FF]">${activeDealsValue.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex overflow-x-auto pb-4 space-x-4">
                {pipelineStages.map(stage => (
                    <div 
                        key={stage.id} 
                        className="flex-shrink-0 w-80 bg-gray-100 p-3 rounded-xl shadow-inner"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(parseInt(e.dataTransfer.getData("dealId")), stage.id)}
                    >
                        <h3 className={`font-semibold text-lg mb-3 p-2 rounded ${stage.bg} border-l-4`} style={{borderColor: stage.color}}>
                            {stage.name} ({deals.filter(d => d.stage === stage.id).length})
                        </h3>
                        
                        <div className="space-y-3 min-h-[500px]">
                            {deals.filter(d => d.stage === stage.id).map(deal => (
                                <div 
                                    key={deal.id} 
                                    draggable 
                                    onDragStart={(e) => handleDragStart(e, deal.id)}
                                    className="bg-white p-4 rounded-lg shadow cursor-grab border-t-2 hover:shadow-md transition" style={{borderColor: stage.color}}
                                >
                                    <p className="font-medium text-gray-900">{deal.name}</p>
                                    <p className="text-lg font-bold text-[#0080FF] mt-1">${deal.amount.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Owner: {deal.owner} | Priority: <span className={`font-semibold ${deal.priority === 'High' ? 'text-red-500' : 'text-gray-500'}`}>{deal.priority}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TicketsManagement = () => {
    const [tickets, setTickets] = useState(ticketsMock);
    
    const handleClose = (id) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
    };

    const getStatusStyle = (status) => {
        if (status === 'Open') return 'bg-red-100 text-red-800';
        if (status === 'Pending') return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">📞 Tickets / Support Management</h2>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow">
                <div className="relative w-full max-w-sm">
                    <input type="text" placeholder="Search tickets..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">New Ticket</button>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(ticket.status)}`}>{ticket.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 py-0.5 inline-flex text-xs rounded-full ${ticket.priority === 'High' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>{ticket.priority}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.assigned}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                    <button onClick={() => console.log(`View ${ticket.subject}`)} className="text-[#0080FF] hover:text-[#0066CC]">View</button>
                                    {ticket.status !== 'Closed' && (
                                        <button onClick={() => handleClose(ticket.id)} className="text-green-600 hover:text-green-900">✅</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ReportsAnalytics = () => {
    const reportCards = [
        { title: "Lead Source Breakdown", description: "Shows where new leads originate.", icon: '🌐' },
        { title: "Sales Funnel Conversion", description: "Conversion rate between deal stages.", icon: '📊' },
        { title: "Support Ticket SLA Compliance", description: "Performance against Service Level Agreements.", icon: '⏱️' },
        { title: "Customer Retention Rate", description: "Tracks customer loyalty over time.", icon: '📈' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">📄 Reports & Analytics</h2>
            
            <div className="p-4 bg-white rounded-xl shadow flex justify-between items-center">
                <p className="text-gray-600">Generate, view, and export detailed CRM reports.</p>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"><span className="mr-2">⬇️</span> Export All Data (CSV)</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCards.map((report, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-3 flex items-center">{report.icon} {report.title}</h3>
                        <p className="text-gray-600 mb-4">{report.description}</p>
                        <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed rounded-lg bg-gray-50">
                            [Placeholder for {report.title} Chart]
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('roles');

    const renderContent = () => {
        switch (activeTab) {
            case 'roles':
                return (
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">🛡️ User Roles & Permissions (RBAC)</h4>
                        <p className="text-gray-600">Define access levels for Admin, Manager, and Sales Agent roles.</p>
                        <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
                            <li><span className="font-semibold">Admin:</span> Full access to all modules and settings.</li>
                            <li><span className="font-semibold">Manager:</span> View/Edit all Leads/Deals, View Reports, Limited Settings.</li>
                            <li><span className="font-semibold">Sales Agent:</span> View/Edit assigned Leads/Deals only, No access to Settings/Reports.</li>
                        </ul>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Edit Permissions</button>
                    </div>
                );
            case 'workflow':
                return (
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">✍️ CRM Workflow & Stages</h4>
                        <p className="text-gray-600">Customize the stages for Leads and Deals (e.g., add or rename pipeline steps).</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium">Current Deal Stages: Lead In &rarr; Qualification &rarr; Proposal Sent &rarr; Negotiation &rarr; Closed</p>
                        </div>
                        <button className="px-4 py-2 bg-[#0080FF] text-white rounded-lg hover:bg-[#0066CC]">Customize Workflow</button>
                    </div>
                );
            case 'system':
                return (
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">⚙️ System Configuration</h4>
                        <p className="text-gray-600">Manage API keys, integrations, and default system settings.</p>
                        <p className="text-red-500 p-2 border border-red-200 rounded-lg">Warning: Changes here affect the entire system.</p>
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">View Audit Logs</button>
                    </div>
                );
            default: return null;
        }
    };

    const tabClass = (tab) => 
        `px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === tab 
                ? 'border-[#0080FF] text-[#0080FF]' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">⚙️ System Settings</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-4 overflow-x-auto pb-1">
                        <button onClick={() => setActiveTab('roles')} className={tabClass('roles')}>🛡️ Roles & Permissions</button>
                        <button onClick={() => setActiveTab('workflow')} className={tabClass('workflow')}>✍️ Workflow</button>
                        <button onClick={() => setActiveTab('system')} className={tabClass('system')}>⚙️ System Config</button>
                    </nav>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        name: "Admin User",
        email: "admin@crmhub.com",
        role: "Super Administrator",
        team: "Executive",
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Profile saved:", profileData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800">👤 My Profile</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl font-semibold text-gray-700">User Information</h3>
                    <button 
                        onClick={() => setIsEditing(!isEditing)} 
                        className={`px-4 py-2 rounded-lg transition ${isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#0080FF] hover:bg-[#0066CC] text-white'}`}
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={profileData.name} 
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex items-center w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
                            📧 {profileData.email}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <p className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg font-semibold text-gray-700">{profileData.role}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                        <p className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700">{profileData.team}</p>
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end pt-4 border-t mt-6">
                        <button 
                            onClick={handleSave} 
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                <div className="pt-6 border-t mt-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 flex items-center">🔒 Change Password</h3>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Reset Password Link</button>
                </div>
            </div>
        </div>
    );
};
// --- SUB-COMPONENTS END ---

export default function CRMHubApp() {
  const [activePath, setActivePath] = useState("/dashboard/admin");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useCallback((path) => {
      setActivePath(path);
      setSidebarOpen(false); // Close sidebar on mobile navigation
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Simulate navigation to root
    navigate("/");
  };

  // --- RENDERING LOGIC ---

  const renderCurrentView = () => {
    switch (activePath) {
        case "/dashboard/admin":
            return <DashboardOverview navigate={navigate} />;
        case "/dashboard/admin/leads":
            return <LeadsManagement />;
        case "/dashboard/admin/customers":
            return <CustomersManagement />;
        case "/dashboard/admin/deals":
            return <DealsPipeline />;
        case "/dashboard/admin/tickets":
            return <TicketsManagement />;
        case "/dashboard/admin/reports":
            return <ReportsAnalytics />;
        case "/dashboard/admin/settings":
            return <SettingsPage />;
        case "/dashboard/admin/profile":
            return <ProfilePage />;
        default:
            return <DashboardOverview navigate={navigate} />; // Fallback
    }
  };
  
  const navLinkClass = (path) => {
    const isActive = activePath === path;
    return `flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-[#E6F3FF] text-[#0080FF] font-semibold"
        : "text-gray-600 hover:text-[#0080FF] hover:bg-gray-100"
    }`;
  };

  // Sidebar Component (Defined inside the main component to share state/props)
  const Sidebar = () => (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 fixed md:relative z-40 w-64 shadow-xl md:shadow-none`}>
      
      {/* Logo/Header */}
      <div className="flex items-center justify-between p-5 h-16 border-b border-gray-200">
        <div className="text-xl font-extrabold text-[#0080FF] flex items-center">
          <span className="text-gray-700 mr-1">💼</span>
          CRM<span className="text-gray-700">HUB</span>
        </div>
        <button
          className="md:hidden text-gray-500 hover:text-gray-700 p-1 text-lg"
          onClick={() => setSidebarOpen(false)}
        >
          ❌
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 pt-1 pb-2">CRM Modules</h3>
        {crmNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={navLinkClass(item.path)}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        
        <hr className="my-2 border-gray-100" />

        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 pt-1 pb-2">User & Config</h3>
        {utilityNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={navLinkClass(item.path)}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 text-xs text-gray-400 border-t border-gray-200">
        Role: <span className="font-semibold text-gray-600">Admin/Superuser</span>
      </div>
    </div>
  );

  if (activePath === '/') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#0080FF] mb-6">CRM Hub Login</h1>
            <button 
                onClick={() => navigate("/dashboard/admin")} 
                className="px-6 py-3 bg-[#0080FF] text-white rounded-lg shadow-lg hover:bg-[#0066CC] transition"
            >
                Login as Admin (Go to Dashboard)
            </button>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-25 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar (Desktop and Mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        
        {/* Header/Navbar */}
        <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              className="mr-4 text-gray-500 hover:text-gray-700 md:hidden text-lg"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
                CRM Administration
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Panel */}
            <div className="relative">
                <button
                    onClick={() => { setNotificationsOpen(!notificationsOpen); setUserMenuOpen(false); }}
                    className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0080FF] relative text-lg"
                    aria-label="Notifications"
                >
                    🔔
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                {notificationsOpen && (
                    <div className="absolute right-0 z-50 w-80 py-2 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-xl">
                        <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-800 border-b">
                            Activity Feed (3 new)
                            <button onClick={() => setNotificationsOpen(false)} className="text-gray-500 text-sm">❌</button>
                        </div>
                        <div className="p-2 space-y-1 text-sm max-h-64 overflow-y-auto">
                            <p className="p-2 rounded hover:bg-gray-50 text-green-700">🔔 **Tony Stark** created a new deal.</p>
                            <p className="p-2 rounded hover:bg-gray-50 text-blue-700">📧 You have 1 new lead from **Website**.</p>
                            <p className="p-2 rounded hover:bg-gray-50 text-red-700">🚨 Ticket **#301** moved to high priority.</p>
                            <p className="p-2 rounded text-gray-600 hover:bg-gray-50">User **Steve** updated settings.</p>
                        </div>
                        <div className="border-t p-2">
                            <button onClick={() => setNotificationsOpen(false)} className="block w-full text-center text-xs text-[#0080FF] hover:underline">View All Activity</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Account Dropdown */}
            <div className="relative">
                <button
                onClick={() => { setUserMenuOpen(!userMenuOpen); setNotificationsOpen(false); }}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0080FF] text-lg"
                aria-label="User menu"
                >
                👤
                </button>

                {userMenuOpen && (
                <div className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-xl">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                        admin@crmhub.com
                    </div>
                    <button
                        onClick={() => { navigate("/dashboard/admin/profile"); setUserMenuOpen(false); }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        My Profile
                    </button>
                    <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                    Logout
                    </button>
                </div>
                )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Loading/Error Indicators */}
          {(loading || error) && (
            <div className="mb-6 p-4 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200">
              {loading && <p className="text-sm">Loading data...</p>}
              {error && <p className="text-sm">Error: Unable to fetch live data.</p>}
            </div>
          )}

          {/* Renders the currently active page/view */}
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}