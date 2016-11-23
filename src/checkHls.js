export default function funcTestColor(colorTestIn) {

  const re = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/;
  let answer = Boolean;

  if (re.test(colorTestIn)) {
    const place = re.exec(colorTestIn);
    place[2] = place[2].replace('%', ''); // Убирает знак процента
    place[3] = place[3].replace('%', ''); // -/-
    if(place[1] > 346 || place[2] > 100 || place[3] > 100) { // Если первое число больше 345, и второе, третье больше 100 (%) то возвращает false.
      answer = false;
      return answer;
      console.log('? < 100%: ', answer);
    } else { // Если ошибок нет, то возвращает true.
      answer = true;
      return answer;
    };
    answer = false; // Если регулярка ничего из строки не спарсила, отвечает false.
    return answer;
  };
  console.log('hls test: ', colorTest);
}
