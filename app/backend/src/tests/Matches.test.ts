import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import MatchModel from '../database/models/Matches';

import { allMatches, matches, matchesInProgress } from './mocks/matchesMock';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

let chaiHttpResponse: Response;

describe('Matches test', () => {
     
    afterEach(() => sinon.restore());
     
    it('1 - Should return all matches', async () => {
        sinon.stub(MatchModel, 'findAll').resolves(allMatches as unknown as MatchModel[]);
        chaiHttpResponse = await chai
        .request(app)
        .get('/matches');
     
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
    });

    it('2 - Should return the matches in progress', async () => {
        sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress as unknown as MatchModel[]);
        chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');
            
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgress);
     });

    it('3 - Should return the matches not in progress', async () => {
        sinon.stub(MatchModel, 'findAll').resolves(matches as unknown as MatchModel[]);
        chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');
            
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matches);
    });


    
});