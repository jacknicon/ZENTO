import React from 'react';
import { Calendar, Search, Award } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'timeline' | 'catalog' | 'dashboard';
  setActiveTab: (tab: 'timeline' | 'catalog' | 'dashboard') => void;
  unsatisfiedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  unsatisfiedCount,
}) => {
  return (
    <nav className="mobile-bottom-nav">
      <button
        onClick={() => setActiveTab('timeline')}
        className={`mobile-nav-item ${activeTab === 'timeline' ? 'active' : ''}`}
      >
        <Calendar size={20} />
        <span>履修計画</span>
      </button>

      <button
        onClick={() => setActiveTab('catalog')}
        className={`mobile-nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
      >
        <Search size={20} />
        <span>科目を探す</span>
      </button>

      <button
        onClick={() => setActiveTab('dashboard')}
        className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        style={{ position: 'relative' }}
      >
        <Award size={20} />
        <span>卒業要件</span>
        {unsatisfiedCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '30%',
              background: '#f43f5e',
              color: '#ffffff',
              borderRadius: '9999px',
              fontSize: '0.6rem',
              fontWeight: 800,
              padding: '1px 5px',
            }}
          >
            {unsatisfiedCount}
          </span>
        )}
      </button>
    </nav>
  );
};
