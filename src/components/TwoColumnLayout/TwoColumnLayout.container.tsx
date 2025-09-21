import React from 'react';

interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode; 
  headerContent?: React.ReactNode | null;
  bottomContent?: React.ReactNode | null;
}

export function TwoColumnLayout({ leftContent, rightContent, headerContent, bottomContent }: TwoColumnLayoutProps) {
  return (
    <div style={{ width: "100%" }}>
      {headerContent}
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: 'none', // Prevent stretching
            width: rightContent ? '50%' : 'auto', // Set width explicitly if no rightContent
            padding: '16px',
          }}
        >
          {leftContent}
        </div>
        {rightContent && (
          <div style={{ flex: 2, padding: '16px' }}>
            {rightContent}
          </div>
        )}
      </div>
      {bottomContent}
    </div>
  );
}