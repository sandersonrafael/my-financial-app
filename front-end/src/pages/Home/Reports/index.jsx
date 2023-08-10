import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidCheckShield, BiSolidEdit, BiSolidTrash } from 'react-icons/bi';

import { deleteExpense, loadExpenses } from '../../../db/dataProcess';
import getPeriodReport from '../../../utils/getPeriodReport';
import formatCurrency from '../../../utils/formatCurrency';

import { NoExpenses, ReportGrid, EmphasisGrid, Select } from './styles';
import DateContext from '../../../contexts/DateContext';
import Loading from '../../../components/Loading';
import { primaryColor } from '../../../colors/colors';

const periodPTBR = { daily: 'diário', monthly: 'mensal', yearly: 'anual' };

export default function Reports() {
  const { setDate, period, setPeriod, mostRecentDate, setMostRecentDate } = useContext(DateContext); // eslint-disable-line
  const [fullReport, setFullReport] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState({ active: false, index: null });
  const [interval, setInterval] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const useLoadExpenses = async () => {
      setLoading(true);
      const { fullReport: newReport } = await loadExpenses();
      setFullReport(getPeriodReport(newReport));
      setLoading(false);
    };
    useLoadExpenses();
  }, []);

  const handleEditClick = (year, month, date) => {
    setDate({ year, month, date });
    navigate('/');
  };

  const handleDeleteClick = (key) => {
    clearInterval(interval);
    setDeleting({ active: true, index: key });
    setInterval(setTimeout(() => setDeleting({ active: false, index: null }), 1200));
  };

  const handleDeleteConfirm = async (year, month, date) => {
    clearInterval(interval);
    const deleteMonth = period === 'monthly' ? true : false;
    const deleteYear = period === 'yearly' ? true : false;

    setLoading(true);

    const { fullReport } =
      await deleteExpense({ year, month, date }, null, deleteMonth, deleteYear);
    setFullReport(getPeriodReport(fullReport));

    setDeleting({ active: false, index: null });
    setLoading(false);
  };

  const writeReports = () =>
    fullReport?.[period]?.map((report, key) => {
      const reportDate = Object.keys(report)[0].split('/');
      const [year, month, date] =
        period === 'daily'
          ? [
            Number(reportDate[2]),
            Number(reportDate[1]) - 1,
            Number(reportDate[0]),
          ]
          : period === 'monthly'
            ? [Number(reportDate[1]), Number(reportDate[0]) - 1, 1]
            : [Number(reportDate[0]), 0, 1];

      const mapPeriod = Object.keys(report)[0];
      const results = Object.values(report)[0];
      const { entries, exits, total } = results;

      return (
        <ReportGrid key={key}>
          <span>{mapPeriod}</span>
          <span style={{ color: entries > 0 ? 'green' : 'black' }}>
            <span style={{ color: 'black' }} >Entradas</span>{formatCurrency(entries)}
          </span>
          <span style={{ color: exits > 0 ? 'red' : 'black' }}>
            <span style={{ color: 'black' }} >Saídas</span>{formatCurrency(exits)}
          </span>
          <span
            style={{ color: total > 0 ? 'green' : total < 0 ? 'red' : 'black' }}
          >
            <span style={{ color: 'black' }} >Total</span>{formatCurrency(total)}
          </span>
          <span>
            {loading && deleting.index === key ? <Loading $sz={24} $cl="#ff5f5f" /> :
              <>
                {period === 'daily' &&
              <BiSolidEdit
                color="#ffa743"
                onClick={() => handleEditClick(year, month, date)}
              />}
                {deleting.active && deleting.index === key ?
                  <BiSolidCheckShield
                    color="#ff5f5f"
                    onClick={() => handleDeleteConfirm(year, month, date)}
                  />
                  :
                  <BiSolidTrash
                    color="#ff5f5f"
                    onClick={() => handleDeleteClick(key)}
                  />}
              </>}
          </span>
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
          {fullReport?.[period + 'Totals']?.map((result, key) => {
            const { period, entries, exits, total } = result;
            return (
              <EmphasisGrid key={key}>
                <h3>{period}</h3>
                <h3 style={{ color: entries > 0 ? 'green' : 'black' }}>
                  {formatCurrency(entries)}
                </h3>
                <h3 style={{ color: exits > 0 ? 'red' : 'black' }}>
                  {formatCurrency(exits)}
                </h3>
                <h3
                  style={{
                    color: total > 0 ? 'green' : total < 0 ? 'red' : 'black',
                  }}
                >
                  {formatCurrency(total)}
                </h3>
              </EmphasisGrid>
            );
          })}
        </>
      ) : loading ? (
        <Loading
          $cl={primaryColor}
          $sz={60}
          style={{ width: 60, height: 60, margin: '0 auto', padding: '20px 0' }}
        />
      ) : (
        <NoExpenses>
          <h3>Nenhum dado para exibir.</h3>
          <h3>
            Adicione receitas ou despesas para atualizar o relatório{' '}
            {periodPTBR[period]}.
          </h3>
        </NoExpenses>
      )}
    </>
  );
}
