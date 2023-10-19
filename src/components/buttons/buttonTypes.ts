export interface ButtonLinkProps {
  href: string;
  className?: string;
  id?: string;
  text: string;
}

export interface ButtonCommonProps {
  className?: string;
  id?: string;
  text: string;
  onClick: () => void;
}
