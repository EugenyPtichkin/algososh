import renderer from 'react-test-renderer';
//import { render, screen } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "./../../../types/element-states";
;

describe('circle tests', () => {

  it('circle should render without a letter', () => {
    const tree = renderer
      .create(<Circle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('circle should render with a letter', () => {
    const tree = renderer
      .create(<Circle letter={'A'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('circle should render with a head', () => {
    const tree = renderer
      .create(<Circle head={'HEAD'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('circle should render with react element in head', () => {
    const tree = renderer
      .create(<Circle head={<Circle />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('circle should render with a tail', () => {
    const tree = renderer
      .create(<Circle tail={'TAIL'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('circle should render with react element in tail', () => {
    const tree = renderer
      .create(<Circle tail={<Circle />} />)
      .toJSON();
    //render(<Circle tail={<Circle />} />)
    //screen.debug();    
    expect(tree).toMatchSnapshot();
  });

  it('circle should render with index', () => {
    const tree = renderer
      .create(<Circle index={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('circle should render with prop isSmall===true', () => {
    const tree = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('circle should render in default state', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('circle should render in changing state', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('circle should render in modified state', () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});