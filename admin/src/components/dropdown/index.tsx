import React, { useRef, useState } from 'react';
import { IconDropdownArrow } from '../../assets';
import useOutside from '../../hooks/use-outside';

interface DropdownProps extends React.HTMLProps<HTMLDivElement> {
  options?: string[];
  onChangeOptions?(value: string): void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChangeOptions,
  placeholder,
  style,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hidden, setHidden] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownClassName = ['dropdown'];
  if (className) dropdownClassName.push(className);

  useOutside(dropdownRef, () => {
    setHidden(true);
  });

  const handleClick = (val: string, i: number) => {
    if (onChangeOptions) onChangeOptions(val);
    setActiveIndex(i);
    setHidden(true);
  };

  return (
    <div
      style={style}
      ref={dropdownRef}
      className={dropdownClassName.join(' ')}
    >
      <div onClick={() => setHidden(!hidden)} className="dropdown__select">
        <div className={`dropdown__text ${activeIndex > -1 ? 'active' : ''}`}>
          {activeIndex > -1 && options ? options[activeIndex] : placeholder}
        </div>
        <IconDropdownArrow />
      </div>
      {!hidden && (
        <div className="dropdown__options">
          {options &&
            options.map((option, i) => {
              return (
                <div
                  key={`${option}-${i}`}
                  onClick={(e) => handleClick(options[i], i)}
                  className={`dropdown__option ${
                    activeIndex === i ? 'active' : ''
                  }`}
                >
                  {option}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
