export default function funcTestColor(colorTestIn) {
  let colorTest = colorTestIn.replace(/[^-\d\,]/g, ''); // ищет регуляркой все кроме 0-9 и запятых, и удаляет (заменяет на '').
  colorTest = colorTest.split(',') // Делит строку на массив, разделителем "запятая".
  console.log('rgb test: ', colorTest);
  const place = {};
  let answer = Boolean;
  if (colorTest.length < 4) {
    for (let i = 0; i < colorTest.length; i++) { // Перебирает числа в rgb итератором и смотрит, что бы они были меньше 255!
      if (colorTest[i] < 256) {
        answer = true; // Если хоть одно число будет > 255, то функция ответит false.
        console.log('? < 255: ', answer);
      } else {
        answer = false;
        return answer;
      }
    };
  } else {
    answer = false;
    return answer;
  }
  return answer;
}
