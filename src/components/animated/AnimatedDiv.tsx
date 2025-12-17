import {motion} from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string
  delay?: number;
}

export default function AnimatedDiv(props: AnimatedDivProps) {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: props.delay || 0}} className={props.className || ""}>
      {props.children}
    </motion.div>
  );
}
