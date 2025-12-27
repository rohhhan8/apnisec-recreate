"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CyberInput } from "@/components/ui/CyberInput";
import Sidebar from "@/components/ui/Sidebar";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Lock, 
  Save,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon,
  Bell
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  name?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Theme classes (dashboard style)
  const bgMain = darkMode ? 'bg-black' : 'bg-gray-100';
  const textMain = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-neutral-500' : 'text-gray-700';
  const cardBg = darkMode ? 'bg-neutral-900/50' : 'bg-white';
  const cardBorder = darkMode ? 'border-white/10' : 'border-gray-300';
  const headerBg = darkMode ? 'bg-black/80' : 'bg-white';
  const inputBg = darkMode ? 'bg-black/50 border-white/10' : 'bg-gray-50 border-gray-200';
  const neonColor = darkMode ? 'text-neon' : 'text-teal-600';

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/users/profile');
      if (res.ok) {
        const data = await res.json();
        const profileData = data.data || data;
        setProfile(profileData);
        setName(profileData.name || "");
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push("/login");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password && password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (password && password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setSaving(true);

    try {
      const updateData: any = {};
      if (name !== profile?.name) updateData.name = name;
      if (password) updateData.password = password;

      if (Object.keys(updateData).length === 0) {
        setMessage({ type: 'error', text: 'No changes to save' });
        setSaving(false);
        return;
      }

      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setPassword("");
        setConfirmPassword("");
        fetchProfile();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen ${bgMain} ${textMain} font-satoshi transition-colors duration-300`}
    >  
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        onLogout={handleLogout}
        activeItem="profile"
        darkMode={darkMode}
        loggingOut={loggingOut}
      />

      {/* Main Content */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ 
          x: 0,
          opacity: 1,
          marginLeft: sidebarOpen ? 280 : 72 
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen transition-all hidden lg:block"
      >
        {/* Header */}
        <header className={`sticky top-0 h-20 ${headerBg} ${cardBorder} border-b backdrop-blur-md z-40 px-8 flex items-center justify-between`}>
          
          {/* Left: Page Title */}
          <div>
            <h1 className="text-2xl font-bold font-cabinet">Profile</h1>
            <p className={`text-sm ${textMuted}`}>Manage your credentials</p>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${textMuted} transition-all`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className={`p-2.5 rounded-xl ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${textMuted} transition-all relative`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Main Card */}
            <div className={`${cardBg} ${cardBorder} border rounded-2xl p-8`}>
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-neon/10 border-neon/30' : 'bg-teal-500/10 border-teal-500/30'} border flex items-center justify-center`}>
                  <User className={`w-7 h-7 ${neonColor}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-cabinet">Agent Card</h2>
                  <p className={textMuted}>Your identity information</p>
                </div>
              </div>

              {/* Message */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mb-6 p-3 rounded-xl border flex items-center gap-3 text-sm ${
                      message.type === 'success' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bento Grid - Info Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* Email */}
                <div className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} ${cardBorder} border rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className={`w-4 h-4 ${textMuted}`} />
                    <span className={`text-xs ${textMuted}`}>Email</span>
                  </div>
                  <p className="font-medium text-sm truncate">{profile?.email}</p>
                </div>

                {/* Role */}
                <div className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} ${cardBorder} border rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className={`w-4 h-4 ${textMuted}`} />
                    <span className={`text-xs ${textMuted}`}>Role</span>
                  </div>
                  <p className={`font-bold text-sm ${neonColor}`}>{profile?.role}</p>
                </div>

                {/* Joined */}
                <div className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} ${cardBorder} border rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className={`w-4 h-4 ${textMuted}`} />
                    <span className={`text-xs ${textMuted}`}>Joined</span>
                  </div>
                  <p className="font-medium text-sm">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                {/* Display Name */}
                <div className="space-y-2">
                  <label className={`text-xs font-mono ${textMuted} uppercase tracking-wider flex items-center gap-2`}>
                    <User className="w-3 h-3" /> Display Name
                  </label>
                  <CyberInput 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your display name"
                    darkMode={darkMode}
                    className={`${inputBg} h-12 rounded-xl`}
                  />
                </div>

                {/* Password Section */}
                <div className={`${darkMode ? 'bg-black/30' : 'bg-gray-50'} ${cardBorder} border rounded-xl p-5`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className={`w-4 h-4 ${textMuted}`} />
                    <span className={`text-xs font-mono ${textMuted} uppercase tracking-wider`}>Update Password</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CyberInput 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                      darkMode={darkMode}
                      className={`${inputBg} h-12 rounded-xl`}
                    />
                    <CyberInput 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      darkMode={darkMode}
                      className={`${inputBg} h-12 rounded-xl`}
                    />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={saving}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center justify-center gap-2 ${darkMode ? 'bg-neon text-black hover:bg-white' : 'bg-teal-600 text-white hover:bg-teal-700'} font-bold py-3.5 rounded-xl transition-all disabled:opacity-50`}
                >
                  {saving ? (
                    <span className="animate-pulse">SAVING...</span>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      SAVE CHANGES
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </main>
      </motion.div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <header className={`sticky top-0 h-16 ${headerBg} ${cardBorder} border-b backdrop-blur-md z-40 px-4 flex items-center justify-center`}>
          <span className="font-bold font-cabinet">Profile</span>
        </header>
        <main className="p-4">
          <p className={textMuted}>Open on desktop for full experience</p>
        </main>
      </div>
    </motion.div>
  );
}
