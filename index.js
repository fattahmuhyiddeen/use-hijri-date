import { useEffect, useState } from "react";

const months = [
  "Muharram",
  "Safar",
  "Rabiul Awwal",
  "Rabiul Akhir",
  "Jamadil Awwal",
  "Jamadil Akhir",
  "Rejab",
  `Sya'ban`,
  "Ramadhan",
  "Syawal",
  "Dzulkaedah",
  "Dzulhijjah",
];

const f = "en-TN-u-ca-islamic"; // ar-TN-u-ca-islamic'
const get = (i) =>
  new Intl.DateTimeFormat(f, { [i]: "numeric" }).format(Date.now());
export default () => {
  const [fromApi, setFromApi] = useState();
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    fetch(
      "https://www.e-solat.gov.my/index.php?r=esolatApi%2Ftarikhtakwim&period=today&datetype=miladi&date=" +
        formattedDate
    )
      .then((r) => r.json())
      .then((d) => {
        const [year, month, date] = d.takwim[formattedDate].split("-");
        setFromApi({ year, month: months[+month - 1], date });
      });
  }, []);
  if (fromApi) return fromApi;
  const date = get("day");
  const mnth = get("month");
  const month = isNaN(mnth) ? mnth : months[+get("month") - 1];
  const year = get("year").split(" ").shift();
  return { date, month, year };
};
