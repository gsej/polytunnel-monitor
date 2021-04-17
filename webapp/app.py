from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return "hello world from the pi4"

@app.route('/temp')
def Temperature():
    return "the temperature will be here"





    return "hello world from the pi4"
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
