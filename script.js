const form = document.getElementById('calorie-form');
const resultDiv = document.getElementById('result');

const calculateCalories = ({ gender, age, weight, height, activity }) => {
  const ageNum = Number(age);
  const weightNum = Number(weight);
  const heightNum = Number(height);
  const activityNum = Number(activity);

  const base = gender === 'male'
    ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

  return Math.round(base * activityNum);
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    gender: form.gender.value,
    age: form.age.value,
    weight: form.weight.value,
    height: form.height.value,
    activity: form.activity.value,
  };
  const calories = calculateCalories(data);
  resultDiv.textContent = `Estimated daily calories: ${calories}`;
});
