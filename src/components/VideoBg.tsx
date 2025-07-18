import { useEffect, useState } from "react";
import { VIDEO_BACKGROUNDS } from "@/const/videoSrc";
import { getTimeOfDay } from "@/utils";
import styles from "@/styles/VideoBg.module.scss";

const VideoBg = () => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const timeOfDay = getTimeOfDay();
  const { day, evening, night } = VIDEO_BACKGROUNDS;

  const newSrc =
    timeOfDay === "day" ? day : timeOfDay === "evening" ? evening : night;

  useEffect(() => {
    if (!currentSrc) {
      setCurrentSrc(newSrc);
      return;
    }

    if (currentSrc !== newSrc) {
      setPrevSrc(currentSrc);
      setCurrentSrc(newSrc);
      setIsTransitioning(true);

      const timeout = setTimeout(() => {
        setPrevSrc(null);
        setIsTransitioning(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [newSrc]);

  return (
    <div className={styles.videoWrapper}>
      {prevSrc && (
        <video
          key={prevSrc}
          className={`${styles.video} ${styles.video__fadeOut}`}
          src={prevSrc}
          loop
          autoPlay
          muted
          playsInline
        />
      )}
      {currentSrc && (
        <video
          key={currentSrc}
          className={`${styles.video} ${
            isTransitioning ? styles.video__fadeIn : ""
          }`}
          src={currentSrc}
          loop
          autoPlay
          muted
          playsInline
        />
      )}
    </div>
  );
};

export default VideoBg;
