from flask import Flask, request
from flask.ext.sqlalchemy import SQLAlchemy

database = 'mysql://root:pass@shopee24-mysql:3306/shopee24_dev'

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = database
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class student(db.Model):
    __tablename__ = 'student'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __init__(self, id, name, age):
        self.id = id
        self.name = name
        self.age = age

    def __repr__(self):
        return '' % (self.id, self.name)

db.create_all()

@app.route('/', methods=['POST'])
def hello():
    if not request.json:
        return "failed!", 400
    params = {
        'id': request.json['id'],
        'name': request.json['name'],
        'age': request.json['age']
    }

    stu = student(int(params['id']), params['name'], params['age'])
    db.session.add(stu)
    db.session.commit()
    return "Hello World!"

@app.route('/', methods=['GET'])
def get_one():
    if not request.args['id']:
        abort(400)
    get_id = request.args['id']
    ids = student.query.all()
    get = student.query.filter_by(id = get_id).first()
    ret = 'id=%d,name=%s,age=%d' % (get.id, get.name, get.age)
    return ret

app.run(host = "0.0.0.0", port = 3000, debug = True)
