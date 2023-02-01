import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import MatchModel from '../database/models/Matches';

import {
    allMatches,
    invalidMatch,
    matchesNotInProgress,
    matchesInProgress,
    validMatch,
    equalTeams,
} from './mocks/matchesMock';

import { token } from './mocks/loginMock';

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
        sinon.stub(MatchModel, 'findAll').resolves(matchesNotInProgress as unknown as MatchModel[]);
        chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false');
            
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matchesNotInProgress);
    });

    it('4 - Should return an error when try to create a match with invalid token', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(validMatch)
        .set('authorization', 'token');
            
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('5 - Should return an error when try to create a match without token', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(validMatch);
            
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('6 - Should return an error when try to create a match with two equal teams', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .send(equalTeams)
        .set('authorization', token);
            
        expect(chaiHttpResponse.status).to.be.equal(422);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('7 - Should return an error when try to create a match with inexistent teams', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ authorization: token})
        .send(invalidMatch);
            
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });

    it('8 - Create a match successfully', async () => {
        sinon.stub(MatchModel, 'create').resolves(validMatch as unknown as MatchModel);

        chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set({ authorization: token})
        .send(validMatch);
            
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal(validMatch);
    });
});
