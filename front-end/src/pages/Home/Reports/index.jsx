import { useEffect, useState } from 'react';
import { ReportGrid } from './styles';
import { loadExpenses } from '../../../db/dataProcess';

export default function Reports() {
  const [reportType, setReportType] = useState('yearly');
  const [fullReport, setFullReport] = useState({});

  useEffect(() => {
    const useLoadExpenses = async () => {
      const { fullReport: newReport } = await loadExpenses();
      setFullReport(newReport);
    };
    useLoadExpenses();
  }, []);

  return (
    <>
      <h2>Relatório por Período</h2>
      <section>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="yearly">Anual</option>
          <option value="monthly">Mensal</option>
          <option value="daily">Diário</option>
        </select>

        <select>
          <option value="">Mais Recente</option>
          <option value="">Mais Antigo</option>
        </select>
      </section>
      <ReportGrid>
        <h3>Período</h3>
        <h3>Entradas</h3>
        <h3>Saídas</h3>
        <h3>Total</h3>
        <h3>Ações</h3>
        <span>ok</span>
        <span>ok</span>
        <span>ok</span>
        <span>ok</span>
        <span>ok</span>
      </ReportGrid>
      <div>{JSON.stringify(fullReport)}</div>
    </>
  );
}
