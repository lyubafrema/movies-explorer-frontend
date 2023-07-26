export default function durationCalculate(duration) {
  let hours = Math.trunc(duration / 60);
  let mins = duration % 60;
  return hours + 'ч ' + mins + 'мин';
}