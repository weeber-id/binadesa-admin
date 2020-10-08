import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  name,
  className,
  cols,
  rows,
  ...otherProps
}) => {
  const textareaClassName = ['textarea'];
  if (className) textareaClassName.push(className);

  return (
    <div className={textareaClassName.join(' ')}>
      {label && <label className="textarea__label">{label}</label>}
      <textarea
        {...otherProps}
        className="textarea__textarea"
        name={name}
        cols={cols}
        rows={rows}
        value={value}
      />
    </div>
  );
};

export default TextArea;
