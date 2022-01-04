import styles from "./TunnelCam.module.css";

export const TunnelCam = () => {
  return (
      <div className={styles["tunnelcam-container"]}>
      <section>
        <h1>Tunnelcam - Latest Hourly Image</h1>
        <div className="camera">
          <img alt="latest photo of polytunnel" src="{{ latestImageUrl }}" title="{{ latestImageUrl }}" />
        </div>
      </section>
    </div>
  );
};
