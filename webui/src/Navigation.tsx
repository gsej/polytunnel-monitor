import { Link} from "react-router-dom";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  return (
      <nav>
        <Link to="/temperatures">temperatures</Link>
        <Link to="/tunnelcam">tunnelcam</Link>
        <Link to="/pi">pi</Link>
        <Link to="/swagger">swagger</Link>
        <div className={styles.github}>
          <a href="https://github.com/gsej/polytunnel-monitor">
            <img alt="github icon" src="GitHub-Mark-32px.png" />
          </a>
        </div>
      </nav>
  );
};
