import React from 'react';
import Button from '../button';

export interface Card extends React.HTMLProps<HTMLDivElement> {
  title?: string;
  description?: string;
  img?: string;
  alt?: string;
  date?: string;
  isLoading?: boolean;
  url?: string;
  onEdit?(): void;
  onDelete?(): void;
}

const Card: React.FC<Card> = ({
  title,
  img,
  alt,
  date,
  isLoading,
  url = '#',
  key,
  onEdit,
  onDelete,
  children,
}) => {
  if (isLoading) {
    return (
      <div key={key} className="card-loading">
        <div className="card-loading__img-container"></div>
        <div className="card-loading__details">
          <div className="card-loading__title"></div>
          <div className="card-loading__date"></div>
          <div className="card-loading__paragraph"></div>
          <div className="card-loading__paragraph"></div>
          <div className="card-loading__paragraph"></div>
        </div>
      </div>
    );
  }

  return (
    <div key={key} className="card">
      <div className="card__img-container">
        <img src={img} alt={alt} className="card__img" />
      </div>
      <div className="card__details">
        <h3 className="heading-tertiary">{title}</h3>
        <h4 className="card__date">{date}</h4>
        <div className="card__buttons">
          <Button onClick={onEdit}>Edit</Button>
          <Button onClick={onDelete} color="grey">
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
