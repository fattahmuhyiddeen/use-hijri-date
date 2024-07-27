const months = [
  'Muharram',
  'Safar',
  'Rabiul Awwal',
  'Rabiul Akhir',
  'Jamadil Awwal',
  'Jamadil Akhir',
  'Rejab',
  `Sya'ban`,
  'Ramadhan',
  'Syawal',
  'Dzulkaedah',
  'Dzulhijjah',
];

const f = 'en-TN-u-ca-islamic'; // ar-TN-u-ca-islamic'
const get = i =>
  new Intl.DateTimeFormat(f, {[i]: 'numeric'}).format(Date.now());
export default () => {
  const date = get('day');
  const mnth = get('month');
  const month = isNaN(mnth) ? mnth : months[+get('month') - 1];
  const year = get('year').split(' ').shift();
  return {date, month, year};
};
