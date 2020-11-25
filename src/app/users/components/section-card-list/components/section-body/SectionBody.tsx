import React from 'react';

//Components
import CardItem from './components/card-item';

// Props Types
export interface SectionBodyProps {
  objectList: { name: string; image?: string }[];
}

const SectionBody: React.FC<SectionBodyProps> = (props: SectionBodyProps) => {
  const { objectList } = props;

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.75rem',
        }}
      >
        {objectList.map((item) => (
          <CardItem username={item.name} key={item.name} />
        ))}
      </div>
    </>
  );
};

export default SectionBody;
