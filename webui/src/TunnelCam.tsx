import { FC, useEffect, useState } from "react";
import { loadTunnelCam } from "./state/api";
import styles from "./TunnelCam.module.css";

export const TunnelCam: FC = () => {
  const [latestImageUrl, setLatestImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const tunnelCamImage = await loadTunnelCam();
      setLatestImageUrl(tunnelCamImage.url);
    };
    fetchImage();
  }, []);

  return (
    <div className={styles["tunnelcam-container"]}>
      <section>
        <h1>Tunnelcam - Latest Hourly Image</h1>
        <div className="camera">
          <img alt="latest view of polytunnel" src={latestImageUrl} title={latestImageUrl} />
        </div>
      </section>
    </div>
  );
};
