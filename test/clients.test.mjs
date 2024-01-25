import * as chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;

import app from '../index.js';

chai.use(chaiHttp);

describe('client test', () => {
    it('Deberia obtener un status 200 con mi objeto de respuesta', (done) => {
        chai.request(app)  // Utiliza chai.request en lugar de request
            .get('/')
            .end((err, res) => {
                // Asserts
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});
