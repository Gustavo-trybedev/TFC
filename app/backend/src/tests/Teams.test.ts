import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { teams } from './mocks/teamsMock';

import { App } from '../app';

import TeamModel from '../database/models/Teams';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

let chaiHttpResponse: Response;

describe('Teams test', () => {
    
  afterEach(() => sinon.restore());
    
  it('1 - Should return all teams', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
      chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });

    it('2 - Should return a team by id', async () => {
        sinon.stub(TeamModel, 'findOne').resolves(teams[0] as TeamModel);
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');
        
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(teams[0]);
  });
});