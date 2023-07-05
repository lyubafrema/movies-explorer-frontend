import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className="checkbox">
      <input type="checkbox" />
      <span className="checkbox__switch"></span>
    </label>
  )
}