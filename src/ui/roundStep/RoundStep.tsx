import clsx from "clsx";
import styles from '@/ui/roundStep/roundStep.module.css'




interface RoundedStepProps {
      id?: string;
      className?: string;
      style?: React.CSSProperties;
      setRef?: (el: HTMLDivElement | null) => void;
}



const RoundStep: React.FC<RoundedStepProps> = ({
      id,
      style,
      className,
      setRef,
}) => {
  return (
      <div
            id={id}
            ref={setRef}
            style={style}
            className={clsx(styles.container, "glassEffect", className)}
      >
            <div></div>
            <div></div>
      </div>
  );
};


 
export default RoundStep;