require('babel-jest');
require('@babel/polyfill');
require('@babel/preset-env');
require('@babel/preset-react');
const React = require('react');
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const Workspace = require('../../src/components/workspace/Workspace.jsx').default;

enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = enzyme;
const { data, noData, location } = require('./data');

describe('Workspace', () => {

  describe('rendering with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Workspace
        location={location}
        details={data}
      />);
    });

    afterEach(() => {
      wrapper = null;
    });

    it('allows props to be set', () => {
      expect(wrapper.props().location).toBe(location);
      expect(wrapper.props().details).toBe(data);
    });

    it(`sets link to workspace's id`, () => {
      expect(wrapper.find('a[href="/buildings/1"]').length).toEqual(1);
    });

    it('sets img src to given details.photo.url', () => {
      expect(wrapper.find(`img[src="${data.photo.url}"]`).length).toEqual(1);
    });

    it('puts workspace name in h3', () => {
      expect(wrapper.find('h3').text()).toEqual(data.description.name);
    });

    it('renders amenities array', () => {
      expect(wrapper.find('li').length).toEqual(data.amenities[0].amenities.length)
    });

  });

  describe('handles missing props without crashing', () => {

    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Workspace location={location} details={noData} />);
    })
    afterEach(() => {
      wrapper = null;
    });

    it('renders without crashing', () => {
      expect(wrapper.find('a').length).toEqual(1);
    });

    it('leaves data points blank', () => {
      expect(wrapper.find('.nb-description-title').text()).toEqual('');
      expect(wrapper.find('li').length).toEqual(0);
      expect(wrapper.find('.nb-pricing-price').text()).toEqual('View Inventory');
    })
  });
})
