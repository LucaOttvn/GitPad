import {AnimatePresence, motion} from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedDiv(props: AnimatedDivProps) {
  return (
    <AnimatePresence>
      <motion.div className={props.className ?? ''} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: props.delay ?? 0, duration: 0.3}}>
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
