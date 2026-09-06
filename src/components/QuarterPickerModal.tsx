import React from 'react';
import { X } from 'lucide-react';
import type { Course, Year, Quarter } from '../types/syllabus';
import { isQuarterAvailable } from '../utils/prerequisiteChecker';

interface QuarterPickerModalProps {
  course: Course | null;
  onClose: () => void;
  onSelectSlot: (year: Year, quarter: Quarter) => void;
}

export const QuarterPickerModal: React.FC<QuarterPickerModalProps> = ({
  course,
  onClose,
  onSelectSlot,
}) => {
  if (!course) return null;

  const years: Year[] = [1, 2, 3, 4];
  const quarters: Quarter[] = ['1Q', '2Q', '3Q', '4Q'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(3px)',
        zIndex: 105,
        display: 'flex',
        alignItems: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: '#ffffff',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '20px',
          boxShadow: '0 -10px 25px rgba(0,0,0,0.15)',
        }}
      >
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#4f46e5', fontWeight: 600 }}>
              配置場所を選択 ({course.開講Q || '通年'})
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{course.科目名}</h4>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: '#f1f5f9', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} color="#64748b" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {years.map((year) => (
            <div key={year} style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                {year}年次
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {quarters.map((quarter) => {
                  const isAvailable = isQuarterAvailable(course.開講Q, quarter);
                  return (
                    <button
                      key={quarter}
                      disabled={!isAvailable}
                      onClick={() => {
                        if (isAvailable) {
                          onSelectSlot(year, quarter);
                          onClose();
                        }
                      }}
                      style={{
                        border: isAvailable ? '1px solid #cbd5e1' : '1px dashed #cbd5e1',
                        background: isAvailable ? '#ffffff' : '#f1f5f9',
                        borderRadius: '6px',
                        padding: '8px 0',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isAvailable ? '#4f46e5' : '#94a3b8',
                        opacity: isAvailable ? 1 : 0.4,
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                      }}
                      title={isAvailable ? `${quarter}に配置` : `${course.開講Q}開講のため選択不可`}
                    >
                      {quarter}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
