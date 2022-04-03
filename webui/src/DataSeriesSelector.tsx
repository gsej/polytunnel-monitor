import { FC } from "react";
import styles from "./DataSeriesSelector.module.css";

interface Props {
  showInside: boolean;
  showOutside: boolean;
  showDifference: boolean;
  onChangeInside: (show: boolean) => void;
  onChangeOutside: (show: boolean) => void;
  onChangeDifference: (show: boolean) => void;
}

export const DataSeriesSelector: FC<Props> = ({ showInside, showOutside, showDifference, onChangeInside, onChangeOutside, onChangeDifference }) => {
  function handleChangeInside(show: boolean) {
    onChangeInside(show);
  }

  function handleChangeOutside(show: boolean) {
    onChangeOutside(show);
  }

  function handleChangeDifference(show: boolean) {
    onChangeDifference(show);
  }

  return (
    <div>
      <div className={styles.checkboxContainer}>
        <label htmlFor="inside">Inside</label>
        <input type="checkbox" id="inside" name="inside" value="inside" checked={showInside} onChange={(event) => handleChangeInside(event.target.checked)} />
        <label htmlFor="outside">Outside</label>
        <input type="checkbox" id="outside" name="outside" value="outside" checked={showOutside} onChange={(event) => handleChangeOutside(event.target.checked)} />
        <label htmlFor="difference">Difference</label>
        <input type="checkbox" id="difference" name="difference" value="difference" checked={showDifference} onChange={(event) => handleChangeDifference(event.target.checked)} />
      </div>
    </div>
  );
};
