const { should, expect } = require('chai')
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');


// assertion style
chai.should();

chai.use(chaiHttp);

describe('Tasks Api', () => {

    // Get all
    describe('GET /api/tasks', () => {
        it('It should Get all task', done => {
            chai
                .request(app)
                .get('/api/tasks')
                .end((err, res) => {
                    // status trả về
                    res.should.have.status(200)
                    // đối tượng trả về
                    res.body.should.be.a('object')
                    // các thuộc tính trả về
                    res.body.should.hasOwnProperty('success')
                    res.body.should.hasOwnProperty('data')

                    // lấy các giá trị từ body
                    const { success, data } = res.body

                    // kiểm tra kiểu dữ liệu trả về
                    expect(success).to.be.a('boolean')
                    success.should.be.a('boolean')
                    expect(data).to.be.a('array')

                    // kiểm tra độ dài của mảng trả về
                    expect(data).to.be.length(3)

                    done()
                })
        })


        it('It should Not Get all task', done => {
            chai
                .request(app)
                .get('/api/task')
                .end((err, res) => {
                    // status trả về
                    res.should.have.status(404)
                    done()
                })
        })
    })


    // Get task by id
    describe('GET /api/tasks/:id', () => {
        it('It should Get a task by id', done => {
            const taskId = 1;
            chai
                .request(app)
                .get(`/api/tasks/${taskId}`)
                .end((err, res) => {

                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    const { success, data } = res.body

                    data.should.have.property('id')
                    data.should.have.property('id').eq(taskId)

                    success.should.be.a('boolean')
                    success.should.eq(true)

                    done()
                })
        })

        it('It should Not Get a task by id', done => {
            const taskId = 12;
            chai
                .request(app)
                .get(`/api/tasks/${taskId}`)
                .end((err, res) => {

                    res.should.have.status(404)
                    res.body.should.be.a('object')
                    const { success, data } = res.body

                    expect(data).to.be.a('null')

                    success.should.be.a('boolean')
                    success.should.eq(false)

                    done()
                })
        })
    })


    describe('POST api/tasks', () => {
        it('It should POST a new task', done => {
            const task = {
                name: 'task 4',
                completed: true
            }
            chai
                .request(app)
                .post('/api/tasks')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    const { success, data } = res.body
                    success.should.be.a('boolean')
                    data.should.be.a('object')
                    data.should.have.property('id')
                    data.should.have.property('name')
                    data.should.have.property('completed')
                    done()
                })
        })
    })
})