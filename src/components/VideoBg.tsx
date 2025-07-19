import { VIDEO_BACKGROUNDS } from "@/const/videoSrc";
import { getTimeOfDay } from "@/utils";
import styles from "@/styles/VideoBg.module.scss";

const VideoBg = () => {
  const timeOfDay = getTimeOfDay();
  const { day, evening, night } = VIDEO_BACKGROUNDS;

  const src =
    timeOfDay === "night" ? night : timeOfDay === "evening" ? evening : day;

  return (
    <div className={styles.videoWrapper}>
      <video
        className={styles.video}
        loop
        autoPlay
        muted
        playsInline
        preload="lazy"
      >
        <source src={src} type="video/mp4" />
        <img src={`/images/${timeOfDay}-bg.webp`} alt="Background image" />
      </video>
    </div>
  );
};

export default VideoBg;
