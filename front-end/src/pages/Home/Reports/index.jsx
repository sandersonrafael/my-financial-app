import { useEffect, useState } from 'react';
import { ReportGrid } from './styles';
import { loadExpenses } from '../../../db/dataProcess';
import getPeriodReport from '../../../utils/getPeriodReport';
import formatCurrency from '../../../utils/formatCurrency';

export default function Reports() {
  const [period, setPeriod] = useState('yearly');
  const [fullReport, setFullReport] = useState([]);
  const [mostRecent, setMostRecent] = useState(true);

  useEffect(() => {
    const useLoadExpenses = async () => {
      const { fullReport: newReport } = await loadExpenses();
      setFullReport(getPeriodReport(newReport));
    };
    useLoadExpenses();
  }, []);

  const writeReports = () => {
    return fullReport?.[period]?.map((report, key) => {
      const period = Object.keys(report)[0];
      const results = Object.values(report)[0];
      const { entries, exits, total } = results;
      return (
        <ReportGrid key={key}>
          <span>{period}</span>
          <span>{formatCurrency(entries)}</span>
          <span>{formatCurrency(exits)}</span>
          <span>{formatCurrency(total)}</span>
          <span>{'edit delete'}</span>
        </ReportGrid>
      );});
  };

  return (
    <>
      <h2>Relatório por Período</h2>
      <section>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="yearly">Anual</option>
          <option value="monthly">Mensal</option>
          <option value="daily">Diário</option>
        </select>

        <select value={mostRecent} onChange={(e) => setMostRecent(e.target.value === 'true')}>
          <option value={true}>Mais Recente</option>
          <option value={false}>Mais Antigo</option>
        </select>
      </section>
      <ReportGrid> {console.log('Fazer um title grid em vez de report grid')}
        <h3>Período</h3>
        <h3>Entradas</h3>
        <h3>Saídas</h3>
        <h3>Total</h3>
        <h3>Ações</h3>
      </ReportGrid>
      {mostRecent ? writeReports()?.reverse() : writeReports()}
      <p>ok</p>
    </>
  );
}
