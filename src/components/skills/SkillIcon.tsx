import { icons, LucideProps } from "lucide-react";

interface Props extends LucideProps {
  name: string;
}

const SkillIcon = ({ name, ...props }: Props) => {
  const Icon = (icons as Record<string, React.FC<LucideProps>>)[name];
  if (!Icon) {
    const Fallback = icons["Puzzle"];
    return <Fallback {...props} />;
  }
  return <Icon {...props} />;
};

export default SkillIcon;
