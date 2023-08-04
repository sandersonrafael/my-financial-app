import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidEdit, BiSolidTrash } from 'react-icons/bi';

import { deleteExpense, loadExpenses } from '../../../db/dataProcess';
import getPeriodReport from '../../../utils/getPeriodReport';
import formatCurrency from '../../../utils/formatCurrency';

import { NoExpenses, ReportGrid, EmphasisGrid, Select } from './styles';
import DateContext from '../../../contexts/DateContext';

const periodPTBR = { daily: 'diário', monthly: 'mensal', yearly: 'anual' };

export default function Reports() {
  const { setDate, period, setPeriod, mostRecentDate, setMostRecentDate } = useContext(DateContext); // eslint-disable-line
  const [fullReport, setFullReport] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const useLoadExpenses = async () => {
      const { fullReport: newReport } = await loadExpenses();
      setFullReport(getPeriodReport(newReport));
    };
    useLoadExpenses();
  }, []);

  const handleEditClick = (year, month, date) => {
    setDate({ year, month, date });
    navigate('/');
  };

  const handleDeleteClick = async (year, month, date) => {
    if (period === 'daily') {
      const { fullReport } = await deleteExpense({ year, month, date });
      setFullReport(getPeriodReport(fullReport));
    }
    console.log('Fazer o delete para o month ---> envolve a base de dados também');
    console.log('Fazer o delete para o month ---> envolve a base de dados também');
  };

  const writeReports = () => fullReport?.[period]?.map((report, key) => {
    const reportDate = Object.keys(report)[0].split('/');
    const [year, month, date] = period === 'daily'
      ? [Number(reportDate[2]), Number(reportDate[1]) -1, Number(reportDate[0])]
      : ['', '', ''];

    const mapPeriod = Object.keys(report)[0];
    const results = Object.values(report)[0];
    const { entries, exits, total } = results;

    return (
      <ReportGrid key={key}>
        <span>{mapPeriod}</span>
        <span style={{ color: entries > 0 ? 'green' : 'black' }}>{formatCurrency(entries)}</span>
        <span style={{ color: exits > 0 ? 'red' : 'black' }}>{formatCurrency(exits)}</span>
        <span
          style={{ color: total > 0 ? 'green' : total < 0 ? 'red' : 'black' }}
        >
          {formatCurrency(total)}
        </span>
        <span>
          {period === 'daily' && <BiSolidEdit
            color="#ffa743"
            onClick={() => handleEditClick(year, month, date)}
          />}
          <BiSolidTrash
            color="#ff5f5f"
            onClick={() => handleDeleteClick(year, month, date)}
          /></span>
      </ReportGrid>
    );
  });

  return (
    <>
      <h2>Relatório por Período</h2>
      <section>
        <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="yearly">Anual</option>
          <option value="monthly">Mensal</option>
          <option value="daily">Diário</option>
        </Select>

        <Select
          value={mostRecentDate}
          onChange={(e) => setMostRecentDate(e.target.value === 'true')}
        >
          <option value={true}>Mais Recente</option>
          <option value={false}>Mais Antigo</option>
        </Select>
      </section>
      {fullReport?.[period]?.length ? (
        <>
          <EmphasisGrid>
            <h3>Período</h3>
            <h3>Entradas</h3>
            <h3>Saídas</h3>
            <h3>Total</h3>
            <h3>Ações</h3>
          </EmphasisGrid>
          {mostRecentDate ? writeReports()?.reverse() : writeReports()}
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
              <h3>
                <BiSolidTrash color="#ff5f5f" onClick={console.log('Fazer handleDeleteAll')}/>
              </h3>
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
