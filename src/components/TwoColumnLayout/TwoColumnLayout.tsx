import React from 'react';

interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode; // Made optional
  headerContent?: React.ReactNode | null;
}

export function TwoColumnLayout({ leftContent, rightContent, headerContent }: TwoColumnLayoutProps) {
  return (
    <div style={{ width: "100%" }}>
      {headerContent}
      <div style={{ display: 'flex', height: '100vh' }}>
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
    </div>
  );
}