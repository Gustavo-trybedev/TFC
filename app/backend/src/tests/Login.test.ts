import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import { token, validAdmin, validLogin } from './mocks/loginMock';

import UserModel from '../database/models/Users';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

let chaiHttpResponse: Response;

describe('Login test', () => {
  
  afterEach(() => sinon.restore());


  it('1 - Should return an error when try to login without email', async () => {
    sinon.stub(UserModel, 'findOne').resolves(validAdmin as UserModel);
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ password: validAdmin.password });

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.deep.equal('All fields must be filled');
  });


  it('2 - Should return an error when try to login with invalid email', async () => {
    sinon.stub(UserModel, 'findOne').resolves(validAdmin as UserModel);
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'invalidEmail', password: validAdmin.password });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });

  });

  it('3 - Should return an error when try to login without password', async () => {
    sinon.stub(UserModel, 'findOne').resolves(validAdmin as UserModel);
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: validAdmin.email });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled'});
  });

  it('4 - Should return an error when try to login with invalid password', async () => {
    sinon.stub(UserModel, 'findOne').resolves(validAdmin as UserModel);
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: validAdmin.email, password: 'invalidPassword' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('5 - Should return an error if dont pass the token in the header', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .set('authorization', '');

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Token not found');
  })

  it('6 - Should return status 200 and a token in case of successful login', async () => {
    sinon.stub(UserModel, 'findOne').resolves(validAdmin as UserModel);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send(validLogin);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('7 - Should return the user role', async () => {
    sinon.stub(UserModel, 'findOne').resolves(validAdmin as UserModel);

    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .set('authorization', token);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role');
    expect(chaiHttpResponse.body.role).to.be.deep.equal('admin');
  });

});



