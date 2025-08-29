from flask import jsonify, request
from app.models import Enfermeiro, Paciente, Consulta, HistoricoConsultas, db
from datetime import datetime
import hashlib
from werkzeug.security import check_password_hash, generate_password_hash
# import pytz # Biblioteca de fusos horários

def init_routes(app):
    
    # ==================== Rotas de Enfermeiro ====================

    @app.route('/api/login', methods=['POST'])
    def login_enfermeiro():
        """Login para o Enfermeiro"""
        try:
            data = request.get_json()
            
            # Buscar o enfermeiro pelo email
            enfermeiro = Enfermeiro.query.filter_by(email=data['email']).first()
            
            if enfermeiro and check_password_hash(enfermeiro.senha, data['senha']):
                return jsonify({
                    'mensagem': 'Login realizado com sucesso',
                    'enfermeiro': {
                        'id_enfermeiro': enfermeiro.id_enfermeiro,
                        'email': enfermeiro.email,
                        'nome_enfermeiro': enfermeiro.nome_enfermeiro
                    }
                }), 200
            else:
                return jsonify({'erro': 'Email ou senha incorretos'}), 401
        except Exception as e:
            return jsonify({'erro': str(e)}), 500


    # ==================== Rotas de Paciente ====================
    
    @app.route('/api/pacientes', methods=['GET'])
    def get_pacientes():
        """Obter todos os pacientes"""
        try:
            pacientes = Paciente.query.all()
            return jsonify([{
                'id_paciente': p.id_paciente,
                'nome_paciente': p.nome_paciente,
                'data_nascimento': p.data_nascimento.strftime('%Y-%m-%d') if p.data_nascimento else None,
                'sexo': p.sexo,
                'endereco': p.endereco,
                'email': p.email,
                'telefone': p.telefone,
                'nome_pai': p.nome_pai,
                'nome_mae': p.nome_mae,
                'fuma': p.fuma,
                'comorbidades': p.comorbidades
            } for p in pacientes]), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500


    @app.route('/api/pacientes/<int:id>', methods=['GET'])
    def get_paciente(id):
        """Obter um paciente específico pelo ID"""
        try:
            paciente = Paciente.query.get_or_404(id)
            return jsonify({
                'id_paciente': paciente.id_paciente,
                'nome_paciente': paciente.nome_paciente,
                'data_nascimento': paciente.data_nascimento.strftime('%Y-%m-%d') if paciente.data_nascimento else None,
                'sexo': paciente.sexo,
                'endereco': paciente.endereco,
                'email': paciente.email,
                'telefone': paciente.telefone,
                'nome_pai': paciente.nome_pai,
                'nome_mae': paciente.nome_mae,
                'fuma': paciente.fuma,
                'comorbidades': paciente.comorbidades
            }), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500


    @app.route('/api/pacientes', methods=['POST'])
    def create_paciente():
        """Criar um novo paciente"""
        try:
            data = request.get_json()
            
            # Convert date string to date object
            data_nascimento = datetime.strptime(data['data_nascimento'], '%Y-%m-%d').date()
            
            novo_paciente = Paciente(
                nome_paciente=data['nome_paciente'],
                data_nascimento=data_nascimento,
                sexo=data['sexo'],
                endereco=data['endereco'],
                email=data['email'],
                telefone=data['telefone'],
                nome_pai=data.get('nome_pai'),
                nome_mae=data.get('nome_mae'),
                fuma=data.get('fuma', False),
                comorbidades=data.get('comorbidades')
            )
            
            db.session.add(novo_paciente)
            db.session.commit()
            
            return jsonify({
                'mensagem': 'Paciente criado com sucesso',
                'id_paciente': novo_paciente.id_paciente
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'erro': str(e)}), 500


    # @app.route('/api/pacientes/<int:id>', methods=['DELETE'])
    # def delete_paciente(id):
    #     """Deletar um paciente"""
    #     try:
    #         paciente = Paciente.query.get_or_404(id)
    #         db.session.delete(paciente)
    #         db.session.commit()
    #         return jsonify({'mensagem': 'Paciente deletado com sucesso'}), 200
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({'erro': str(e)}), 500


    @app.route('/api/pacientes/buscar', methods=['GET'])
    def buscar_pacientes():
        """Buscar pacientes pelo nome"""
        try:
            nome = request.args.get('nome', '')
            pacientes = Paciente.query.filter(
                Paciente.nome_paciente.ilike(f'%{nome}%')
            ).all()
            
            return jsonify([{
                'id_paciente': p.id_paciente,
                'nome_paciente': p.nome_paciente,
                'data_nascimento': p.data_nascimento.strftime('%Y-%m-%d') if p.data_nascimento else None,
                'sexo': p.sexo,
                'email': p.email,
                'telefone': p.telefone
            } for p in pacientes]), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500


    # ==================== Rotas de Consulta ====================

    @app.route('/api/consultas', methods=['POST'])
    def create_consulta():
        """Criar uma nova consulta e salvar no histórico"""
        try:
            data = request.get_json()
            
            # Convert date and time strings to objects
            data_consulta = datetime.strptime(data['data_consulta'], '%Y-%m-%d').date()
            hora_consulta = datetime.strptime(data['hora_consulta'], '%H:%M').time()
            
            nova_consulta = Consulta(
                id_paciente=data['id_paciente'],
                nome_paciente=data['nome_paciente'],
                data_consulta=data_consulta,
                hora_consulta=hora_consulta,
                pressao_arterial=data.get('pressao_arterial'),
                temperatura=data.get('temperatura'),
                saturacao_oxigenio=data.get('saturacao_oxigenio'),
                frequencia_cardiaca=data.get('frequencia_cardiaca'),
                frequencia_respiratoria=data.get('frequencia_respiratoria'),
                relatorio_consulta=data.get('relatorio_consulta')
            )
            
            # Adicionar consulta à sessão
            db.session.add(nova_consulta)
            db.session.commit()
            
            # Após salvar a consulta, criar entrada no histórico
            novo_historico = HistoricoConsultas(
                id_consulta=nova_consulta.id_consulta,
                id_paciente=data['id_paciente'],
                data_consulta=data_consulta,
                nome_paciente=data['nome_paciente']
            )
            
            db.session.add(novo_historico)
            db.session.commit()
            
            return jsonify({
                'mensagem': 'Consulta criada com sucesso e salva no histórico',
                'id_consulta': nova_consulta.id_consulta,
                'id_historico': novo_historico.id_historico
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'erro': str(e)}), 500


    # @app.route('/api/consultas/<int:id>', methods=['DELETE'])
    # def delete_consulta(id):
    #     """Deletar uma consulta"""
    #     try:
    #         consulta = Consulta.query.get_or_404(id)
    #         db.session.delete(consulta)
    #         db.session.commit()
    #         return jsonify({'mensagem': 'Consulta deletada com sucesso'}), 200
    #     except Exception as e:
    #         db.session.rollback()
    #         return jsonify({'erro': str(e)}), 500

    @app.route('/api/consultas/<int:id>', methods=['GET'])
    def get_consulta(id):
        """Obter uma consulta específica pelo ID"""
        try:
            consulta = Consulta.query.get_or_404(id)
            return jsonify({
                'id_consulta': consulta.id_consulta,
                'id_paciente': consulta.id_paciente,
                'nome_paciente': consulta.nome_paciente,
                'data_consulta': consulta.data_consulta.strftime('%Y-%m-%d') if consulta.data_consulta else None,
                'hora_consulta': consulta.hora_consulta.strftime('%H:%M') if consulta.hora_consulta else None,
                'pressao_arterial': consulta.pressao_arterial,
                'temperatura': consulta.temperatura,
                'saturacao_oxigenio': consulta.saturacao_oxigenio,
                'frequencia_cardiaca': consulta.frequencia_cardiaca,
                'frequencia_respiratoria': consulta.frequencia_respiratoria,
                'relatorio_consulta': consulta.relatorio_consulta
            }), 200 
        except Exception as e:
            return jsonify({'erro': str(e)}), 500



    @app.route('/api/historico/paciente/<int:id_paciente>', methods=['GET'])
    def get_historico_paciente(id_paciente):
        """Obter o histórico de consultas para um paciente específico"""
        try:
            historico = HistoricoConsultas.query.filter_by(id_paciente=id_paciente).all()
            return jsonify([{
                'id_historico': h.id_historico,
                'id_consulta': h.id_consulta,
                'data_consulta': h.data_consulta.strftime('%Y-%m-%d') if h.data_consulta else None,
                'nome_paciente': h.nome_paciente
            } for h in historico]), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500

    return app
