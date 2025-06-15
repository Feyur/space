const form = document.getElementById('calorie-form');
const resultDiv = document.getElementById('result');
const langSelect = document.getElementById('language');

const translations = {
  en: {
    title: 'Daily Calorie Calculator',
    genderLabel: 'Gender:',
    genderMale: 'Male',
    genderFemale: 'Female',
    ageLabel: 'Age (years):',
    weightLabel: 'Weight (kg):',
    heightLabel: 'Height (cm):',
    activityLabel: 'Activity Level:',
    activitySedentary: 'Sedentary',
    activityLight: 'Lightly active',
    activityModerate: 'Moderately active',
    activityVery: 'Very active',
    activityExtra: 'Extra active',
    calculateButton: 'Calculate',
    resultText: c => `Estimated daily calories: ${c}`,
    languageLabel: 'Language:'
  },
  ru: {
    title: 'Расчет суточной нормы калорий',
    genderLabel: 'Пол:',
    genderMale: 'Мужской',
    genderFemale: 'Женский',
    ageLabel: 'Возраст (лет):',
    weightLabel: 'Вес (кг):',
    heightLabel: 'Рост (см):',
    activityLabel: 'Уровень активности:',
    activitySedentary: 'Сидячий',
    activityLight: 'Небольшая активность',
    activityModerate: 'Средняя активность',
    activityVery: 'Высокая активность',
    activityExtra: 'Экстремальная активность',
    calculateButton: 'Рассчитать',
    resultText: c => `Расчетная суточная норма: ${c}`,
    languageLabel: 'Язык:'
  }
};

const setLanguage = lang => {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.getElementById('title').textContent = t.title;
  document.getElementById('label-gender').textContent = t.genderLabel;
  document.getElementById('option-male').textContent = t.genderMale;
  document.getElementById('option-female').textContent = t.genderFemale;
  document.getElementById('label-age').textContent = t.ageLabel;
  document.getElementById('label-weight').textContent = t.weightLabel;
  document.getElementById('label-height').textContent = t.heightLabel;
  document.getElementById('label-activity').textContent = t.activityLabel;
  document.getElementById('activity-sedentary').textContent = t.activitySedentary;
  document.getElementById('activity-light').textContent = t.activityLight;
  document.getElementById('activity-moderate').textContent = t.activityModerate;
  document.getElementById('activity-very').textContent = t.activityVery;
  document.getElementById('activity-extra').textContent = t.activityExtra;
  document.getElementById('button-calculate').textContent = t.calculateButton;
  document.getElementById('label-language').textContent = t.languageLabel;
  const calories = resultDiv.dataset.calories;
  if (calories) {
    resultDiv.textContent = t.resultText(calories);
  }
};

langSelect.addEventListener('change', () => setLanguage(langSelect.value));

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
  resultDiv.dataset.calories = calories;
  const t = translations[langSelect.value];
  resultDiv.textContent = t.resultText(calories);
});

// set initial language
setLanguage(langSelect.value);
