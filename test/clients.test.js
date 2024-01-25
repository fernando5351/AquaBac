const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const app = require('../index.js');

chai.use(chaiHttp);

describe('client test', () => {
    it('Deberia obtener un status 200 con mi objeto de respuesta', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});
