import React from 'react';
import Button from '../button';

interface DialogProps extends React.Attributes {
  onDelete?(): void;
  onCancel?(): void;
}

const Dialog: React.FC<DialogProps> = ({
  children = 'Apakah anda yakin ingin menghapus berita ini? Data yang telah dihapus tidak dapat dikembalikan lagi.',
  onCancel,
  onDelete,
}) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="dialog">
        <h3 className="heading-tertiary mb-1">Peringatan</h3>
        <p className="paragraph">{children}</p>
        <div className="dialog__buttons">
          <Button onClick={onDelete} color="grey">
            Hapus
          </Button>
          <Button onClick={onCancel}>Batal</Button>
        </div>
      </div>
    </>
  );
};

export default Dialog;
