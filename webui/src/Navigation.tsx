import styles from "./Navigation.module.css";

export const Navigation  = () => {

  return (
    <nav>
        <a href="/temperatures">temperatures</a>
        <a href="/tunnelcam">tunnelcam</a>
        <a href="/pi">pi</a>
        <a href="/nginx_status">nginx</a>
        <div className={styles.github}>
            <a href="https://github.com/gsej/polytunnel-monitor"><img alt="github icon" src="%PUBLIC_URL%/GitHub-Mark-32px.png" /></a>
        </div>
    </nav>
  );
};
