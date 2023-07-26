import './FilterCheckbox.css';

export default function FilterCheckbox({ isChecked, handleShortCheck }) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        onChange={handleShortCheck}
        checked={isChecked || ""}
      />
      <span className="checkbox__switch"></span>
    </label>
  )
}