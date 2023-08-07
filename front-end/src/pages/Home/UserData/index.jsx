import { useState } from 'react';
import { Form } from './styles';
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import Error from '../../../components/Error';
import { attUserData } from '../../../db/dataProcess';
import Success from '../../../components/Success';
import Loading from '../../../components/Loading';
import { primaryColor } from '../../../colors/colors';

const getName = () => localStorage.getItem('userAccess')?.split(' ')?.splice(3)?.join(' ') || '';
const getEmail = () => localStorage.getItem('userAccess')?.split(' ')?.[2] || '';

export default function UserData() {
  const [editingUserData, setEditingUserData] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(getName());
  const [email, setEmail] = useState(getEmail());
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [alerts, setAlerts] = useState({});
  const [loading, setLoading] = useState(false);

  const resetStates = () => {
    setName(getName());
    setEmail(getEmail());
    setPassword('');
    setNewPassword('');
    setRepeatNewPassword('');
  };

  const handlePrimaryButton = async () => {
    setAlerts({});
    if (!editingUserData && !editingPassword) return setEditingUserData(true);

    if (editingUserData || editingPassword) {
      setLoading(true);

      const apiResponse =
        await attUserData(name, email, password, newPassword, repeatNewPassword, editingPassword);

      setLoading(false);
      setAlerts(apiResponse);

      if (apiResponse.success) {
        setEditingUserData(false);
        setEditingPassword(false);
        resetStates();
      }
    }
  };

  const handleSecondaryButton = () => {
    resetStates();
    setAlerts({});

    if (editingUserData || editingPassword) {
      setEditingUserData(false);
      setEditingPassword(false);
    }
    if (!editingUserData && !editingPassword) setEditingPassword(true);
  };

  return (
    <>
      <h2>Dados de Usuário</h2>
      <div>
        <Form>
          <h3>Edite ou atualize os seus dados</h3>
          {editingPassword || <>
            <input
              disabled={!editingUserData}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu Nome Completo"
            />
            <Error>{alerts?.nameMsgs}</Error>
          </>}
          {editingPassword || <>
            <input
              disabled={!editingUserData}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu Novo E-mail"
            />
            <Error>{alerts?.emailMsgs}</Error>
          </>}

          <input
            disabled={!editingUserData && !editingPassword}
            type="password"
            placeholder={
              editingUserData ? 'Digite sua Senha Para Confirmar' :
                editingPassword ? 'Digite sua Senha Atual' : '••••••••••'
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Error>{alerts?.passwordMsgs}</Error>

          {editingPassword && <>
            <input
              type="password"
              placeholder="Digite sua Nova Senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Error>{alerts?.newPasswordMsgs}</Error>

            <input
              type="password"
              placeholder="Confirme sua Nova Senha"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
            <Error>{alerts?.repeatNewPasswordMsgs}</Error>
          </>}
          <Error>{alerts?.message}</Error>
          <Success>{alerts?.success}</Success>
          <div>
            <PrimaryButton onClick={handlePrimaryButton}>
              {editingUserData || editingPassword ? 'Salvar' : 'Editar Dados'}
            </PrimaryButton>
            <SecondaryButton onClick={handleSecondaryButton}>
              {editingUserData || editingPassword ? 'Cancelar' : 'Mudar Senha'}
            </SecondaryButton>
          </div>
          {loading && <Loading $cl={primaryColor} $sz={45} style={{ margin: '22px 0 0' }} />}
        </Form>
      </div>
    </>
  );
}
