import { fireEvent, render, screen } from "@testing-library/react"
import { Button } from "./button"

describe('button tests', () => {
  test('button test with text', () => {
    render(<Button text="TestButton" />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  test('button test without text', () => {
    render(<Button />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  });

  test('button test disabled', () => {
    render(<Button disabled={true} />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  });

  test('button test disabled', () => {
    render(<Button isLoader={true} />)
    expect(screen.getByRole('button')).toMatchSnapshot()
  });

  test('button test clicked on', () => {
    const btnclick = jest.fn();
    render(<Button onClick={btnclick} />)
    fireEvent.click(screen.getByRole('button'));
    expect(btnclick).toHaveBeenCalled();
  });

})