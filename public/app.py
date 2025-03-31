from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

users = {
    "admin": "admin",
    "user1": "password1"
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    username = data['username']
    password = data['password']

    if username in users and users[username] == password:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


if __name__ == '__main__':
    app.run(debug=True)