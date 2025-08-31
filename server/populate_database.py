import sys
import os
from datetime import datetime, date, time

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import Enfermeiro, Paciente, Consulta, HistoricoConsultas
from werkzeug.security import generate_password_hash

app = create_app()
app.app_context().push()

def popular_enfermeiros():
    print("Populando tabela Enfermeiro...")
    enfermeiros = [
        {
            'email': 'maria.silva@hospital.com',
            'senha': generate_password_hash('senha123'),
            'nome_enfermeiro': 'Maria da Silva'
        },
        {
            'email': 'joao.santos@hospital.com',
            'senha': generate_password_hash('senha456'),
            'nome_enfermeiro': 'João Santos'
        }
    ]
    for enfermeiro_data in enfermeiros:
        enfermeiro = Enfermeiro(**enfermeiro_data)
        db.session.add(enfermeiro)
    db.session.commit()
    print("Enfermeiros adicionados com sucesso!")

def popular_pacientes():
    print("Populando tabela Pacientes...")
    pacientes = [
        {
            'nome_paciente': 'Ana Oliveira',
            'data_nascimento': date(1985, 3, 15),
            'sexo': 'Feminino',
            'endereco': 'Rua das Flores, 123, Centro, Curitibanos-SC',
            'email': 'ana.oliveira@email.com',
            'telefone': '(49) 99999-1234',
            'nome_responsavel1': 'Carlos Oliveira',
            'nome_responsavel2': 'Rita Oliveira',
            'fuma': False,
            'comorbidades': 'Hipertensão arterial, Diabetes tipo 2'
        },
        {
            'nome_paciente': 'Pedro Costa',
            'data_nascimento': date(1978, 11, 22),
            'sexo': 'Masculino',
            'endereco': 'Av. Brasil, 456, Bairro Alto, Curitibanos-SC',
            'email': 'pedro.costa@email.com',
            'telefone': '(49) 98888-5678',
            'nome_responsavel1': 'José Costa',
            'nome_responsavel2': 'Carmen Costa',
            'fuma': True,
            'comorbidades': 'Asma brônquica'
        }
    ]
    for paciente_data in pacientes:
        paciente = Paciente(**paciente_data)
        db.session.add(paciente)
    db.session.commit()
    print("Pacientes adicionados com sucesso!")

def popular_consultas():
    print("Populando tabela Consulta...")
    paciente1 = Paciente.query.filter_by(email='ana.oliveira@email.com').first()
    paciente2 = Paciente.query.filter_by(email='pedro.costa@email.com').first()
    consultas = [
        {
            'id_paciente': paciente1.id_paciente,
            'nome_paciente': paciente1.nome_paciente,
            'data_consulta': date(2024, 8, 15),
            'hora_consulta': time(14, 30),
            'pressao_arterial': '140/90',
            'temperatura': 36.8,
            'saturacao_oxigenio': 98.5,
            'frequencia_cardiaca': 78,
            'frequencia_respiratoria': 18,
            'relatorio_consulta': 'Paciente apresenta quadro estável de hipertensão. Orientações sobre dieta e medicação reforçadas.'
        },
        {
            'id_paciente': paciente2.id_paciente,
            'nome_paciente': paciente2.nome_paciente,
            'data_consulta': date(2024, 8, 16),
            'hora_consulta': time(9, 15),
            'pressao_arterial': '120/80',
            'temperatura': 37.2,
            'saturacao_oxigenio': 96.0,
            'frequencia_cardiaca': 85,
            'frequencia_respiratoria': 22,
            'relatorio_consulta': 'Paciente com sintomas de crise asmática leve. Prescrito broncodilatador e orientações sobre cessação do tabagismo.'
        }
    ]
    for consulta_data in consultas:
        consulta = Consulta(**consulta_data)
        db.session.add(consulta)
    db.session.commit()
    print("Consultas adicionadas com sucesso!")

def popular_historico_consultas():
    print("Populando tabela Historico_consultas...")
    paciente1 = Paciente.query.filter_by(email='ana.oliveira@email.com').first()
    paciente2 = Paciente.query.filter_by(email='pedro.costa@email.com').first()
    consulta1 = Consulta.query.filter_by(id_paciente=paciente1.id_paciente).first()
    consulta2 = Consulta.query.filter_by(id_paciente=paciente2.id_paciente).first()
    historicos = [
        {
            'id_consulta': consulta1.id_consulta,
            'id_paciente': paciente1.id_paciente,
            'data_consulta': consulta1.data_consulta,
            'nome_paciente': paciente1.nome_paciente
        },
        {
            'id_consulta': consulta2.id_consulta,
            'id_paciente': paciente2.id_paciente,
            'data_consulta': consulta2.data_consulta,
            'nome_paciente': paciente2.nome_paciente
        }
    ]
    for historico_data in historicos:
        historico = HistoricoConsultas(**historico_data)
        db.session.add(historico)
    db.session.commit()
    print("Histórico de consultas adicionado com sucesso!")

def popular_todas_tabelas():
    try:
        popular_enfermeiros()
        popular_pacientes()
        popular_consultas()
        popular_historico_consultas()
    except Exception as e:
        print(f"Erro ao popular tabelas: {e}")
        db.session.rollback()

def limpar_tabelas():
    try:
        db.session.query(HistoricoConsultas).delete()
        db.session.query(Consulta).delete()
        db.session.query(Paciente).delete()
        db.session.query(Enfermeiro).delete()
        db.session.commit()
        print("Todas as tabelas foram limpas!")
    except Exception as e:
        print(f"Erro ao limpar tabelas: {e}")
        db.session.rollback()

if __name__ == "__main__":
    print("🏥 Script de População do Banco de Dados")
    print("=" * 50)
    # limpar_tabelas()  # Descomente se quiser
    popular_todas_tabelas()