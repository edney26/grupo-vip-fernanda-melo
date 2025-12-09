export interface GroupConfig {
  groupName: string;
  description: string;
  inviteLink: string;
  imageUrl?: string;
  buttonLabel?: string;
}

export interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}
