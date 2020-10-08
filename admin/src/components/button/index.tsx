import React from 'react';
import { Link } from 'react-router-dom';

interface Button
  extends React.HTMLAttributes<HTMLButtonElement | HTMLInputElement> {
  variant?: 'filled' | 'outlined';
  color?: 'yellow' | 'white' | 'green' | 'grey';
  type?: 'button' | 'submit' | 'reset';
  isExternal?: boolean;
  url?: string;
  onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

const Button: React.FC<Button> = ({
  color,
  children,
  variant,
  className,
  type,
  url,
  isExternal,
  ...otherProps
}) => {
  const btnClassName = ['btn'];
  if (variant === 'outlined') btnClassName.push('btn--outlined');
  if (className) btnClassName.push(className);
  if (color === 'white') btnClassName.push('btn--white');
  if (color === 'green') btnClassName.push('btn--green');
  if (color === 'grey') btnClassName.push('btn--grey');

  if (isExternal) {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        className={btnClassName.join(' ')}
        href={url}
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
          otherProps.onClick && otherProps.onClick(e)
        }
      >
        {children}
      </a>
    );
  }

  if (url && url?.length > 0) {
    return (
      <Link
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
          otherProps.onClick && otherProps.onClick(e)
        }
        className={btnClassName.join(' ')}
        to={url}
      >
        {children}
      </Link>
    );
  }

  if (type === 'submit') {
    return (
      <input type="submit" className={btnClassName.join(' ')} {...otherProps} />
    );
  }

  return (
    <button {...otherProps} type={type} className={btnClassName.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
