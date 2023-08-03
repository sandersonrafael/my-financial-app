import { useEffect, useState } from 'react';
import { loadExpenses } from '../../../db/dataProcess';
import getPeriodReport from '../../../utils/getPeriodReport';
import formatCurrency from '../../../utils/formatCurrency';

import { NoExpenses, ReportGrid, EmphasisGrid, Select } from './styles';

const periodPTBR = { daily: 'diário', monthly: 'mensal', yearly: 'anual' };

export default function Reports() {
  const [period, setPeriod] = useState('yearly');
  const [fullReport, setFullReport] = useState({});
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
          <span style={{ color: entries > 0 ? 'green' : 'black' }}>{formatCurrency(entries)}</span>
          <span style={{ color: exits > 0 ? 'red' : 'black' }}>{formatCurrency(exits)}</span>
          <span
            style={{ color: total > 0 ? 'green' : total < 0 ? 'red' : 'black' }}
          >
            {formatCurrency(total)}
          </span>
          <span>{'edit delete'}</span>
        </ReportGrid>
      );
    });
  };

  return (
    <>
      <h2>Relatório por Período</h2>
      <section>
        <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="yearly">Anual</option>
          <option value="monthly">Mensal</option>
          <option value="daily">Diário</option>
        </Select>

        <Select value={mostRecent} onChange={(e) => setMostRecent(e.target.value === 'true')}>
          <option value={true}>Mais Recente</option>
          <option value={false}>Mais Antigo</option>
        </Select>
      </section>
      {Object.keys(fullReport)?.length ? (
        <>
          <EmphasisGrid>
            <h3>Período</h3>
            <h3>Entradas</h3>
            <h3>Saídas</h3>
            <h3>Total</h3>
            <h3>Ações</h3>
          </EmphasisGrid>
          {mostRecent ? writeReports()?.reverse() : writeReports()}
          <section></section>
          {fullReport?.[period+'Totals']?.map((result, key) => {
            const { period, entries, exits, total } = result;
            return <EmphasisGrid key={key}>
              <h3>{period}</h3>
              <h3 style={{ color: entries > 0 ? 'green' : 'black' }}>{formatCurrency(entries)}</h3>
              <h3 style={{ color: exits > 0 ? 'red' : 'black' }}>{formatCurrency(exits)}</h3>
              <h3
                style={{ color: total > 0 ? 'green' : total < 0 ? 'red' : 'black' }}
              >
                {formatCurrency(total)}
              </h3>
              <h3></h3>
            </EmphasisGrid>;
          })}
        </>
      ) : (
        <NoExpenses>
          <h3>Nenhum dado para exibir.</h3>
          <h3>Adicione receitas ou despesas para atualizar o relatório {periodPTBR[period]}.</h3>
        </NoExpenses>
      )}
    </>
  );
}
