import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom/extend-expect';
import 'snapshot-diff/extend-expect';
import '../src/data/season.json';
import '../src/data/racelengths.json';
import '../src/data/racetimes.json';
import '../src/data/cars.json';
import '../src/data/car-class.json';
import '../src/data/tracks.json';
import '../src/data/contributors.json';


configure({ adapter: new Adapter() });

jest.mock('../src/data/season.json');
jest.mock('../src/data/racelengths.json');
jest.mock('../src/data/racetimes.json');
jest.mock('../src/data/cars.json');
jest.mock('../src/data/car-class.json');
jest.mock('../src/data/tracks.json');
jest.mock('../src/data/contributors.json');
