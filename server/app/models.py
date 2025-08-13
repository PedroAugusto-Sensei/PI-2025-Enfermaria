from app import db

class Enfermeiro(db.Model):
    __tablename__ = 'Enfermeiro'

    id_enfermeiro = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    senha = db.Column(db.String(255), nullable=False)
    nome_enfermeiro = db.Column(db.String(100), nullable=False)

    # Verificando se a tabela foi criada
    print('Tabela Enfermeiro criada')

    def __repr__(self):
        return f'<Enfermeiro {self.nome_enfermeiro}>'
# CREATE TABLE Enfermeiro (
#     id_enfermeiro SERIAL PRIMARY KEY,
#     email VARCHAR(120) NOT NULL UNIQUE,
#     senha VARCHAR(255) NOT NULL,
#     nome_enfermeiro VARCHAR(100) NOT NULL
# );

class Paciente(db.Model):
    __tablename__ = 'Pacientes'

    id_paciente = db.Column(db.Integer, primary_key=True)
    nome_paciente = db.Column(db.String(100), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    sexo = db.Column(db.String(10), nullable=False)
    endereco = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    telefone = db.Column(db.String(20), nullable=False)
    nome_pai = db.Column(db.String(100))
    nome_mae = db.Column(db.String(100))
    fuma = db.Column(db.Boolean, default=False)
    comorbidades = db.Column(db.Text)

    # Verificando se a tabela foi criada
    print('Tabela Pacientes criada')

    def __repr__(self):
        return f'<Paciente {self.nome_paciente}>'
# CREATE TABLE pacientes (
#     id_paciente SERIAL PRIMARY KEY,
#     nome_paciente VARCHAR(100) NOT NULL,
#     data_nascimento DATE NOT NULL,
#     sexo VARCHAR(10) NOT NULL,
#     endereco VARCHAR(255) NOT NULL,
#     email VARCHAR(120) NOT NULL UNIQUE,
#     telefone VARCHAR(20) NOT NULL,
#     nome_pai VARCHAR(100),
#     nome_mae VARCHAR(100),
#     fuma BOOLEAN DEFAULT FALSE,
#     comorbidades TEXT
# );


class Consulta(db.Model):
    __tablename__ = 'Consulta'

    id_consulta = db.Column(db.Integer, primary_key=True)
    id_paciente = db.Column(db.Integer, db.ForeignKey('Pacientes.id_paciente'), nullable=False)
    nome_paciente = db.Column(db.String(100), nullable=False)
    data_consulta = db.Column(db.Date, nullable=False)
    hora_consulta = db.Column(db.Time, nullable=False)
    pressao_arterial = db.Column(db.String(20))
    temperatura = db.Column(db.Float)
    saturacao_oxigenio = db.Column(db.Float)
    frequencia_cardiaca = db.Column(db.Integer)
    frequencia_respiratoria = db.Column(db.Integer)
    relatorio_consulta = db.Column(db.Text)

    # Verificando se a tabela foi criada
    print('Tabela Consulta criada')

    def __repr__(self):
        return f'<Consulta {self.id_consulta} - {self.nome_paciente}>'
# CREATE TABLE Consulta (
#     id_consulta SERIAL PRIMARY KEY,
#     id_paciente INTEGER NOT NULL REFERENCES Pacientes(id_paciente),
#     nome_paciente VARCHAR(100) NOT NULL,
#     data_consulta DATE NOT NULL,
#     hora_consulta TIME NOT NULL,
#     pressao_arterial VARCHAR(20),
#     temperatura FLOAT,
#     saturacao_oxigenio FLOAT,
#     frequencia_cardiaca INTEGER,
#     frequencia_respiratoria INTEGER,
#     relatorio_consulta TEXT
# );

class HistoricoConsultas(db.Model):
    __tablename__ = 'Historico_consultas'

    id_consulta = db.Column(db.Integer, primary_key=True)
    id_paciente = db.Column(db.Integer, db.ForeignKey('Pacientes.id_paciente'), nullable=False)
    data_consulta = db.Column(db.Date, nullable=False)
    nome_paciente = db.Column(db.String(100), nullable=False)

    # Verificando se a tabela foi criada
    print('Tabela Historic criada')

    def __repr__(self):
        return f'<HistoricoConsultas {self.id_consulta} - {self.nome_paciente}>'
# CREATE TABLE Historico_consultas (
#     id_consulta SERIAL PRIMARY KEY,
#     id_paciente INTEGER NOT NULL REFERENCES Pacientes(id_paciente),
#     data_consulta DATE NOT NULL,
#     nome_paciente VARCHAR(100) NOT NULL
# );