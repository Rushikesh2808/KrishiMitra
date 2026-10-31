import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
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
  X
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Farmer Dashboard', icon: LayoutDashboard },
  { to: '/crop-selection', label: 'Crops & Produce', icon: Wheat },
  { to: '/market-comparison', label: 'Mandi Comparison', icon: Store },
  { to: '/price-forecast', label: '10-Day Forecast', icon: TrendingUp },
  { to: '/sell-recommendations', label: 'Sell vs Wait Advisor', icon: Compass, badge: 'Smart' },
  { to: '/net-earnings', label: 'Net Earnings Calc', icon: Calculator },
  { to: '/fpo-marketplace', label: 'FPO & Buyers', icon: Users },
  { to: '/profile', label: 'Farmer Profile', icon: User },
];

// Bottom navigation items for mobile touch bar
const mobileNavItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/market-comparison', label: 'Mandis', icon: Store },
  { to: '/price-forecast', label: 'Forecast', icon: TrendingUp },
  { to: '/net-earnings', label: 'Earnings', icon: Calculator },
  { to: '/fpo-marketplace', label: 'FPO/Buyers', icon: Users },
];

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile drawer on route transition
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-earth-50 text-slate-800">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-agri-800 text-white shadow-md border-b border-agri-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Title */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-agri-100 hover:text-white hover:bg-agri-700 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <NavLink to="/" className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-agri-700 shadow-sm">
                  <Wheat className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-white">KrishiMitra</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-agri-950/70 text-agri-300 px-2 py-0.5 rounded-full border border-agri-600/40">
                      MH Prototype
                    </span>
                  </div>
                  <p className="text-[11px] text-agri-200 hidden sm:block">
                    Net-Earning & Market Decision Advisor
                  </p>
                </div>
              </NavLink>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <NavLink
                to="/profile"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-agri-700/70 hover:bg-agri-700 text-xs text-agri-100 border border-agri-600/40"
              >
                <div className="w-6 h-6 rounded-full bg-agri-600 flex items-center justify-center text-white font-medium text-xs">
                  कृ
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-[11px] font-semibold text-white leading-tight">Farmer Ramesh</div>
                  <div className="text-[10px] text-agri-300">Nashik, Maharashtra</div>
                </div>
              </NavLink>

              <NavLink
                to="/settings"
                className="p-2 rounded-lg text-agri-200 hover:text-white hover:bg-agri-700/60 relative"
                title="Notifications & Settings"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Prototype Transparency Notice Banner */}
        <div className="bg-amber-500/15 border-t border-amber-400/20 px-4 py-1 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-1.5 text-[11px] text-amber-200 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              Seva First Innovation Challenge Demo: Realistic market scenarios & transparent net-earnings modeling active.
            </span>
          </div>
        </div>
      </header>

      {/* Main Body Shell */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 py-6 px-4 shrink-0">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Advisory Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-agri-50 text-agri-800 shadow-sm border border-agri-200 font-semibold'
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

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="p-3.5 rounded-xl bg-earth-100/70 border border-earth-200 text-xs">
              <p className="font-semibold text-agri-900">Net Earning Advisor</p>
              <p className="text-slate-600 text-[11px] mt-1">
                Evaluates transport, storage & holding risk to reveal your true profit across APMC Mandis.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
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

              <div className="p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium ${
                          isActive
                            ? 'bg-agri-50 text-agri-800 font-semibold border border-agri-200'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-agri-700" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Central Dynamic Content Area */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Touch-Friendly Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg safe-bottom">
        <div className="grid grid-cols-5 gap-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors ${
                    isActive
                      ? 'text-agri-700 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
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
