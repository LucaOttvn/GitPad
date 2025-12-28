import {AnimatePresence, motion} from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedDiv(props: AnimatedDivProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="animated" // Add this line
        className={props.className ?? ""}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}} // Add this line
        transition={{delay: props.delay ?? 0, duration: 0.3}}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
