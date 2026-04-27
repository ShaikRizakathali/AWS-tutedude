from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow frontend to talk to backend

@app.route('/api')
def health():
    return jsonify({"status": "Backend is running!", "arch": "ecs-fargate"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
