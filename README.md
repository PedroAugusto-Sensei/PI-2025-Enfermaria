# Guia do Projeto

### Tecnologias utilizadas
- React(Javascript)
- Flask(Python)
- PostgreSQL(SQL)

#### Dependências do projeto
- Ter python3 instalado
- Ter PostgreSQL instalado
- Ter Node.js instalado

### Instalação/Clonagem do projeto
```
git clone https://github.com/PedroAugusto-Sensei/PI-2025-Enfermaria.git
cd PI-2025-Enfermaria
cd client
npm install
cd ..
cd server
pip install Flask
pip install -U flask-cors
pip install flask-sqlalchemy
pip install dotenv
pip install psycopg2
```
### Rodar o projeto
Serão necessários três terminais, um para rodar o FrontEnd, outro para o BackEnd e outro para popular a DataBase.

### -------------------------------------------------OBS-------------------------------------------------
#### Antes de rodar o main.py, você deve certificar-se de que:
1. Tem um Banco de Dados PostgreSQL criado na sua máquina (PC). Em um terminal PSQL Shell, execute:
```
   CREATE DATABASE enfermaria_db;
```

2. Possui um arquivo .env (no mesmo diretório do main.py) com o seguinte conteúdo:
```
   DATABASE_URL=postgresql://usuario:senha@localhost:porta/nome_do_banco
```
   ---- Voce deve alterar: "usuario, senha, porta, nomedobanco" pelos dados reais do seu banco de dados. Ex.:
```
   DATABASE_URL=postgresql://postgres:oi123@localhost:5432/enfermaria_db
```
### -------------------------------------------------OBS-------------------------------------------------

1. No primeiro terminal (para rodar o FrontEnd) execute:
```
   cd client (caso ainda não esteja na pasta)
   npm run dev
```
2. No segundo terminal (para rodar o BackEnd) execute:
```
   cd server (caso ainda não esteja na pasta)
   py main.py
```
3. No terceiro terminal (para rodar o script que popula as tabelas) execute:
```
   cd sever (caso ainda não esteja na pasta)
   py populate_database.py
```
