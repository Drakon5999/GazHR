from flask import Flask, request, jsonify
from genserv import generate_template
app = Flask(__name__)

@app.route('/generate', methods=['GET', 'POST'])
def genvac():
    json_data = request.json
    txt = json_data["text"]
    return jsonify(generate_template(txt))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7000)
