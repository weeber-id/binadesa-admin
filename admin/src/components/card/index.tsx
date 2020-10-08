import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';

export interface Card extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  img?: string;
  alt?: string;
  date?: string;
  isLoading?: boolean;
  url?: string;
}

const Card: React.FC<Card> = ({
  description,
  title,
  img,
  alt,
  date,
  isLoading,
  url = '#',
}) => {
  if (isLoading) {
    return (
      <div className="card-loading">
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
    <Link style={{ textDecoration: 'none' }} to={`/berita/${url}`}>
      <div className="card">
        <div className="card__img-container">
          <img src={img} alt={alt} className="card__img" />
        </div>
        <div className="card__details">
          <h3 className="heading-tertiary">{title}</h3>
          <h4 className="card__date">{date}</h4>
          <div className="card__buttons">
            <Button>Edit</Button>
            <Button color="grey">Delete</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
