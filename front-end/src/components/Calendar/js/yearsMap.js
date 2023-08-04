const yearsMap = () => {
  const yearsList = [];
  const actualYear = new Date().getFullYear();
  const maxYear = actualYear + 3;

  for (let year = 2020; year < maxYear; year++) yearsList.push(year);

  return yearsList;
};

export default yearsMap();
