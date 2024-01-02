from flask import Flask, url_for, render_template, request, send_from_directory

app = Flask(__name__, static_folder="", template_folder="")

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template(url_for("static", filename="pages/index.html"))

@app.route("/maze", methods=['GET', 'POST'])
def maze():
    return render_template(url_for("static", filename="pages/Maze.html"))

@app.route("/plane", methods=['GET', 'POST'])
def plane():
    return render_template(url_for("static", filename="pages/Planes.html"))

#app.add_url_rule("/":path, None, main:function)
"""
>>> @app.route('/user/<username>')
... def profile(username): pass
"""



app.run(debug=False, port=5000)