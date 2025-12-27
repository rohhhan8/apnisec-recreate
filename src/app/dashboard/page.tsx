"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CyberInput } from "@/components/ui/CyberInput";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Sidebar from "@/components/ui/Sidebar";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  Plus, 
  Activity, 
  Server, 
  Trash2,
  Menu,
  Sun,
  Moon,
  Bell,
  TrendingUp
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'report'>('feed');
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  
  const safeIssues = Array.isArray(issues) ? issues : [];
  const filteredIssues = filterType === 'ALL' 
    ? safeIssues 
    : safeIssues.filter(issue => issue.type === filterType);
  
  const issueTypes = ['ALL', ...new Set(safeIssues.map(i => i.type).filter(Boolean))];

  // Stats cards data
  const stats = [
    { 
      label: "Total Issues", 
      value: safeIssues.length.toString(), 
      icon: <AlertCircle className="w-5 h-5" />,
      color: darkMode ? "text-red-400" : "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    { 
      label: "Security Score", 
      value: "85%", 
      icon: <Shield className="w-5 h-5" />,
      color: darkMode ? "text-green-400" : "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    { 
      label: "Active Threats", 
      value: safeIssues.filter(i => i.status === 'OPEN').length.toString(), 
      icon: <Activity className="w-5 h-5" />,
      color: darkMode ? "text-neon" : "text-teal-600",
      bgColor: darkMode ? "bg-neon/10" : "bg-teal-500/10",
      borderColor: darkMode ? "border-neon/20" : "border-teal-500/20"
    },
    { 
      label: "Resolved", 
      value: safeIssues.filter(i => i.status === 'RESOLVED').length.toString(), 
      icon: <CheckCircle className="w-5 h-5" />,
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
  ];

  const fetchIssues = async () => {
    try {
        const res = await fetch('/api/issues');
        if (res.ok) {
            const response = await res.json();
            const issuesData = response.data || response;
            setIssues(Array.isArray(issuesData) ? issuesData : []);
        }
    } catch (error) {
        console.error("Failed to fetch issues", error);
    }
  };

  useEffect(() => {
    fetchIssues();
    const tab = searchParams.get('tab');
    if (tab === 'feed' || tab === 'report') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push("/login");
  };

  const handleCreateIssue = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const issueData = {
          title: formData.get('title'),
          type: formData.get('type'),
          description: formData.get('description') || ''
      };
      
      try {
        const res = await fetch('/api/issues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issueData)
        });

        const data = await res.json();

        if (res.ok) {
            await fetchIssues();
            setActiveTab('feed');
            form.reset();
        } else {
            console.error('API Error:', data.message || 'Failed to create issue');
            alert(data.message || 'Failed to create issue. Please make sure you are logged in.');
        }
      } catch (error) {
        console.error("Failed to create issue:", error);
        alert('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
  };

  const handleResolve = async (id: string) => {
      try {
          const res = await fetch(`/api/issues/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: 'RESOLVED' })
          });
          if (res.ok) fetchIssues();
      } catch (e) {
          console.error(e);
      }
  };

  const handleDelete = async (id: string) => {
      setPendingDeleteId(id);
      setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
      if (!pendingDeleteId) return;
      try {
          const res = await fetch(`/api/issues/${pendingDeleteId}`, { method: 'DELETE' });
          if (res.ok) fetchIssues();
      } catch (e) {
          console.error(e);
      } finally {
          setPendingDeleteId(null);
      }
  };

  // Theme classes
  const bgMain = darkMode ? 'bg-black' : 'bg-gray-100';
  const textMain = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-neutral-500' : 'text-gray-700';
  const cardBg = darkMode ? 'bg-neutral-900/50' : 'bg-white';
  const cardBorder = darkMode ? 'border-white/10' : 'border-gray-300';
  const headerBg = darkMode ? 'bg-black/80' : 'bg-white';
  const neonColor = darkMode ? 'text-neon' : 'text-teal-600';
  const neonBg = darkMode ? 'bg-neon' : 'bg-teal-600';
  const neonBorder = darkMode ? 'border-neon' : 'border-teal-600';
  const neonBgLight = darkMode ? 'bg-neon/10' : 'bg-teal-500/10';
  const neonBorderLight = darkMode ? 'border-neon/30' : 'border-teal-500/30';

  return (
    <div className={`min-h-screen ${bgMain} ${textMain} font-satoshi transition-colors duration-300`}>
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout}
        activeItem="dashboard"
        darkMode={darkMode}
        loggingOut={loggingOut}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Threat Log"
        message="This action cannot be undone. Are you sure you want to permanently remove this threat log from the system?"
        confirmText="Delete"
        cancelText="Cancel"
        darkMode={darkMode}
        type="danger"
      />

      {/* Main Content */}
      <motion.div 
        animate={{ 
          marginLeft: sidebarOpen ? 280 : 72 
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen transition-all hidden lg:block"
      >
        {/* Header */}
        <header className={`sticky top-0 h-20 ${headerBg} ${cardBorder} border-b backdrop-blur-md z-40 px-8 flex items-center justify-between`}>
          
          {/* Left: Page Title */}
          <div>
            <h1 className="text-2xl font-bold font-cabinet">Dashboard</h1>
            <p className={`text-sm ${textMuted}`}>
              Monitor your security posture
            </p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${textMuted} hover:${textMain} transition-all`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className={`p-2.5 rounded-xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${textMuted} transition-all relative`}>
              <Bell className="w-5 h-5" />
              <span className={`absolute top-1.5 right-1.5 w-2 h-2 ${neonBg} rounded-full`} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${cardBg} ${cardBorder} border p-6 rounded-2xl group hover:${stat.borderColor} transition-all cursor-default`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <TrendingUp className={`w-4 h-4 ${textMuted}`} />
                </div>
                <p className={`text-sm font-medium ${textMuted} mb-1`}>{stat.label}</p>
                <p className={`text-3xl font-black font-cabinet ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Tabs */}
          <div className={`${cardBg} ${cardBorder} border rounded-2xl overflow-hidden`}>
            {/* Tab Headers */}
            <div className={`flex border-b ${cardBorder}`}>
              <button 
                onClick={() => setActiveTab('feed')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${activeTab === 'feed' 
                  ? `${neonColor} border-b-2 ${neonBorder} ${neonBgLight}` 
                  : `${textMuted} hover:${textMain}`
                }`}
              >
                <Server className="w-4 h-4" /> Vulnerability Feed
              </button>
              <button 
                onClick={() => setActiveTab('report')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${activeTab === 'report' 
                  ? `${neonColor} border-b-2 ${neonBorder} ${neonBgLight}` 
                  : `${textMuted} hover:${textMain}`
                }`}
              >
                <Plus className="w-4 h-4" /> Report Threat
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'feed' && (
                  <motion.div 
                    key="feed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {/* Header with Filter */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold font-cabinet">Live Threat Feed</h2>
                        <div className={`flex items-center gap-2 text-xs font-mono ${darkMode ? 'text-neon' : 'text-teal-600'}`}>
                          <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-neon' : 'bg-teal-600'} animate-pulse`} />
                          SYSTEM ONLINE
                        </div>
                      </div>
                      
                      {/* Filter Pills */}
                      <div className={`flex items-center gap-1 p-1 rounded-xl ${darkMode ? 'bg-black/50 border border-white/10' : 'bg-white/80 border border-gray-200'}`}>
                        {issueTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                              filterType === type
                                ? `${darkMode ? 'bg-neon/20 text-neon border border-neon/30' : 'bg-teal-500/20 text-teal-700 border border-teal-500/30'}`
                                : `${darkMode ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`
                            }`}
                          >
                            {type === 'ALL' ? 'All' : type}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {filteredIssues.length === 0 ? (
                      <div className={`text-center py-16 ${textMuted}`}>
                        <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="font-mono text-sm">{filterType === 'ALL' ? 'No active threats detected.' : `No ${filterType} threats found.`}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredIssues.map((issue) => (
                          <div 
                            key={issue.id} 
                            className={`${darkMode ? 'bg-black/50 hover:border-neon/30' : 'bg-gray-50 hover:border-teal-500/50'} ${cardBorder} border p-4 rounded-xl flex items-center justify-between group transition-all`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`font-mono text-xs font-bold ${darkMode ? 'text-neutral-400 bg-white/5 border border-white/10' : 'text-gray-600 bg-gray-100 border border-gray-200'} px-3 py-1.5 rounded-lg`}>
                                {issue.type}
                              </div>
                              <div>
                                <p className={`font-medium text-sm ${darkMode ? 'group-hover:text-neon' : 'group-hover:text-teal-600'} transition-colors`}>{issue.title}</p>
                                <p className={`${textMuted} text-xs mt-0.5 font-mono`}>
                                  {new Date(issue.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <StatusBadge status={issue.status} darkMode={darkMode} />
                              
                              <div className="flex items-center gap-1">
                                {issue.status !== 'RESOLVED' && (
                                  <button 
                                    onClick={() => handleResolve(issue.id)}
                                    className={`p-2 hover:bg-green-500/20 ${textMuted} hover:text-green-500 rounded-lg transition-colors`}
                                    title="Mark as Resolved"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDelete(issue.id)}
                                  className={`p-2 hover:bg-red-500/20 ${textMuted} hover:text-red-500 rounded-lg transition-colors`}
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'report' && (
                  <motion.div 
                    key="report"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="max-w-2xl"
                  >
                    <h2 className="text-lg font-bold font-cabinet mb-6">Report New Threat</h2>
                    <form className="space-y-5" onSubmit={handleCreateIssue}>
                      <div className="space-y-2">
                        <label className={`text-xs font-mono ${textMuted} uppercase tracking-wider`}>Target Title</label>
                        <CyberInput name="title" placeholder="e.g. Critical API Endpoint" required darkMode={darkMode} />
                      </div>

                      <div className="space-y-2">
                        <label className={`text-xs font-mono ${textMuted} uppercase tracking-wider`}>Scan Type</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['VAPT', 'REDTEAM', 'CLOUD'].map((t) => (
                            <label key={t} className="cursor-pointer">
                              <input type="radio" name="type" value={t} className="peer sr-only" required />
                              <div className={`text-center py-3 rounded-xl border ${darkMode ? 'border-white/10 bg-black/50 peer-checked:border-neon peer-checked:text-neon peer-checked:bg-neon/5' : 'border-gray-200 bg-gray-50 peer-checked:border-teal-500 peer-checked:text-teal-600 peer-checked:bg-teal-500/5'} ${textMuted} font-mono text-xs transition-all`}>
                                {t}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={`text-xs font-mono ${textMuted} uppercase tracking-wider`}>Description</label>
                        <textarea 
                          name="description"
                          className={`w-full h-32 rounded-xl border ${darkMode ? 'border-white/10 bg-black/50 text-white placeholder:text-neutral-500 focus:border-neon focus:ring-neon/50' : 'border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500/50'} px-4 py-3 text-sm font-mono focus:outline-none focus:ring-1 transition-all resize-none`}
                          placeholder="Enter detailed description..."
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full ${neonBg} ${darkMode ? 'text-black hover:bg-white' : 'text-white hover:bg-teal-700'} font-bold tracking-widest py-4 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all text-sm disabled:opacity-50`}
                      >
                        {loading ? "INITIALIZING..." : "SUBMIT REPORT"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </main>
      </motion.div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className={`sticky top-0 h-16 ${headerBg} ${cardBorder} border-b backdrop-blur-md z-40 px-4 flex items-center justify-between`}>
          <button 
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <span className="font-bold font-cabinet">Dashboard</span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile content */}
        <main className="p-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.slice(0, 4).map((stat, idx) => (
              <div key={idx} className={`${cardBg} ${cardBorder} border p-4 rounded-xl`}>
                <p className={`text-xs ${textMuted}`}>{stat.label}</p>
                <p className={`text-2xl font-bold font-cabinet ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

    </div>
  );
}
