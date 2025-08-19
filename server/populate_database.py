import sys
import os
from datetime import datetime, date, time

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import create_app, db
from app.models import Enfermeiro, Paciente, Consulta, HistoricoConsultas
from werkzeug.security import generate_password_hash

def popular_enfermeiros():
    """Popula a tabela Enfermeiro com dados fictícios"""
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
    """Popula a tabela Pacientes com dados fictícios"""
    print("Populando tabela Pacientes...")
    
    pacientes = [
        {
            'nome_paciente': 'Ana Oliveira',
            'data_nascimento': date(1985, 3, 15),
            'sexo': 'Feminino',
            'endereco': 'Rua das Flores, 123, Centro, Curitibanos-SC',
            'email': 'ana.oliveira@email.com',
            'telefone': '(49) 99999-1234',
            'nome_pai': 'Carlos Oliveira',
            'nome_mae': 'Rita Oliveira',
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
            'nome_pai': 'José Costa',
            'nome_mae': 'Carmen Costa',
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
    """Popula a tabela Consulta com dados fictícios"""
    print("Populando tabela Consulta...")
    
    # Primeiro, vamos buscar os IDs dos pacientes criados
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
    """Popula a tabela Historico_consultas com dados fictícios"""
    print("Populando tabela Historico_consultas...")
    
    # Buscar os pacientes e consultas criadas
    paciente1 = Paciente.query.filter_by(email='ana.oliveira@email.com').first()
    paciente2 = Paciente.query.filter_by(email='pedro.costa@email.com').first()
    
    historicos = [
        {
            'id_paciente': paciente1.id_paciente,
            'data_consulta': date(2024, 8, 15),
            'nome_paciente': paciente1.nome_paciente
        },
        {
            'id_paciente': paciente2.id_paciente,
            'data_consulta': date(2024, 8, 16),
            'nome_paciente': paciente2.nome_paciente
        }
    ]
    
    for historico_data in historicos:
        historico = HistoricoConsultas(**historico_data)
        db.session.add(historico)
    
    db.session.commit()
    print("Histórico de consultas adicionado com sucesso!")

def popular_todas_tabelas():
    """Função principal para popular todas as tabelas"""
    try:
        # Create Flask app
        app = create_app()
        
        with app.app_context():
            # Criar todas as tabelas se não existirem
            db.create_all()
            
            # Popular as tabelas na ordem correta (respeitando foreign keys)
            popular_enfermeiros()
            popular_pacientes()
            popular_consultas()
            popular_historico_consultas()
            
            print("\n✅ Todas as tabelas foram populadas com sucesso!")
            
            # Verificar se os dados foram inseridos corretamente
            print("\n📊 Resumo dos dados inseridos:")
            print(f"- Enfermeiros: {Enfermeiro.query.count()}")
            print(f"- Pacientes: {Paciente.query.count()}")
            print(f"- Consultas: {Consulta.query.count()}")
            print(f"- Histórico: {HistoricoConsultas.query.count()}")
            
    except Exception as e:
        print(f"❌ Erro ao popular as tabelas: {e}")
        db.session.rollback()

def limpar_tabelas():
    """Função auxiliar para limpar todas as tabelas (usar com cuidado!)"""
    try:
        app = create_app()
        
        with app.app_context():
            db.session.query(HistoricoConsultas).delete()
            db.session.query(Consulta).delete()
            db.session.query(Paciente).delete()
            db.session.query(Enfermeiro).delete()
            db.session.commit()
            print("🧹 Todas as tabelas foram limpas!")
    except Exception as e:
        print(f"❌ Erro ao limpar as tabelas: {e}")
        db.session.rollback()

if __name__ == "__main__":
    print("🏥 Script de População do Banco de Dados")
    print("=" * 50)
    
    # Descomente a linha abaixo se quiser limpar as tabelas antes de popular
    # limpar_tabelas()
    
    popular_todas_tabelas()
