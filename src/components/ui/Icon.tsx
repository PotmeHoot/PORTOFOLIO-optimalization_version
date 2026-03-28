import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { IconName } from "../../types/content";

interface IconProps extends LucideProps {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = LucideIcons[name] as LucideIcons.LucideIcon;

  if (!LucideIcon || typeof LucideIcon !== 'function') {
    return null;
  }

  return <LucideIcon {...props} />;
};
