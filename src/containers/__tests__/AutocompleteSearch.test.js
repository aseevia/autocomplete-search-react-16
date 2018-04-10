import React from 'react';
import ReactDOM from 'react-dom';
import { configure, ShallowWrapper, ReactWrapper, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import AutocompleteSearch from '../AutocompleteSearch';
import SearchBar from '../../components/SearchBar';

configure({ adapter: new Adapter() });

function assertLength(length) {
	return function $assertLength(selector) {
		let result = this.find(selector)
		expect(result).to.have.length(length)
		return result
	}
}

ReactWrapper.prototype.assertSingle = assertLength(1)
ShallowWrapper.prototype.assertSingle = assertLength(1)

ReactWrapper.prototype.assertNone = assertLength(0)
ShallowWrapper.prototype.assertNone = assertLength(0)


it('AutocompleteSearch renders SearchBar', () => {
	const wrapper = mount(<AutocompleteSearch />);
	wrapper.assertSingle('SearchBar');
});

it('SearchBar allows us to set props', () => {
	const wrapper = mount(<SearchBar filterText="baz" onFilterTextChange={() => {}} onKeyDown={() => {}} />);
	expect(wrapper.props().filterText).to.equal('baz');
	wrapper.setProps({ filterText: 'foo' });
	expect(wrapper.props().filterText).to.equal('foo');
});

it('SearchBar fires onFilterTextChange', () => {

	let onFilterText = sinon.spy();

	mount(<SearchBar filterText="baz" onFilterTextChange={onFilterText} onKeyDown={() => {}} />)
	.find('input')
	.simulate('change', { value: 'foo' });

	expect(onFilterText.calledOnce).to.equal(true);   	
})

it('SearchBar fires onKeyDown', () => {
	let kd = sinon.spy();

	mount(<SearchBar filterText="baz" onFilterTextChange={() => {}} onKeyDown={kd} />)
	.find('input')
	.simulate('keyDown', { key: 'ArrowDown' })

	expect(kd.calledOnce).to.equal(true);
});

