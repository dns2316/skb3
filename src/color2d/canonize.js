export default function canonize(url) {
  //TODO custom domain name - непонятный коммент из видоса.
  url = url
              // .replace(/-*/g, '')
              .replace(/\s/, '')
              .replace('%20', '')
              .replace(/www./, '');
  console.log('url: ', url);
  const re = /^(.{5})(\w*=)?(([a-z]*:)?\/*)?(\w*\.\w*\/*)?(@)?(\w*(\.\w*)?)/;
  // const re2 = /^(\w)\1{2}/;
  let color = re.exec(url)[7].toLowerCase();

  // console.log(/^\-/.test(color));
console.log(color);
if (!color || color.length < 3 || color.length > 6 || /[g-z]/.test(color) || true != /[color]/.test(url)) {
  return 'Invalid color';
} else if (color.length < 6) {
    let colored = '';
    while (colored.length < 6) {
      colored += color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    console.log(colored);
    return '#' + colored;
  } else {
    console.log(color);
    return '#' + color;
  }
}
