import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className = "", ...props }: ButtonProps) => {
  return <button {...props} className={`${className}`} />;
};

export default Button;
