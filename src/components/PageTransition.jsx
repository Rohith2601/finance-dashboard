import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const childVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Wrap individual items with this for staggered entrance
export const StaggerItem = ({ children, className = '' }) => {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default PageTransition;
