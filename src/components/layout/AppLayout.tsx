import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  TrendingUp,
  Store,
  Calculator,
  Users,
  Compass,
  Bell,
  User,
  Wheat,
  ShieldAlert,
  ChevronRight,
  Menu,
  X,
  MapPin,
  LogOut,
  Building2,
  Layers,
  ShoppingCart,
  Repeat
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../data/mockData';
import { NotificationDrawer } from '../../modules/dashboard/components/NotificationDrawer';

interface NavItem {
  to: string;
  label: string;
  marathiLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const AppLayout: React.FC = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    if (newRole === 'FARMER') navigate('/');
    else if (newRole === 'FPO') navigate('/fpo');
    else if (newRole === 'BUYER') navigate('/buyer');
  };

  // Farmer Navigation
  const farmerNavItems: NavItem[] = [
    { to: '/', label: 'Farmer Dashboard', marathiLabel: 'मुख्य पृष्ठ', icon: LayoutDashboard },
    { to: '/crop-selection', label: 'Crops & Produce', marathiLabel: 'पिके आणि साठा', icon: Wheat },
    { to: '/market-comparison', label: 'Mandi Comparison', marathiLabel: 'बाजारभाव तुलना', icon: Store },
    { to: '/price-forecast', label: '10-Day Forecast', marathiLabel: 'किंमत अंदाज', icon: TrendingUp },
    { to: '/sell-recommendations', label: 'Sell vs Wait Advisor', marathiLabel: 'विक्री सल्ला', icon: Compass, badge: 'Smart' },
    { to: '/net-earnings', label: 'Net Earnings Calc', marathiLabel: 'निव्वळ नफा', icon: Calculator },
    { to: '/fpo-marketplace', label: 'FPO & Buyers', marathiLabel: 'थेट खरेदीदार', icon: Users },
    { to: '/profile', label: 'Farmer Profile', marathiLabel: 'शेतकरी माहिती', icon: User },
  ];

  // FPO Navigation
  const fpoNavItems: NavItem[] = [
    { to: '/fpo', label: 'FPO Hub Dashboard', marathiLabel: 'FPO मुख्य पृष्ठ', icon: Layers },
    { to: '/market-comparison', label: 'APMC Benchmarks', marathiLabel: 'बाजारभाव तुलना', icon: Store },
    { to: '/price-forecast', label: 'Price Forecasting', marathiLabel: 'किंमत अंदाज', icon: TrendingUp },
    { to: '/net-earnings', label: 'Net Earnings Engine', marathiLabel: 'निव्वळ नफा', icon: Calculator },
    { to: '/fpo-marketplace', label: 'Buyer Directory', marathiLabel: 'खरेदीदार नेटवर्क', icon: Building2 },
    { to: '/profile', label: 'FPO Profile', marathiLabel: 'संस्था माहिती', icon: User },
  ];

  // Buyer Navigation
  const buyerNavItems: NavItem[] = [
    { to: '/buyer', label: 'Buyer Dashboard', marathiLabel: 'खरेदीदार मुख्य पृष्ठ', icon: ShoppingCart },
    { to: '/market-comparison', label: 'APMC Spot Rates', marathiLabel: 'बाजारभाव तुलना', icon: Store },
    { to: '/price-forecast', label: '10-Day Market Trends', marathiLabel: 'किंमत अंदाज', icon: TrendingUp },
    { to: '/net-earnings', label: 'Freight & Cost Calc', marathiLabel: 'खर्च गणक', icon: Calculator },
    { to: '/profile', label: 'Company Profile', marathiLabel: 'कंपनी माहिती', icon: User },
  ];

  const activeNavItems =
    currentUser?.role === 'FPO'
      ? fpoNavItems
      : currentUser?.role === 'BUYER'
      ? buyerNavItems
      : farmerNavItems;

  // Mobile Bottom Nav
  const mobileNavItems: NavItem[] =
    currentUser?.role === 'FPO'
      ? [
          { to: '/fpo', label: 'FPO Hub', icon: Layers },
          { to: '/market-comparison', label: 'Mandis', icon: Store },
          { to: '/price-forecast', label: 'Forecast', icon: TrendingUp },
          { to: '/net-earnings', label: 'Earnings', icon: Calculator },
          { to: '/profile', label: 'Profile', icon: User },
        ]
      : currentUser?.role === 'BUYER'
      ? [
          { to: '/buyer', label: 'Buyer Hub', icon: ShoppingCart },
          { to: '/market-comparison', label: 'Mandis', icon: Store },
          { to: '/price-forecast', label: 'Forecast', icon: TrendingUp },
          { to: '/net-earnings', label: 'Costs', icon: Calculator },
          { to: '/profile', label: 'Profile', icon: User },
        ]
      : [
          { to: '/', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/market-comparison', label: 'Mandis', icon: Store },
          { to: '/price-forecast', label: 'Forecast', icon: TrendingUp },
          { to: '/net-earnings', label: 'Earnings', icon: Calculator },
          { to: '/sell-recommendations', label: 'Advisory', icon: Compass },
        ];

  return (
    <div className="min-h-screen flex flex-col bg-earth-50 text-slate-800">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-agri-800 text-white shadow-md border-b border-agri-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile Trigger & Brand */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-agri-100 hover:text-white hover:bg-agri-700/80 focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <NavLink to="/" className="flex items-center space-x-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-agri-700 shadow-sm shrink-0">
                  <Wheat className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-white">KrishiMitra</span>
                    {/* Role Pill */}
                    <span
                      className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        currentUser?.role === 'FPO'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                          : currentUser?.role === 'BUYER'
                          ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                          : 'bg-agri-950 text-amber-300 border-agri-600/50'
                      }`}
                    >
                      {currentUser?.role || 'FARMER'}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-agri-200 hidden sm:block">
                    Market & Net-Earning Advisory Ecosystem
                  </p>
                </div>
              </NavLink>
            </div>

            {/* Right: Evaluator Role Switcher & User Profile & Logout */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Evaluator Quick Role Switcher */}
              <div className="hidden xl:flex items-center space-x-1 bg-agri-950/60 p-1 rounded-xl border border-agri-700/60 text-xs">
                <span className="text-[10px] text-agri-300 uppercase font-bold px-2">Role:</span>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('FARMER')}
                  className={`px-2 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-colors ${
                    currentUser?.role === 'FARMER' ? 'bg-agri-700 text-white shadow-xs' : 'text-agri-200 hover:text-white'
                  }`}
                >
                  Farmer
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('FPO')}
                  className={`px-2 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-colors ${
                    currentUser?.role === 'FPO' ? 'bg-emerald-700 text-white shadow-xs' : 'text-agri-200 hover:text-white'
                  }`}
                >
                  FPO
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('BUYER')}
                  className={`px-2 py-1 rounded-lg font-bold text-[11px] cursor-pointer transition-colors ${
                    currentUser?.role === 'BUYER' ? 'bg-blue-700 text-white shadow-xs' : 'text-agri-200 hover:text-white'
                  }`}
                >
                  Buyer
                </button>
              </div>

              {/* Profile Pill */}
              <NavLink
                to="/profile"
                className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-agri-700/70 hover:bg-agri-700 text-xs text-agri-100 border border-agri-600/40"
              >
                <div className="w-6 h-6 rounded-full bg-agri-600 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/30">
                  {currentUser?.fullName?.substring(0, 2).toUpperCase() || 'KM'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] font-semibold text-white leading-tight">
                    {currentUser?.fullName || 'User'}
                  </div>
                  <div className="text-[10px] text-agri-300">
                    {currentUser?.district || currentUser?.operatingLocation || 'Nashik'}
                  </div>
                </div>
              </NavLink>

              {/* Notifications */}
              <button
                type="button"
                onClick={() => setNotificationDrawerOpen(true)}
                className="p-2 rounded-xl text-agri-200 hover:text-white hover:bg-agri-700/60 relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl text-agri-200 hover:text-rose-200 hover:bg-rose-900/40 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Prototype Transparency Notice Banner */}
        <div className="bg-amber-500/15 border-t border-amber-400/20 px-4 py-1 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-1.5 text-[10px] sm:text-[11px] text-amber-200 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              Seva First Innovation Challenge Prototype: 3-Role Architecture Active • Real-Time Role Switching Enabled
            </span>
          </div>
        </div>
      </header>

      {/* Main Body Shell */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 py-6 px-4 shrink-0">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-3 flex items-center justify-between">
            <span>{currentUser?.role || 'FARMER'} Portal</span>
            <span className="text-[10px] text-agri-700 font-semibold">Active</span>
          </div>

          <nav className="space-y-1">
            {activeNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/' || item.to === '/fpo' || item.to === '/buyer'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-agri-50 text-agri-900 shadow-xs border border-agri-200 font-bold'
                        : 'text-slate-600 hover:bg-earth-100 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-agri-700" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-agri-100 text-agri-800">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
            {/* Quick Role Switcher in Sidebar */}
            <div className="p-3 bg-earth-100/70 rounded-xl border border-earth-200 text-xs space-y-2">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Switch Role / भूमिका बदला:
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('FARMER')}
                  className={`py-1 rounded text-[11px] font-bold cursor-pointer ${
                    currentUser?.role === 'FARMER' ? 'bg-agri-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Farmer
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('FPO')}
                  className={`py-1 rounded text-[11px] font-bold cursor-pointer ${
                    currentUser?.role === 'FPO' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  FPO
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('BUYER')}
                  className={`py-1 rounded text-[11px] font-bold cursor-pointer ${
                    currentUser?.role === 'BUYER' ? 'bg-blue-700 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Buyer
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-50">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-agri-800 text-white">
                <div className="flex items-center space-x-2">
                  <Wheat className="w-5 h-5 text-agri-300" />
                  <span className="font-bold text-base">KrishiMitra Navigation</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-agri-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User info banner inside drawer */}
              <div className="p-3.5 bg-earth-100/60 border-b border-earth-200 text-xs">
                <div className="font-bold text-slate-900">{currentUser?.fullName}</div>
                <div className="text-[11px] text-slate-500">
                  Role: <strong className="text-agri-800">{currentUser?.role}</strong> • {currentUser?.district || currentUser?.operatingLocation}
                </div>
              </div>

              {/* Role Switcher in Mobile Drawer */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Switch Active Role:
                </span>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => handleRoleSwitch('FARMER')}
                    className={`py-1.5 rounded-lg font-bold ${
                      currentUser?.role === 'FARMER' ? 'bg-agri-700 text-white' : 'bg-white text-slate-700 border'
                    }`}
                  >
                    Farmer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSwitch('FPO')}
                    className={`py-1.5 rounded-lg font-bold ${
                      currentUser?.role === 'FPO' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border'
                    }`}
                  >
                    FPO
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSwitch('BUYER')}
                    className={`py-1.5 rounded-lg font-bold ${
                      currentUser?.role === 'BUYER' ? 'bg-blue-700 text-white' : 'bg-white text-slate-700 border'
                    }`}
                  >
                    Buyer
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-1 overflow-y-auto flex-1">
                {activeNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/' || item.to === '/fpo' || item.to === '/buyer'}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium ${
                          isActive
                            ? 'bg-agri-50 text-agri-800 font-bold border border-agri-200'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-agri-700" />
                        <div>
                          <div>{item.label}</div>
                          {item.marathiLabel && (
                            <div className="text-[10px] text-slate-400 font-normal">
                              {item.marathiLabel}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </NavLink>
                  );
                })}
              </div>

              <div className="p-3 border-t border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 flex items-center justify-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Central Dynamic Content Area */}
        <main className="flex-1 w-full min-w-0 p-3 sm:p-5 lg:p-7 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />

      {/* Mobile Touch-Friendly Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-xl safe-bottom">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/' || item.to === '/fpo' || item.to === '/buyer'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                    isActive
                      ? 'text-agri-700 font-bold scale-105'
                      : 'text-slate-500 hover:text-slate-800 font-medium'
                  }`
                }
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
