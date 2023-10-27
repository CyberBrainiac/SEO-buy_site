export interface ButtonLinkProps {
  text: string;
  href: string;
  className?: string;
  id?: string;
}

export interface ButtonCommonProps {
  text: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: object;
  disabled?: boolean;
}
