import React, { useEffect, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'radio' | 'file' | 'text' | 'password';
  bgColor?: 'white' | 'grey';
  fileName?: FileList[0];
  onCancel?(): void;
  indexPengajuanForm?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  placeholder,
  required,
  name,
  bgColor,
  className,
  id,
  fileName,
  onCancel,
  indexPengajuanForm,
  ...otherProps
}) => {
  const inputClassName = ['input__input'];
  const inputTextContainerClassName = ['input__container'];
  const [inputFileClassName, setInputFileClassName] = useState<string[]>([
    'input-file__container',
  ]);

  useEffect(() => {
    if (fileName) {
      setInputFileClassName(['input-file__container']);
    }

    if (indexPengajuanForm) {
      setInputFileClassName(['input-file__container']);
    }
  }, [fileName, indexPengajuanForm]);

  if (bgColor === 'grey') inputClassName.push('input__input--grey');
  if (className && type === 'text') inputTextContainerClassName.push(className);

  if (type === 'radio') {
    return (
      <label className="radio">
        <span className="radio__input">
          <input {...otherProps} value={value} type="radio" name={name} />
          <span className="radio__control"></span>
        </span>
        <span className="radio__label">{label}</span>
      </label>
    );
  }

  if (type === 'file') {
    return (
      <div className={inputFileClassName.join(' ')}>
        <span className={`input-file__filename ${fileName ? 'active' : ''}`}>
          {fileName ? fileName.name : placeholder}
        </span>
        <input
          required={fileName ? false : required}
          onInvalid={() => {
            console.log('terpanggil');

            if (!fileName) {
              setInputFileClassName([...inputFileClassName, 'required']);
            }
          }}
          {...otherProps}
          value={!fileName ? undefined : ''}
          accept="image/*,.pdf"
          id={id}
          type="file"
          name={name}
        />
        {!fileName ? (
          <label className="input-file__btn" htmlFor={id}>
            Upload file
          </label>
        ) : (
          <span
            onClick={() => {
              if (onCancel) onCancel();
            }}
            className="input-file__btn"
          >
            Cancel
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={inputTextContainerClassName.join(' ')}>
      <input
        {...otherProps}
        className={inputClassName.join(' ')}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        name={name}
      />
    </div>
  );
};

export default Input;
