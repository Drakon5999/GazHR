from flask import Flask
app = Flask(__name__)


@app.route('/generate')
def genvac():
    return {"description": "soon"}

if __name == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7000)
