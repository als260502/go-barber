# Recuperação de senha

**RF** -  requisitos funcionais sao as funcionalidades de dentro do topico

- O usuário de poder recuperar sua senha informando seu email;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

**RNF** - requisitos nao funcionais sao funcionalidades nao ligadas diretamente as regras de negocio

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de e-mail deve acontecer em segundo plano (background job)

**RN** -

- o link enviado pr email para resetar a senha deve expirar em 2h
- o usuário precisa confirmar a nova senha ao resetar;



# Atualização do perfil

**RF**
- O usuário deve poder atualizar seu nome, email, e senha;

**RNF**

**RN**

- O usuário nao pode alterar seu email para um email ja utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova;


# Painel do prestador

**RF**
- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sem que que houver um novo agendamento com ele;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou nao lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**
- O usuário deve poder listar todos prestadores cadastrados;
- O usuário deve poder listar os dias de um mes com pelo menos um horário disponível de um prestador;
- O usuário de poder listar horários disponíveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 08:00 ás 18:00 (primeiro horário as 8:00, último as 17:00);
- O usuário não pode agendar um horário ja ocupado;
- O usuário não pode agendar um horário que ja passou;
- O usuário não pode agendar serviços consigo mesmo;
