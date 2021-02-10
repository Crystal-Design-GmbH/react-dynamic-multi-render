import React, { useState } from 'react';

interface Props {}

const GalleryItemPluto = (props: Props) => {
  const [ButtonComponent, setBtn] = useState<(p: any) => JSX.Element>();

  return (
    <div>
      {ButtonComponent && <ButtonComponent />}
      <button
        onClick={async () => {
          const data = await import('../../CheckoutButton');
          setBtn(() => data.default);
        }}
      >
        Render checkout
      </button>
    </div>
  );
};

export default GalleryItemPluto;
