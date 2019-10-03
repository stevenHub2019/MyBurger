import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


//testing pure functions

describe('auth reducer',()=>{
    it('should return initial state when first rendered',()=>{
        expect(reducer(undefined, {})).toEqual({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        });
    });

    it('should store token upon authentication',()=>{
        expect(reducer({
            token:null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/'
        }, {
            type:actionTypes.AUTH_SUCCESS,
            token: 'myToken',
            userId: 'myUserId'
        })).toEqual({
            token:'myToken',
            userId:'myUserId',
            error:null,
            loading:false,
            authRedirectPath:'/'
        });
    });

});