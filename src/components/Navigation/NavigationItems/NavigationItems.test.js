import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

import {Layout} from '../../../hoc/Layout/Layout';


configure({adapter: new Adapter()});

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>);
    });

    // 'it' is a jest function
    it('should render 2 NavigationItem elements if not authenicated',()=>{
        
        //jest testing using expect function
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render 3 NavigationItem elements if authenticated',()=>{
        wrapper.setProps({isAuth:true});
        // toHaveLength is a jest function
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should render NavigationItem:Logout element if authenticated',()=>{

        wrapper.setProps({
            isAuth:true
        });

        //containsMatchingElement permits (and ignore) additional attributes on the wrapped element
        expect(wrapper.containsMatchingElement(<NavigationItem link='/logout' >Logout</NavigationItem>)).toEqual(true);
    })
});