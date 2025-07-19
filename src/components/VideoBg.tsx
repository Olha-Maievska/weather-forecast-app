import { VIDEO_BACKGROUNDS } from "@/const/videoSrc";
import { getTimeOfDay } from "@/utils";
import styles from "@/styles/VideoBg.module.scss";

const VideoBg = () => {
  const timeOfDay = getTimeOfDay();
  const { day, evening, night } = VIDEO_BACKGROUNDS;

  const src =
    timeOfDay === "day" ? day : timeOfDay === "evening" ? evening : night;

  return (
    <div className={styles.videoWrapper}>
      <video
        className={styles.video}
        src={src}
        loop
        autoPlay
        muted
        playsInline
        preload="lazy"
        poster={`/images/${timeOfDay}-bg.webp`}
      />
    </div>
  );
};

export default VideoBg;
