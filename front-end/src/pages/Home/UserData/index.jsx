import { useState } from 'react';
import { Form } from './styles';
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons';
import Error from '../../../components/Error';
import { attUserData } from '../../../db/dataProcess';

const getName = () => {
  const userAccess = localStorage.getItem('userAccess')?.split(' ');
  if (userAccess) {
    userAccess.splice(0, 2);
    return userAccess.join(' ');
  }
  return '';
};

export default function UserData() {
  const [editingUserData, setEditingUserData] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(getName());
  const [email, setEmail] = useState('sandersonrafael-35@hotmail.com');
  console.log(
    'Fazer o context para obter o nome de usuário, id e e-mail\n' +
    'Tirar os completes manuais do componente UserData',
  );
  const [password, setPassword] = useState('/* NovaSenha123* */');
  const [newPassword, setNewPassword] = useState('/* NovaSenha123* */');
  const [repeatNewPassword, setRepeatNewPassword] = useState('/* NovaSenha123* */');
  const [alerts, setAlerts] = useState({});
  console.log('----------->', alerts);

  const handlePrimaryButton = async () => {
    if (!editingUserData && !editingPassword) setEditingUserData(true);
    if (editingUserData || editingPassword) {
      console.log('Mandar tudo no new Alerts, mas fazer' +
      'um setAlerts dependendo do editingUserData ou editinPassword');
      const newAlerts = await attUserData(name, email, password, newPassword, repeatNewPassword);

      if (newAlerts) {
        const { nameMsgs, emailMsgs, passwordMsgs, repeatPasswordMsgs } = newAlerts;
        setAlerts(
          editingUserData ? { nameMsgs, emailMsgs } : { passwordMsgs, repeatPasswordMsgs },
        );
      }
      console.log('Continuar aqui e atualizar todos estados para os novos e senhas vazias...');

      if (!alerts) {
        setEditingUserData(false);
        setEditingPassword(false);
      }
    }

    attUserData(name, email, password, newPassword, repeatNewPassword);
  };

  const handleSecondaryButton = () => {
    if (editingUserData || editingPassword) {
      setEditingUserData(false);
      setEditingPassword(false);
    }
    if (!editingUserData && !editingPassword) setEditingPassword(true);
    setAlerts({});

    console.log('Fazer secondary button retornar as infos aos estados iniciais, carregados');
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
              placeholder="Nome Completo"
            />
            <Error>{alerts?.nameMsgs}</Error>
          </>}
          {editingPassword || <>
            <input
              disabled={!editingUserData}
              type="text"
              value=""
              placeholder="E-mail de Usuário"
            />
          </>}
          <input
            disabled={!editingUserData && !editingPassword}
            type="password"
            placeholder={
              editingUserData ? 'Digite sua senha para confirmar' :
                editingPassword ? 'Digite sua Senha Atual' : '••••••••••'
            }
          />
          {editingPassword && <>
            <input type="password" placeholder="Digite sua Nova Senha" />
            <input type="password" placeholder="Confirme sua Nova Senha" />
          </>}
          <div>
            <PrimaryButton onClick={handlePrimaryButton}>
              {editingUserData || editingPassword ? 'Salvar' : 'Editar Dados'}
            </PrimaryButton>
            <SecondaryButton onClick={handleSecondaryButton}>
              {editingUserData || editingPassword ? 'Cancelar' : 'Mudar Senha'}
            </SecondaryButton>
          </div>
        </Form>
      </div>
    </>
  );
}
