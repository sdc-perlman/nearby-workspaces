require('babel-jest');
require('@babel/polyfill');
require('@babel/preset-env');
require('@babel/preset-react');
const React = require('react');
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const WorkspaceContainer = require('../../src/components/WorkspaceContainer.jsx').default;

enzyme.configure({ adapter: new Adapter() });
const { mount } = enzyme;
const { data, locations } = require('./data');

describe('WorkspaceContainer', () => {

  it('should render an empty div when locations prop is null', () => {
    const wrapper = mount(<WorkspaceContainer locations={false} />);
    expect(wrapper.find('div').children().length).toEqual(0);
  });

  it('should render a div for each location passed in', () => {
    const wrapper = mount(<WorkspaceContainer locations={locations} details={data}/>);
    expect(wrapper.find('.nb-section-title').length).toEqual(1);    
    expect(wrapper.find('.nb-container').length).toEqual(3);
  })

})