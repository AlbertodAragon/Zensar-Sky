import { render, screen } from '@testing-library/react';
import App from './App';
import ShowError  from './App';

test('No data from API', () => {
 
  const mockData = [];
  render(<App data={mockData}/>);  
  expect(ShowError).toBeInTheDocument(1);
  const mockDataReal = [{title: "testtitle",description:"testdes",image:"testimage"}]
  render(<App data={mockDataReal}/>);  
  expect(ShowError).toBeInTheDocument(0);
});
